#!/bin/bash

# Script de déploiement robuste pour web-cv
# Autor: val-mzn
# Version: 2.0

set -euo pipefail  # Arrêt en cas d'erreur

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Vérifications préalables
check_prerequisites() {
    log "Vérification des prérequis..."
    
    # Vérifier que Docker est installé
    if ! command -v docker &> /dev/null; then
        error "Docker n'est pas installé"
        exit 1
    fi
    
    # Vérifier que Docker Compose est installé
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose n'est pas installé"
        exit 1
    fi
    
    # Vérifier que le fichier .env existe
    if [ ! -f .env ]; then
        error "Le fichier .env n'existe pas"
        exit 1
    fi
    
    # Vérifier que docker-compose.yml existe
    if [ ! -f docker-compose.yml ]; then
        error "Le fichier docker-compose.yml n'existe pas"
        exit 1
    fi
    
    success "Tous les prérequis sont présents"
}

# Charger les variables d'environnement
load_env() {
    log "Chargement des variables d'environnement..."
    
    # Charger le fichier .env
    set -a
    source .env
    set +a
    
    # Vérifier les variables critiques
    if [ -z "${GITHUB_REPOSITORY_OWNER:-}" ]; then
        error "GITHUB_REPOSITORY_OWNER n'est pas définie"
        exit 1
    fi
    
    if [ -z "${GITHUB_TOKEN:-}" ]; then
        error "GITHUB_TOKEN n'est pas définie"
        exit 1
    fi
    
    success "Variables d'environnement chargées"
    log "Repository owner: ${GITHUB_REPOSITORY_OWNER}"
    log "Image: ghcr.io/${GITHUB_REPOSITORY_OWNER}/web-cv:latest"
}

# Authentification Docker
docker_login() {
    log "Authentification Docker avec GitHub Container Registry..."
    
    if echo "${GITHUB_TOKEN}" | docker login ghcr.io -u "${GITHUB_REPOSITORY_OWNER}" --password-stdin; then
        success "Authentification Docker réussie"
    else
        error "Échec de l'authentification Docker"
        exit 1
    fi
}

# Vérifier l'accès à l'image
check_image_access() {
    log "Vérification de l'accès à l'image..."
    
    IMAGE_NAME="ghcr.io/${GITHUB_REPOSITORY_OWNER}/web-cv:latest"
    
    if docker pull "${IMAGE_NAME}" --quiet; then
        success "Image accessible et téléchargée avec succès"
    else
        error "Impossible d'accéder à l'image ${IMAGE_NAME}"
        error "Vérifiez que l'image existe et que vous avez les permissions nécessaires"
        exit 1
    fi
}

# Déploiement
deploy() {
    log "Démarrage du déploiement..."
    
    # Arrêter les services existants
    log "Arrêt des services existants..."
    docker-compose down --remove-orphans || true
    
    # Télécharger les images
    log "Téléchargement des images..."
    docker-compose pull
    
    # Démarrer les services
    log "Démarrage des services..."
    docker-compose up -d
    
    # Attendre que les services soient prêts
    log "Attente du démarrage des services..."
    sleep 30
    
    # Vérifier l'état des services
    check_services
}

# Vérifier l'état des services
check_services() {
    log "Vérification de l'état des services..."
    
    # Vérifier que tous les conteneurs sont en cours d'exécution
    if docker-compose ps | grep -q "Up"; then
        success "Services démarrés avec succès"
    else
        error "Certains services ne sont pas démarrés"
        docker-compose logs
        exit 1
    fi
    
    # Test de santé de l'application
    log "Test de santé de l'application..."
    for i in {1..30}; do
        if docker-compose exec -T web-cv curl -f http://localhost:8080/health &> /dev/null; then
            success "Application en bonne santé"
            break
        fi
        if [ $i -eq 30 ]; then
            error "L'application ne répond pas après 30 tentatives"
            docker-compose logs web-cv
            exit 1
        fi
        sleep 10
    done
}

# Nettoyage
cleanup() {
    log "Nettoyage des ressources inutilisées..."
    
    # Nettoyage des images et volumes non utilisés
    docker system prune -f --volumes
    
    # Déconnexion de Docker Registry
    docker logout ghcr.io
    
    success "Nettoyage terminé"
}

# Fonction principale
main() {
    log "=== Démarrage du déploiement web-cv ==="
    
    check_prerequisites
    load_env
    docker_login
    check_image_access
    deploy
    cleanup
    
    success "=== Déploiement terminé avec succès ==="
    log "Application accessible sur: https://${DOMAIN:-localhost}"
}

# Gestion des erreurs
trap 'error "Une erreur est survenue. Consultez les logs ci-dessus."' ERR

# Exécution
main "$@" 
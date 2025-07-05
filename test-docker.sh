#!/bin/bash

# Script de test Docker pour diagnostiquer le problème

set -e

echo "=== Test des variables d'environnement ==="

# Charger les variables d'environnement
if [ -f .env ]; then
    source .env
    echo "✓ Fichier .env chargé"
else
    echo "✗ Fichier .env introuvable"
    exit 1
fi

echo "GITHUB_REPOSITORY_OWNER: ${GITHUB_REPOSITORY_OWNER:-NOT_SET}"
echo "GITHUB_TOKEN: ${GITHUB_TOKEN:0:10}...(tronqué)"

# Tester l'authentification Docker
echo ""
echo "=== Test d'authentification Docker ==="
echo "${GITHUB_TOKEN}" | docker login ghcr.io -u "${GITHUB_REPOSITORY_OWNER}" --password-stdin

# Tester la configuration docker-compose
echo ""
echo "=== Test de configuration docker-compose ==="
export GITHUB_REPOSITORY_OWNER
export GITHUB_TOKEN
export DOMAIN
export ACME_EMAIL
export TRAEFIK_AUTH

# Afficher la configuration résolue
echo "Configuration docker-compose résolue :"
docker-compose config --services
echo ""
echo "Image utilisée pour web-cv :"
docker-compose config | grep -A 1 "web-cv:" | grep "image:"

# Test de pull de l'image
echo ""
echo "=== Test de pull de l'image ==="
IMAGE_NAME="ghcr.io/${GITHUB_REPOSITORY_OWNER}/web-cv:latest"
echo "Tentative de pull de l'image : ${IMAGE_NAME}"

if docker pull "${IMAGE_NAME}"; then
    echo "✓ Image pullée avec succès"
else
    echo "✗ Échec du pull de l'image"
    exit 1
fi

# Test de docker-compose pull
echo ""
echo "=== Test de docker-compose pull ==="
if docker-compose pull; then
    echo "✓ docker-compose pull réussi"
else
    echo "✗ docker-compose pull échoué"
    exit 1
fi

echo ""
echo "=== Tous les tests sont passés ! ===" 
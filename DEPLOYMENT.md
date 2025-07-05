# Guide de Déploiement CI/CD sur OVH

Ce guide explique comment configurer et déployer automatiquement votre application web-cv sur un serveur OVH en utilisant GitHub Actions, Docker et nginx.

## 🏗️ Architecture

```
GitHub → GitHub Actions → Docker Hub → Serveur OVH → Traefik → nginx → Application React
```

## 📋 Prérequis

### Sur votre serveur OVH
- Ubuntu 20.04+ ou Debian 11+
- Docker et Docker Compose installés
- Un nom de domaine pointant vers votre serveur
- Accès SSH avec clé

### Sur GitHub
- Repository avec les sources
- Secrets configurés pour la CI/CD

### Sur Docker Hub
- Compte Docker Hub pour stocker les images

## 🚀 Configuration Initiale

### 1. Préparation du serveur OVH

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Installation de Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Création du répertoire de projet
mkdir -p ~/web-cv
cd ~/web-cv

# Copie des fichiers de configuration
# (docker-compose.yml, .env, deploy.sh depuis votre repository)
```

### 2. Configuration des variables d'environnement

Créez le fichier `.env` sur votre serveur :

```bash
cp .env.example .env
nano .env
```

Remplissez avec vos vraies valeurs :

```bash
# Docker Configuration
DOCKER_USERNAME=votre_nom_utilisateur_docker

# Domain Configuration
DOMAIN=votre-domaine.com
ACME_EMAIL=votre-email@exemple.com

# Traefik Authentication
TRAEFIK_AUTH=admin:$$2y$$10$$hash_genere_avec_htpasswd

# OVH Server Configuration
OVH_HOST=ip-de-votre-serveur
OVH_USERNAME=votre-nom-utilisateur
OVH_PORT=22
```

### 3. Génération de l'authentification Traefik

```bash
# Installation d'apache2-utils pour htpasswd
sudo apt install apache2-utils -y

# Génération du hash pour l'authentification
echo $(htpasswd -nb admin votre_mot_de_passe) | sed -e s/\\$/\\$\\$/g
```

### 4. Configuration des secrets GitHub

Dans votre repository GitHub, allez dans `Settings → Secrets and variables → Actions` et ajoutez :

```
DOCKER_USERNAME=votre_nom_utilisateur_docker
DOCKER_PASSWORD=votre_mot_de_passe_docker
OVH_HOST=ip-de-votre-serveur
OVH_USERNAME=votre-nom-utilisateur
OVH_SSH_KEY=votre-cle-ssh-privee
OVH_PORT=22
```

### 5. Configuration de la clé SSH

```bash
# Sur votre machine locale, générez une clé SSH si nécessaire
ssh-keygen -t rsa -b 4096 -C "votre-email@exemple.com"

# Copiez la clé publique sur votre serveur OVH
ssh-copy-id -i ~/.ssh/id_rsa.pub utilisateur@ip-serveur

# Ajoutez la clé privée dans les secrets GitHub (OVH_SSH_KEY)
cat ~/.ssh/id_rsa
```

## 🔧 Utilisation

### Déploiement Automatique

1. **Push sur la branche main** : Le déploiement se déclenche automatiquement
2. **GitHub Actions** : Build et push de l'image Docker
3. **Déploiement** : Mise à jour automatique sur le serveur OVH

### Déploiement Manuel

```bash
# Sur votre serveur OVH
cd ~/web-cv
chmod +x deploy.sh
./deploy.sh
```

## 📊 Monitoring

### Vérification des services

```bash
# Statut des conteneurs
docker-compose ps

# Logs des conteneurs
docker-compose logs -f

# Santé des services
docker-compose exec web-cv curl -f http://localhost:8080/health
```

### Accès aux interfaces

- **Application** : https://votre-domaine.com
- **Traefik Dashboard** : https://traefik.votre-domaine.com
- **Logs nginx** : `docker-compose logs nginx`

## 🔒 Sécurité

### Fonctionnalités de sécurité implémentées

- **HTTPS obligatoire** avec Let's Encrypt
- **Headers de sécurité** (XSS, CSRF, CSP)
- **Rate limiting** pour éviter les attaques DDoS
- **Conteneurs en lecture seule** avec tmpfs
- **Utilisateur non-root** dans les conteneurs
- **Isolation réseau** avec Docker networks

### Bonnes pratiques

- Changez régulièrement les mots de passe
- Surveillez les logs pour détecter les activités suspectes
- Maintenez Docker et les images à jour
- Utilisez des secrets robustes

## 🛠️ Dépannage

### Problèmes courants

**Erreur de certificat SSL**
```bash
# Vérifiez les logs Traefik
docker-compose logs traefik

# Redémarrez Traefik
docker-compose restart traefik
```

**Application non accessible**
```bash
# Vérifiez le statut des conteneurs
docker-compose ps

# Vérifiez les logs nginx
docker-compose logs web-cv
```

**Échec de déploiement GitHub Actions**
```bash
# Vérifiez les secrets GitHub
# Testez la connexion SSH manuellement
ssh -i ~/.ssh/id_rsa utilisateur@ip-serveur
```

### Commandes utiles

```bash
# Redémarrage complet
docker-compose down && docker-compose up -d

# Mise à jour des images
docker-compose pull && docker-compose up -d

# Nettoyage du système
docker system prune -f --volumes

# Sauvegarde des certificats
tar -czf letsencrypt-backup.tar.gz letsencrypt/
```

## 📈 Optimisations

### Performance

- **Compression gzip** activée
- **Cache des assets** optimisé
- **Headers de cache** configurés
- **Health checks** pour la haute disponibilité

### Coûts

- **Multi-stage builds** pour réduire la taille des images
- **Nettoyage automatique** des anciennes images
- **Compression des logs** avec rotation

## 🆘 Support

En cas de problème :

1. Vérifiez les logs : `docker-compose logs`
2. Consultez le status : `docker-compose ps`
3. Testez la connectivité : `curl -I https://votre-domaine.com`
4. Vérifiez les DNS : `nslookup votre-domaine.com`

## 📝 Maintenance

### Tâches régulières

```bash
# Mise à jour des images (automatique via CI/CD)
docker-compose pull

# Nettoyage des ressources inutilisées
docker system prune -f

# Sauvegarde des certificats SSL
cp -r letsencrypt/ /backup/letsencrypt-$(date +%Y%m%d)

# Vérification des logs
docker-compose logs --tail=100
```

### Mise à jour de l'application

Les mises à jour sont automatiques lors des push sur la branche main. Pour une mise à jour manuelle :

```bash
cd ~/web-cv
git pull origin main
docker-compose pull
docker-compose up -d
``` 
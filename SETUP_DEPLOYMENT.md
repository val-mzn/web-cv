# Guide d'Installation - Déploiement Automatique

Ce guide vous permettra de configurer le déploiement automatique de votre application web-cv sur votre serveur d'intégration.

## 🚀 Étapes de Configuration

### 1. Configuration du Serveur

#### A. Prérequis sur le serveur
```bash
# Installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Installation de Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Redémarrage pour appliquer les permissions
sudo reboot
```

#### B. Configuration des fichiers sur le serveur
```bash
# Création du répertoire de travail
mkdir -p ~/web-cv
cd ~/web-cv

# Télécharger les fichiers de configuration depuis votre repository
wget https://raw.githubusercontent.com/VOTRE-USERNAME/web-cv/main/docker-compose.yml
wget https://raw.githubusercontent.com/VOTRE-USERNAME/web-cv/main/deploy.sh
wget https://raw.githubusercontent.com/VOTRE-USERNAME/web-cv/main/env.example

# Créer le fichier .env
cp env.example .env
```

#### C. Configuration du fichier .env
```bash
nano .env
```

Remplissez avec vos vraies valeurs :
```bash
# Configuration GitHub Container Registry
GITHUB_REPOSITORY_OWNER=votre-nom-utilisateur-github

# Configuration du domaine
DOMAIN=votre-domaine.com
ACME_EMAIL=votre-email@exemple.com

# Configuration Traefik Dashboard
TRAEFIK_AUTH=admin:$$2y$$10$$hash_genere_avec_htpasswd

# Configuration environnement
NODE_ENV=production
```

#### D. Génération du hash pour Traefik
```bash
# Installation d'apache2-utils
sudo apt install apache2-utils -y

# Génération du hash (remplacez 'votre_mot_de_passe' par votre mot de passe)
echo $(htpasswd -nb admin votre_mot_de_passe) | sed -e s/\\$/\\$\\$/g
```

### 2. Configuration des Clés SSH

#### A. Génération des clés SSH
```bash
# Sur votre machine locale
ssh-keygen -t rsa -b 4096 -C "votre-email@exemple.com"
```

#### B. Configuration de l'accès SSH
```bash
# Copier la clé publique sur le serveur
ssh-copy-id -i ~/.ssh/id_rsa.pub utilisateur@ip-serveur

# Tester la connexion
ssh utilisateur@ip-serveur
```

### 3. Configuration GitHub

#### A. Secrets GitHub
Dans votre repository GitHub, allez dans `Settings → Secrets and variables → Actions` et ajoutez :

| Secret | Valeur | Description |
|--------|--------|-------------|
| `OVH_HOST` | `ip-de-votre-serveur` | IP ou nom d'hôte du serveur |
| `OVH_USERNAME` | `votre-nom-utilisateur` | Nom d'utilisateur SSH |
| `OVH_SSH_KEY` | `contenu-de-votre-cle-ssh-privee` | Clé SSH privée complète |
| `OVH_PORT` | `22` | Port SSH (généralement 22) |
| `DOMAIN` | `votre-domaine.com` | Nom de domaine principal |
| `ACME_EMAIL` | `votre-email@exemple.com` | Email pour Let's Encrypt |
| `TRAEFIK_AUTH` | `admin:$$2y$$10$$hash...` | Hash généré avec htpasswd |
| `SLACK_WEBHOOK_URL` | `https://hooks.slack.com/...` | (Optionnel) Webhook Slack pour notifications |

#### B. Configuration des permissions
Dans `Settings → Actions → General` :
- Workflow permissions : Sélectionnez **"Read and write permissions"**
- Cochez **"Allow GitHub Actions to create and approve pull requests"**

### 4. Test du Déploiement

#### A. Test manuel sur le serveur
```bash
# Connectez-vous au serveur
ssh utilisateur@ip-serveur

# Accédez au répertoire du projet
cd ~/web-cv

# Testez le script de déploiement
chmod +x deploy.sh
./deploy.sh
```

#### B. Test automatique
```bash
# Faites un commit et push sur main
git add .
git commit -m "Setup automated deployment"
git push origin main
```

Surveillez l'onglet "Actions" de votre repository GitHub pour voir le déploiement en cours.

### 5. Vérification

#### A. Vérification des services
```bash
# Sur le serveur
docker-compose ps
docker-compose logs -f
```

#### B. Accès aux services
- **Application** : `https://votre-domaine.com`
- **Traefik Dashboard** : `https://traefik.votre-domaine.com`

### 6. Surveillance et Maintenance

#### A. Commandes utiles
```bash
# Voir les logs
docker-compose logs -f web-cv

# Redémarrer les services
docker-compose restart

# Mettre à jour manuellement
./deploy.sh

# Nettoyer les images anciennes
docker system prune -f
```

#### B. Dépannage
```bash
# Vérifier l'état des conteneurs
docker-compose ps

# Vérifier les logs Traefik
docker-compose logs traefik

# Redémarrer Traefik si problème SSL
docker-compose restart traefik
```

#### C. Problèmes courants

**Erreur : "pull access denied for [nom-utilisateur]/web-cv"**
```bash
# Vérifier que le fichier .env est créé avec les bonnes variables
cat ~/web-cv/.env

# Vérifier l'authentification Docker
docker login ghcr.io -u votre-nom-utilisateur-github

# Tester le pull manuel
docker pull ghcr.io/votre-nom-utilisateur-github/web-cv:latest
```

**Erreur : "repository does not exist"**
- Vérifiez que l'image a été construite et poussée par GitHub Actions
- Vérifiez que le repository owner est correct dans les secrets GitHub
- Assurez-vous que le package est public ou que l'authentification est correcte

## 🔧 Workflow de Déploiement

1. **Push sur main** → Déclenchement automatique
2. **Build Docker** → Construction de l'image
3. **Push Registry** → Envoi vers GitHub Container Registry
4. **Déploiement** → Connexion SSH et mise à jour du serveur
5. **Notification** → Slack (si configuré)

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs GitHub Actions
2. Consultez les logs du serveur avec `docker-compose logs`
3. Testez la connexion SSH manuellement
4. Vérifiez que tous les secrets sont configurés correctement

## 📋 Checklist

- [ ] Docker et Docker Compose installés sur le serveur
- [ ] Fichiers `docker-compose.yml`, `deploy.sh`, et `.env` configurés
- [ ] Clés SSH générées et configurées
- [ ] Secrets GitHub configurés
- [ ] Permissions GitHub Actions activées
- [ ] Domaine pointant vers le serveur
- [ ] Test de déploiement réussi 
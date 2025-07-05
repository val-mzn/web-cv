# Guide de Dépannage - Problèmes Docker avec GitHub Container Registry

## 🚨 Problème : `pull access denied for val-mzn/web-cv`

Cette erreur indique que Docker ne peut pas accéder à l'image dans GitHub Container Registry.

## 🔍 Diagnostic

### 1. Vérification des variables d'environnement

**Sur votre serveur OVH, exécutez :**

```bash
# Aller dans le répertoire du projet
cd ~/web-cv

# Vérifier que le fichier .env existe
ls -la .env

# Vérifier le contenu du fichier .env
cat .env
```

**Le fichier .env doit contenir :**
```bash
GITHUB_REPOSITORY_OWNER=val-mzn
GITHUB_USERNAME=val-mzn
DOCKER_USERNAME=val-mzn
GITHUB_TOKEN=ghp_your_token_here
DOMAIN=votre-domaine.com
ACME_EMAIL=votre-email@example.com
TRAEFIK_AUTH=admin:$2y$10$hashed_password
NODE_ENV=production
```

### 2. Test de diagnostic complet

**Exécutez le script de test :**

```bash
# Rendre le script exécutable
chmod +x test-docker.sh

# Exécuter le test
./test-docker.sh
```

## 🛠️ Solutions

### Solution 1 : Vérifier l'authentification GitHub

**1. Vérifiez votre token GitHub :**
```bash
# Testez l'accès à l'API GitHub
curl -H "Authorization: token YOUR_GITHUB_TOKEN" https://api.github.com/user
```

**2. Vérifiez l'accès aux packages :**
```bash
curl -H "Authorization: token YOUR_GITHUB_TOKEN" https://api.github.com/user/packages?package_type=container
```

### Solution 2 : Tester l'authentification Docker manuellement

```bash
# Authentification Docker
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u "val-mzn" --password-stdin

# Test de pull de l'image
docker pull ghcr.io/val-mzn/web-cv:latest
```

### Solution 3 : Vérifier la configuration docker-compose

```bash
# Charger les variables d'environnement
set -a
source .env
set +a

# Vérifier la configuration
docker-compose config

# Vérifier l'image spécifique
docker-compose config | grep -A 1 "image:"
```

### Solution 4 : Rendre l'image publique (temporaire)

**Dans GitHub :**
1. Aller sur `https://github.com/val-mzn/web-cv/packages`
2. Cliquer sur `web-cv`
3. Aller dans `Package settings`
4. Changer la visibilité de `Private` à `Public`

### Solution 5 : Créer un Personal Access Token

**1. Créer un token sur GitHub :**
- Aller sur `Settings → Developer settings → Personal access tokens`
- Générer un nouveau token avec les permissions `read:packages`

**2. Utiliser le token dans votre `.env` :**
```bash
GITHUB_TOKEN=ghp_votre_nouveau_token
```

## 🔧 Corrections spécifiques

### Correction du workflow GitHub Actions

Le workflow a été corrigé pour mieux gérer les variables d'environnement :

```yaml
# Charger et exporter les variables d'environnement
set -a
source .env
set +a

# Tester l'image manuellement
docker pull ghcr.io/${{ github.repository_owner }}/web-cv:latest

# Vérifier la configuration docker-compose
echo "Configuration docker-compose:"
docker-compose config | grep -A 1 "image:"
```

### Correction du script deploy.sh

Le script a été amélioré avec :
- Meilleure gestion des erreurs
- Export explicite des variables
- Tests de diagnostic
- Logs détaillés

## 📋 Checklist de dépannage

- [ ] Fichier `.env` existe et contient les bonnes variables
- [ ] Token GitHub valide et avec les bonnes permissions
- [ ] Authentification Docker fonctionne
- [ ] Image existe dans GitHub Container Registry
- [ ] Variables d'environnement sont correctement exportées
- [ ] docker-compose.yml utilise la bonne image
- [ ] Permissions GitHub Actions configurées

## 🚀 Déploiement après correction

Une fois les corrections appliquées :

```bash
# Déploiement avec le nouveau script
./deploy.sh
```

Ou déclenchez un nouveau déploiement via GitHub Actions en poussant un commit.

## 📞 Support

Si le problème persiste, vérifiez :
1. Les logs détaillés du workflow GitHub Actions
2. Les logs Docker sur votre serveur : `docker-compose logs`
3. L'état des services : `docker-compose ps`
4. Les images locales : `docker images`

## 🔐 Sécurité

**Important :** Ne jamais exposer votre token GitHub dans les logs ou fichiers publics !

**Après résolution :**
1. Nettoyez les credentials : `docker logout ghcr.io`
2. Supprimez les tokens inutilisés
3. Vérifiez que l'image est bien privée si nécessaire 
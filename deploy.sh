#!/bin/bash

# Configuration
PROJECT_NAME="web-cv"
COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Check if docker and docker-compose are installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed"
    exit 1
fi

# Check if .env file exists
if [[ ! -f "$ENV_FILE" ]]; then
    print_error ".env file not found"
    print_warning "Please create a .env file with the required variables"
    exit 1
fi

# Load environment variables
source "$ENV_FILE"

# Validate required environment variables
required_vars=("GITHUB_REPOSITORY_OWNER" "DOMAIN" "ACME_EMAIL")
for var in "${required_vars[@]}"; do
    if [[ -z "${!var}" ]]; then
        print_error "Environment variable $var is not set"
        exit 1
    fi
done

print_status "Starting deployment of $PROJECT_NAME..."

# Create necessary directories
mkdir -p letsencrypt
chmod 600 letsencrypt

# Login to GitHub Container Registry if credentials are provided
if [[ -n "$GITHUB_TOKEN" ]]; then
    print_status "Logging into GitHub Container Registry..."
    echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_USERNAME" --password-stdin
fi

# Pull latest images
print_status "Pulling latest Docker images..."
docker-compose pull

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down

# Remove orphaned containers
print_status "Removing orphaned containers..."
docker-compose down --remove-orphans

# Start new containers
print_status "Starting new containers..."
docker-compose up -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    print_status "Services are running successfully"
else
    print_error "Some services failed to start"
    docker-compose logs
    exit 1
fi

# Clean up old images
print_status "Cleaning up old Docker images..."
docker system prune -f --volumes

# Show running containers
print_status "Currently running containers:"
docker-compose ps

# Show logs
print_status "Recent logs:"
docker-compose logs --tail=50

print_status "Deployment completed successfully!"
print_status "Your application should be available at: https://$DOMAIN"
print_status "Traefik dashboard available at: https://traefik.$DOMAIN" 
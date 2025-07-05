# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install security updates
RUN apk update && apk upgrade

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Add labels for better maintenance
LABEL maintainer="your-email@example.com"
LABEL version="1.0"
LABEL description="Web CV application with nginx"

# Create script to initialize nginx directories dans les tmpfs
RUN cat > /docker-entrypoint.sh << 'EOF'
#!/bin/sh
set -e

# Create nginx cache directories (only in tmpfs mounted directories)
mkdir -p /var/cache/nginx/client_temp \
         /var/cache/nginx/proxy_temp \
         /var/cache/nginx/fastcgi_temp \
         /var/cache/nginx/uwsgi_temp \
         /var/cache/nginx/scgi_temp

# Create nginx.pid file
touch /var/run/nginx.pid

# Execute the command
exec "$@"
EOF

# Make the script executable
RUN chmod +x /docker-entrypoint.sh

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/health || exit 1

# Use the entrypoint script
ENTRYPOINT ["/docker-entrypoint.sh"]

# Start nginx as root
CMD ["nginx", "-g", "daemon off;"] 
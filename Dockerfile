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

# Create script to initialize permissions
RUN cat > /docker-entrypoint.sh << 'EOF'
#!/bin/sh
set -e

# Create nginx directories with proper permissions
mkdir -p /var/cache/nginx/client_temp \
         /var/cache/nginx/proxy_temp \
         /var/cache/nginx/fastcgi_temp \
         /var/cache/nginx/uwsgi_temp \
         /var/cache/nginx/scgi_temp \
         /var/run \
         /var/log/nginx

# Set proper ownership
chown -R nginx:nginx /var/cache/nginx \
                     /var/run \
                     /var/log/nginx \
                     /usr/share/nginx/html

# Create nginx.pid file
touch /var/run/nginx.pid
chown nginx:nginx /var/run/nginx.pid

# If running as root, exec as nginx user
if [ "$(id -u)" = "0" ]; then
    exec su-exec nginx "$@"
else
    exec "$@"
fi
EOF

# Make the script executable
RUN chmod +x /docker-entrypoint.sh

# Install su-exec for user switching
RUN apk add --no-cache su-exec

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/health || exit 1

# Use the entrypoint script
ENTRYPOINT ["/docker-entrypoint.sh"]

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 
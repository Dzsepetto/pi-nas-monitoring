#!/bin/bash

set -e

SOURCE_DIR="/mnt/hdd/dist"
TARGET_DIR="/var/www/pi-admin"
NGINX_CONFIG="/etc/nginx/sites-available/pi-admin"
NGINX_SITE_LINK="/etc/nginx/sites-enabled/pi-admin"
BACKEND_URL="http://127.0.0.1:5000/api/"
PUBLIC_URL="http://100.x.x.x"

echo "===== Pi Admin Web Deploy ====="

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: build directory not found: $SOURCE_DIR"
  exit 1
fi

echo "Creating web directory..."
sudo mkdir -p "$TARGET_DIR"

echo "Removing old frontend files..."
sudo rm -rf "$TARGET_DIR"/*

echo "Copying new frontend files..."
sudo cp -r "$SOURCE_DIR"/* "$TARGET_DIR"/

echo "Creating Nginx configuration..."
sudo tee "$NGINX_CONFIG" > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    root $TARGET_DIR;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass $BACKEND_URL;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

echo "Enabling Nginx site..."
sudo ln -sf "$NGINX_CONFIG" "$NGINX_SITE_LINK"
sudo rm -f /etc/nginx/sites-enabled/default

echo "Testing Nginx configuration..."
sudo nginx -t

echo "Restarting Nginx..."
sudo systemctl enable nginx
sudo systemctl restart nginx

echo "Web deploy completed."
echo "Open:"
echo "$PUBLIC_URL"
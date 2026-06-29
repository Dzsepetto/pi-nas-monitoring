#!/bin/bash

set -e

SOURCE_DIR="/mnt/hdd/dist"
TARGET_DIR="/var/www/pi-admin"
NGINX_CONFIG="/etc/nginx/sites-available/pi-admin"

echo "Pi Admin web deploy indul..."

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Hiba: nem találom a build mappát: $SOURCE_DIR"
  exit 1
fi

echo "Web mappa létrehozása..."
sudo mkdir -p "$TARGET_DIR"

echo "Régi frontend törlése..."
sudo rm -rf "$TARGET_DIR"/*

echo "Új frontend másolása..."
sudo cp -r "$SOURCE_DIR"/* "$TARGET_DIR"/

echo "Nginx config létrehozása..."
sudo tee "$NGINX_CONFIG" > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    root /var/www/pi-admin;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

echo "Nginx site engedélyezése..."
sudo ln -sf "$NGINX_CONFIG" /etc/nginx/sites-enabled/pi-admin
sudo rm -f /etc/nginx/sites-enabled/default

echo "Nginx config ellenőrzése..."
sudo nginx -t

echo "Nginx újraindítása..."
sudo systemctl enable nginx
sudo systemctl restart nginx

echo "Kész. Nyisd meg:"
echo "http://100.109.109.54"
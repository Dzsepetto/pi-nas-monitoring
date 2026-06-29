#!/bin/bash

set -e

echo "===== Pi Admin API Deploy ====="

echo "Leállítás..."
pkill pi-admin-api || true

echo "Régi publish törlése..."
sudo rm -rf /admin/pi-admin-api/publish

echo "Új publish áthelyezése..."
sudo mkdir -p /admin/pi-admin-api
sudo mv /mnt/hdd/publish /admin/pi-admin-api

cd /admin/pi-admin-api/publish

echo "ENV létrehozása..."

cat > .env << EOF
Jwt__Key=pi_admin_api_super_secret_jwt_key_2026_minimum_32_chars
EOF

echo ".env:"
cat .env

echo "Systemd service beállítása..."

cd /admin/pi-admin-api

chmod +x service-setup.sh
./service-setup.sh

echo "Deploy kész."

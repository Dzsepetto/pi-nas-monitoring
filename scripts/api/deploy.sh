#!/bin/bash

set -e

APP_NAME="pi-admin-api"
SOURCE_DIR="/mnt/hdd/publish"
TARGET_ROOT="/admin/pi-admin-api"
TARGET_DIR="$TARGET_ROOT/publish"
SERVICE_SETUP_SCRIPT="$TARGET_ROOT/service-setup.sh"

JWT_KEY="change-this-super-secret-jwt-key-minimum-32-characters"

echo "===== Pi Admin API Deploy ====="

echo "Stopping existing API process..."
pkill "$APP_NAME" || true

echo "Removing old publish directory..."
sudo rm -rf "$TARGET_DIR"

echo "Creating target directory..."
sudo mkdir -p "$TARGET_ROOT"

echo "Moving new publish directory..."
sudo mv "$SOURCE_DIR" "$TARGET_ROOT"

cd "$TARGET_DIR"

echo "Creating .env file..."

sudo tee .env > /dev/null <<EOF
Jwt__Key=$JWT_KEY
EOF

echo ".env file created."

echo "Setting up systemd service..."

cd "$TARGET_ROOT"

chmod +x "$SERVICE_SETUP_SCRIPT"
"$SERVICE_SETUP_SCRIPT"

echo "API deploy completed."
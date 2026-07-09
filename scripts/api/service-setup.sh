#!/bin/bash

set -e

SERVICE_NAME="pi-admin-api"
APP_DIR="/admin/pi-admin-api/publish"
EXECUTABLE_PATH="$APP_DIR/pi-admin-api"
SERVICE_USER="bencedmin"
ASPNETCORE_ENVIRONMENT="Production"

echo "===== Pi Admin API Service Setup ====="

echo "Creating systemd service..."

sudo tee "/etc/systemd/system/$SERVICE_NAME.service" > /dev/null <<EOF
[Unit]
Description=Pi Admin API
After=network.target

[Service]
WorkingDirectory=$APP_DIR
ExecStart=$EXECUTABLE_PATH
Restart=always
RestartSec=5
User=$SERVICE_USER
Environment=ASPNETCORE_ENVIRONMENT=$ASPNETCORE_ENVIRONMENT

[Install]
WantedBy=multi-user.target
EOF

echo "Reloading systemd..."
sudo systemctl daemon-reload

echo "Enabling service..."
sudo systemctl enable "$SERVICE_NAME"

echo "Restarting service..."
sudo systemctl restart "$SERVICE_NAME"

echo "Systemd service installed and started."
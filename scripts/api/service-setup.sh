echo "Creating systemd service..."

sudo tee /etc/systemd/system/pi-admin-api.service > /dev/null <<EOF
[Unit]
Description=Pi Admin API
After=network.target

[Service]
WorkingDirectory=/admin/pi-admin-api/publish
ExecStart=/admin/pi-admin-api/publish/pi-admin-api
Restart=always
RestartSec=5
User=bencedmin
Environment=ASPNETCORE_ENVIRONMENT=Production

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable pi-admin-api
sudo systemctl restart pi-admin-api

echo "Systemd service installed and started."

# Quick Start

## Requirements

- Node.js 20+
- .NET 8 SDK
- Raspberry Pi (or another Linux machine)
- Git
- *(Optional)* Tailscale for remote access

---

## 1. Clone the repository

```bash
git clone https://github.com/Dzsepetto/pi-nas-monitoring.git
cd pi-nas-monitoring
```

---

## 2. Configure the Raspberry Pi

If you only want to test the UI locally, you can skip this step.

To monitor a real Raspberry Pi remotely:

- Enable SSH
- Configure Samba *(optional, if you want NAS functionality)*
- Install the required monitoring tools
- *(Optional)* Install Tailscale for secure remote access

### Tailscale (Optional)

Install Tailscale on your Raspberry Pi and log in.

After installation, you'll receive an IP address similar to:

```text
100.x.x.x
```

This IP will be used by the API to communicate with your Raspberry Pi.

---

## 3. Backend Configuration

Navigate to the backend project:

```bash
cd pi-api
```

Create a `.env` file.

Example:

```env
JWT_SECRET=your-super-secret-key
JWT_ISSUER=PiNasMonitoring
JWT_AUDIENCE=PiNasMonitoring

PI_HOST=100.xxx.xxx.xxx
PI_USERNAME=pi
PI_PASSWORD=your-password

SSH_PORT=22
```

> **Note:** The variable names above are placeholders. Replace them with the actual environment variables used by the project.

---

## 4. Frontend Configuration

Navigate to the frontend project:

```bash
cd ../pi-admin
```

Create a `.env` file.

Example:

```env
VITE_API_URL=https://localhost:7067/api
```

---

## 5. Install Dependencies

### Frontend

```bash
cd pi-admin
npm install
```

### Backend

```bash
cd ../pi-api
dotnet restore
```

---

## 6. Start the Backend

```bash
dotnet run
```

Swagger will be available at:

```text
https://localhost:7067/swagger
```

---

## 7. Start the Frontend

```bash
cd ../pi-admin
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:5173
```

---

## 8. Deployment Scripts

The repository also contains helper scripts for deploying the API and the frontend.

You can find them in the `scripts` folder.

Before using them, open the scripts and update the configuration variables at the top of each file to match your own Raspberry Pi setup.

---

### API Deployment

The API deployment script:

- stops the currently running API process
- removes the old publish folder
- moves the new publish output to the target directory
- creates the API `.env` file
- runs the systemd service setup script

```bash
cd scripts
chmod +x deploy-api.sh
./deploy-api.sh
```

Before running the script, update these variables in `deploy-api.sh`:

```bash
APP_NAME="pi-admin-api"
SOURCE_DIR="/mnt/hdd/publish"
TARGET_ROOT="/admin/pi-admin-api"
TARGET_DIR="$TARGET_ROOT/publish"
SERVICE_SETUP_SCRIPT="$TARGET_ROOT/service-setup.sh"
JWT_KEY="change-this-super-secret-jwt-key-minimum-32-characters"
```

The script creates the following `.env` file inside the deployed API directory:

```env
Jwt__Key=your-super-secret-jwt-key-minimum-32-characters
```

> Do not commit real secrets or production JWT keys to the repository.

---

### API Service Setup

The `service-setup.sh` script creates and starts a systemd service for the API.

```bash
cd scripts
chmod +x service-setup.sh
./service-setup.sh
```

Before running it manually, update these variables in `service-setup.sh`:

```bash
SERVICE_NAME="pi-admin-api"
APP_DIR="/admin/pi-admin-api/publish"
EXECUTABLE_PATH="$APP_DIR/pi-admin-api"
SERVICE_USER="your-linux-user"
ASPNETCORE_ENVIRONMENT="Production"
```

Usually, you do not need to run this script separately because `deploy-api.sh` calls it automatically.

---

### Frontend Deployment

The frontend deployment script:

- copies the built frontend files to the Nginx web directory
- creates an Nginx configuration
- enables the site
- restarts Nginx

```bash
cd scripts
chmod +x deploy-web.sh
./deploy-web.sh
```

Before running the script, update these variables in `deploy-web.sh`:

```bash
SOURCE_DIR="/mnt/hdd/dist"
TARGET_DIR="/var/www/pi-admin"
NGINX_CONFIG="/etc/nginx/sites-available/pi-admin"
NGINX_SITE_LINK="/etc/nginx/sites-enabled/pi-admin"
BACKEND_URL="http://127.0.0.1:5000/api/"
PUBLIC_URL="http://100.x.x.x"
```

The script configures Nginx to serve the React app and proxy API requests to the backend:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:5000/api/;
}
```

After deployment, the frontend should be available at:

```text
http://your-raspberry-pi-ip
```

If you are using Tailscale, this can be your Tailscale IP:

```text
http://100.x.x.x
```

---

## Notes

- Update the configuration variables at the top of the scripts before running them.
- Make sure the backend is already published before running `deploy-api.sh`.
- Make sure the frontend is already built before running `deploy-web.sh`.
- Do not commit real `.env` files or secrets.
- Use `.env.example` files for public configuration examples.
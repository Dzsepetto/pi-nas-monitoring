# Quick Start

## Requirements

- Node.js 20+
- .NET 8 SDK
- Raspberry Pi (or another Linux machine)
- Git
- PowerShell and OpenSSH (`ssh`, `scp`) for deployment
- *(Optional)* Tailscale for remote access

---

## 1. Clone the Repository

```bash
git clone https://github.com/Dzsepetto/pi-nas-monitoring.git
cd pi-nas-monitoring
```

---

## 2. Configure the Raspberry Pi

If you only want to test the UI locally, you can skip this step.

To monitor a real Raspberry Pi remotely:

- Enable SSH
- Configure Samba *(optional, for NAS functionality)*
- Install the required monitoring tools
- Install and configure Nginx and systemd for deployment
- *(Optional)* Install Tailscale for secure remote access

### Tailscale (Optional)

Install Tailscale on your Raspberry Pi and log in.

After installation, you'll receive an IP address similar to:

```text
100.x.x.x
```

This address can be used to access your Raspberry Pi remotely.

---

## 3. Backend Configuration

Navigate to the backend project:

```bash
cd pi-api
```

Configure the required backend environment variables.

For the deployed API, the deployment script creates a `.env` file containing:

```env
Jwt__Key=your-secret-jwt-key-minimum-32-characters
```

Do not commit real secrets to the repository.

---

## 4. Frontend Configuration

Navigate to the frontend project:

```bash
cd ../pi-admin
```

Create a `.env` file if needed.

Example for local development:

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

Swagger, if enabled, will be available at:

```text
https://localhost:7067/swagger
```

---

## 7. Start the Frontend

```bash
cd ../pi-admin
npm run dev
```

Open your browser:

```text
http://localhost:5173
```

---

## 8. Deployment Scripts

The repository includes automated PowerShell deployment scripts for Windows.

Both deployments use the shared `scripts/common/DeployCommon.psm1` module for SSH, SCP, configuration loading, logging, and remote script execution.

### API Deployment

First, publish the backend for your Raspberry Pi architecture.

Example for Linux ARM64:

```powershell
dotnet publish -c Release -r linux-arm64 --self-contained true -o publish
```

Configure `scripts/api/.env`:

```env
PI_USER=your-linux-user
PI_HOST=your-pi-host
LOCAL_PUBLISH=C:\path\to\pi-api\publish
REMOTE_PUBLISH=/mnt/hdd/publish
REMOTE_SCRIPT=/admin/pi-admin-api/deploy.sh
```

Deploy from the repository root:

```powershell
.\scripts\api\api-deploy.ps1
```

The script uploads the publish files and `deploy.sh`, then executes the remote deployment and systemd setup.

### Frontend Deployment

Build the React application:

```bash
npm run build
```

Configure `scripts/web/.env`:

```env
PI_USER=your-linux-user
PI_HOST=your-pi-host
LOCAL_DIST=C:\path\to\pi-admin\dist
REMOTE_DIST=/mnt/hdd/dist
REMOTE_SCRIPT=/admin/web/setup-web.sh
```

Deploy from the repository root:

```powershell
.\scripts\web\web-deploy.ps1
```

The script uploads the frontend build and `setup-web.sh`, then executes the remote deployment and Nginx setup.

### Deployment Logs

Logs are saved in:

```text
scripts/logs/api-deploy.log
scripts/logs/web-deploy.log
```

Each deployment overwrites its previous log.

---

## Important Notes

- Build the API or frontend before running its deployment script.
- Deployment paths and SSH settings are configured through the corresponding `.env` files.
- SSH and sudo passwords may be requested during deployment.
- Do not commit real `.env` files or secrets. Use `.env.example` files instead.
- The current deployment process replaces existing files and does not support automatic rollback.
- PWA updates may require a browser reload or Service Worker update after deployment.
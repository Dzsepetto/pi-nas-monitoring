# Backend Documentation

The Pi NAS Monitoring backend is built with **ASP.NET Core 8 Web API** and provides REST endpoints for authentication, system monitoring and storage information.

---

# Overview

The backend is responsible for:

- User authentication using JWT
- Collecting system information
- Monitoring storage devices
- Communicating with Hard Disk Sentinel
- Serving data to the React frontend through a REST API

---

# Technology Stack

| Technology | Purpose |
|------------|---------|
| ASP.NET Core 8 | Web API |
| JWT Bearer Authentication | Authentication |
| Swagger | API documentation |
| DotNetEnv | Environment variables |

---

# Project Structure

```text
pi-admin-api/
│
├── Controllers/
├── Services/
├── Interfaces/
├── Models/
├── Data/
├── Program.cs
├── appsettings.json
└── .env
```

---

# Controllers

The API is organized into multiple controllers, each responsible for a specific area of the application.

| Controller | Description |
|------------|-------------|
| AuthController | User authentication and JWT token generation |
| DashboardController | Dashboard summary information |
| StorageController | Storage device information |
| StorageOverviewController | Storage usage overview |
| SystemController | System information |
| HDSentinelController | Hard Disk Sentinel integration |

---

# Authentication

The API uses **JWT Bearer Authentication**.

Protected endpoints require an Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

JWT validation includes:

- Issuer
- Audience
- Lifetime
- Signing key

---

# Dependency Injection

Application services are registered through ASP.NET Core's built-in dependency injection container.

Registered services include:

- AuthService
- DashboardService
- StorageService
- StorageOverviewService
- SystemService
- HDSentinelService

Each service is exposed through its corresponding interface.

---

# Configuration

Application configuration is loaded from:

- `appsettings.json`
- `.env`

Sensitive values such as JWT configuration should be stored outside of source control.

Example:

```env
JWT_KEY=your-secret-key
```

---

# CORS

During development the API accepts requests from:

```text
http://localhost:5173
http://127.0.0.1:5173
```

These origins correspond to the Vite development server.

---

# Swagger

Swagger UI is enabled in development and provides interactive API documentation.

After starting the backend, open:

```
https://localhost:<port>/swagger
```

or

```
http://localhost:<port>/swagger
```

depending on your configuration.

---

# Request Flow

```text
React Frontend
        │
        ▼
ASP.NET Core Controllers
        │
        ▼
Application Services
        │
        ▼
Linux Commands / Hard Disk Sentinel
        │
        ▼
Response returned as JSON
```

---

# Data Flow

1. A request is sent from the React frontend.
2. The appropriate controller receives the request.
3. The controller delegates the work to a service.
4. The service collects data from the operating system or Hard Disk Sentinel.
5. The result is returned as JSON to the frontend.

---

# Security

Authentication is handled using JWT Bearer tokens.

Unauthorized requests to protected endpoints will receive:

- **401 Unauthorized**

Requests with insufficient permissions may receive:

- **403 Forbidden**

---

# Future Improvements

Possible future enhancements include:

- Refresh Tokens
- Role-based authorization
- Request logging
- Rate limiting
- Health Check endpoints
- Docker deployment
- Unit and integration tests
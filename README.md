# CarServ - Full Stack Next.js CI/CD Project


# CarServ 🚗
A full-stack vehicle service management application built with Next.js 16, MongoDB, Docker, Jenkins, and Azure App Service.

This project demonstrates a complete DevOps workflow including:

- Containerized Next.js application
- MongoDB integration
- Docker multi-stage builds
- Jenkins CI/CD pipeline
- GitHub webhooks
- Azure Container Registry (ACR)
- Azure App Service deployment
- Automated container deployment

---

# 📌 Features

## Application Features
- Customer management
- Vehicle service tracking
- Service reminders
- CRUD operations for services
- MongoDB database integration
- REST API using Next.js App Router

## DevOps Features
- Dockerized application
- Multi-stage Docker builds
- CI/CD pipeline with Jenkins
- GitHub webhook automation
- Azure cloud deployment
- Container Registry integration
- Production-ready deployment workflow

---

# 🛠 Tech Stack

## Frontend & Backend
- Next.js 16
- React
- TypeScript
- Node.js

## Database
- MongoDB
- Mongoose

## DevOps & Cloud
- Docker
- Docker Compose
- Jenkins
- GitHub
- Azure Container Registry (ACR)
- Azure App Service

---

# 🏗 Architecture

```text
GitHub
   ↓
GitHub Webhook
   ↓
Jenkins (Docker Container)
   ↓
Docker Build
   ↓
Push Image to Azure Container Registry
   ↓
Azure App Service
````

---

# 📂 Project Structure

```text
carserv/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── dashboard/
│   │   └── components/
│   │
│   └── lib/
│
├── models/
├── public/
├── Dockerfile
├── docker-compose.yml
├── Jenkinsfile
├── package.json
└── README.md
```

---

# 🐳 Docker Setup

## Build and Run Locally

```bash
docker compose up --build
```

Application runs on:

```text
http://localhost:3000
```

---

# 🔐 Environment Variables

Create a `.env` file:

```env
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=StrongPassword123
MONGO_DB=servicesdb

MONGO_URI=mongodb://admin:StrongPassword123@mongo:27017/servicesdb?authSource=admin

NODE_ENV=production
```

---

# 🐳 Docker Multi-Stage Build

This project uses multi-stage Docker builds to:

* Reduce image size
* Improve security
* Exclude development dependencies
* Optimize production deployment

---

# ⚙️ Jenkins CI/CD Pipeline

## Pipeline Stages

1. Clone GitHub repository
2. Build Docker image
3. Authenticate with Azure Container Registry
4. Push image to ACR
5. Azure App Service automatically pulls latest image

---

# ☁️ Azure Deployment

## Services Used

* Azure App Service (Linux Container)
* Azure Container Registry (ACR)

## Deployment Flow

```text
Developer Push
      ↓
GitHub Webhook
      ↓
Jenkins Pipeline
      ↓
Docker Image Build
      ↓
Push to ACR
      ↓
Azure App Service Deployment
```

---

# 🚀 Running Jenkins Locally

Jenkins runs inside Docker:

```bash
docker run -d ^
  --name jenkins ^
  -p 8080:8080 ^
  -p 50000:50000 ^
  -v jenkins_home:/var/jenkins_home ^
  -v //var/run/docker.sock:/var/run/docker.sock ^
  jenkins/jenkins:lts
```

Access Jenkins:

```text
http://localhost:8080
```

---

# 🔗 GitHub Webhook

GitHub webhooks are configured using ngrok to expose local Jenkins to the internet.

Example:

```text
https://random.ngrok-free.app/github-webhook/
```

---

# 📦 Docker Image Optimization

Optimizations used:

* Multi-stage builds
* Alpine Linux images
* Production dependency installation using `npm ci --production`
* `.dockerignore`

---

# 🔒 Security Practices

* Environment variables for secrets
* Dockerized deployment
* Production-only dependencies
* No hardcoded credentials
* Containerized isolation

---

# 🧪 Future Improvements

* JWT authentication
* Unit and integration testing
* Kubernetes deployment
* Azure Key Vault integration
* Monitoring & logging
* GitHub Actions migration
* HTTPS & custom domain

---

# 🧑‍💻 Author

FAZAL UR REHAMAN

Cloud Computing / DevOps Project

```
```

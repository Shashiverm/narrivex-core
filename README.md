# Narrivex Core

Narrivex Core is a full-stack TypeScript monorepo for real-time market storytelling.
It combines a Next.js web app with an Express API, JWT authentication, WebSocket updates, and PostgreSQL persistence.

## Stack

- Frontend: Next.js App Router, React, NextAuth, Tailwind CSS
- Backend: Express, TypeORM, PostgreSQL, Socket.IO
- Infra: Docker Compose, Vercel (frontend), Railway (backend)

## Monorepo Structure

```
.
├── narrivex-frontend/
├── narrivex-backend/
└── docker-compose.yml
```

## Requirements

- Node.js 22+
- npm 10+
- Docker (optional for local containerized run)

## Quick Start (Local)

### 1. Backend

```bash
cd narrivex-backend
cp .env.example .env
npm install
npm run migration:run
npm run dev
```

Backend default: http://localhost:3001

### 2. Frontend

```bash
cd narrivex-frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend default: http://localhost:3000

## Quick Start (Docker)

```bash
cp .env.example .env
cp narrivex-backend/.env.example narrivex-backend/.env
cp narrivex-frontend/.env.example narrivex-frontend/.env.local
docker compose up --build
```

Before running Docker for the first time, set a strong `POSTGRES_PASSWORD` in `.env`.

## Environment Variables

Only placeholders are committed in `.env.example` files.
Use strong secrets for production values.

Backend:

- JWT_SECRET
- DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- FRONTEND_URL

Frontend:

- NEXTAUTH_SECRET
- NEXTAUTH_URL
- BACKEND_API_URL
- NEXT_PUBLIC_API_URL
- NEXT_PUBLIC_WS_URL

OAuth providers (optional):

- GITHUB_ID, GITHUB_SECRET
- GOOGLE_ID, GOOGLE_SECRET

## API Surface

Core endpoints:

- POST /api/auth/login
- POST /api/auth/signup
- POST /api/auth/oauth
- POST /api/auth/verify
- GET /api/narratives/:symbol
- GET /api/narratives/:symbol/history
- POST /api/narratives/:symbol/regenerate
- GET /api/assets
- POST /api/assets
- DELETE /api/assets/:symbol
- GET /api/alerts/rules
- POST /api/alerts/rules
- PUT /api/alerts/rules/:id
- DELETE /api/alerts/rules/:id
- GET /health

## Security Notes

- Do not commit `.env` or `.env.local` files.
- Do not commit generated build artifacts (`dist`, `.next`).
- In production, set a strong JWT secret (minimum 32 characters).
- Restrict CORS origins via `FRONTEND_URL`.

## License

MIT (see LICENSE)

# Narrivex Core

Narrivex Core is a production-ready full-stack TypeScript monorepo that turns raw market movement into clear, real-time narratives.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Monorepo](https://img.shields.io/badge/Monorepo-Frontend%20%2B%20Backend-0F172A?style=for-the-badge&logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-16A34A?style=for-the-badge)

## About

Modern traders and analysts are overloaded with disconnected charts, feeds, and alerts. Narrivex Core unifies those moving parts into one platform:

- ingest market signals,
- generate contextual AI-supported narratives,
- deliver updates instantly through APIs and WebSockets,
- and surface everything in a focused, responsive dashboard.

## What Problem It Solves

Most market tools tell you what changed, but not why it matters.

Narrivex focuses on interpretation, not just data display.

- Reduces analysis time by converting events into concise narratives.
- Improves situational awareness with live updates and alerting.
- Centralizes authentication, assets, rules, and insights in one workflow.

## Tech Stack (SVG)

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth-4.x-111827?style=for-the-badge&logo=auth0&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-ORM-E83524?style=for-the-badge)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

### Data, Infra, Deployment

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-Backend-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)

## How It Works

### System Flow

![Narrivex system flow](docs/media/system-flow.svg)

### Runtime Flow

1. Market data arrives through ingestion services.
2. Backend normalizes and validates the stream.
3. Narrative engine generates insight text and metadata.
4. Events are persisted in PostgreSQL.
5. APIs return historical and current narratives.
6. WebSocket pushes real-time updates to connected dashboards.
7. Alert rules evaluate thresholds and trigger notifications.

## Product Walkthrough (Screenshots + Video)

### Dashboard Overview

![Dashboard overview](docs/media/screenshot-dashboard.svg)

### Alerts and Monitoring

![Alerts view](docs/media/screenshot-alerts.svg)

### Demo Video

Add your product walkthrough video URL here:

- https://www.youtube.com/watch?v=YOUR_DEMO_VIDEO_ID

## Project Structure

```text
.
├── docker-compose.yml
├── narrivex-backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── entities/
│   │   ├── middleware/
│   │   ├── migrations/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── websocket/
│   ├── package.json
│   └── tsconfig.json
├── narrivex-frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── api/
│   │   └── ...pages
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   └── package.json
└── README.md
```

## Local Development

### Requirements

- Node.js 22+
- npm 10+
- Docker (optional)

### 1) Start Backend

```bash
cd narrivex-backend
cp .env.example .env
npm install
npm run migration:run
npm run dev
```

Backend runs on `http://localhost:3001` by default.

### 2) Start Frontend

```bash
cd narrivex-frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs on `http://localhost:3000` by default.

## Docker Quick Start

```bash
cp .env.example .env
cp narrivex-backend/.env.example narrivex-backend/.env
cp narrivex-frontend/.env.example narrivex-frontend/.env.local
docker compose up --build
```

Set a strong `POSTGRES_PASSWORD` in root `.env` before first run.

## Environment Variables

Use `.env.example` files as templates and never commit real secrets.

### Backend

- JWT_SECRET
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME
- FRONTEND_URL

### Frontend

- NEXTAUTH_SECRET
- NEXTAUTH_URL
- BACKEND_API_URL
- NEXT_PUBLIC_API_URL
- NEXT_PUBLIC_WS_URL

### Optional OAuth Providers

- GITHUB_ID
- GITHUB_SECRET
- GOOGLE_ID
- GOOGLE_SECRET

## API Surface

### Auth

- POST `/api/auth/login`
- POST `/api/auth/signup`
- POST `/api/auth/oauth`
- POST `/api/auth/verify`

### Narratives

- GET `/api/narratives/:symbol`
- GET `/api/narratives/:symbol/history`
- POST `/api/narratives/:symbol/regenerate`

### Assets

- GET `/api/assets`
- POST `/api/assets`
- DELETE `/api/assets/:symbol`

### Alerts

- GET `/api/alerts/rules`
- POST `/api/alerts/rules`
- PUT `/api/alerts/rules/:id`
- DELETE `/api/alerts/rules/:id`

### Health

- GET `/health`

## Security

- Never commit `.env` or `.env.local`.
- Never commit build outputs (`dist`, `.next`).
- Use a JWT secret of at least 32 characters.
- Restrict backend CORS using `FRONTEND_URL`.

## License

MIT. See [LICENSE](LICENSE).

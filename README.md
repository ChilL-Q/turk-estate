# TurkEstate — B2B PropTech Platform

A premium closed-network B2B marketplace connecting verified Turkish real estate agencies with global buyers. Every participant is vetted by **VKN** (tax number) and **TTYB** (government realtor license).

Built as a **monorepo** targeting web and mobile from a single shared codebase.

---

## Repository Structure

```
turkestate/
├── backend/                  # Python FastAPI — REST API
├── frontend/                 # Next.js 14 — web application
├── packages/
│   └── api-client/           # Shared TypeScript API client (web + mobile)
└── docker-compose.yml        # PostgreSQL, Elasticsearch, Redis
```

> `packages/api-client` is a framework-agnostic TypeScript package shared between the Next.js web app and the future React Native mobile app. API types, HTTP logic, and endpoint definitions live here once.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Python 3.10, FastAPI, Hexagonal Architecture |
| **Database** | PostgreSQL 15 + Prisma ORM |
| **Search** | Elasticsearch 8.11 (Turkish analyzer, geo_point) |
| **Auth** | JWT (HS256, 24h TTL) |
| **Web frontend** | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| **Mobile (roadmap)** | React Native + Expo |
| **Shared API client** | TypeScript, framework-agnostic |
| **Infrastructure** | Docker Compose (dev), Nomad + Consul (prod) |

---

## Features

- **Strict B2B onboarding** — agency verified via VKN + TTYB before access
- **Smart Search** — Elasticsearch faceted search with Turkish morphological analyzer and geospatial queries
- **Turkish citizenship filter** — listings eligible under the $400k+ program
- **Iskan filter** — building occupancy permit (iskan belgesi)
- **Tapu status** — full ownership, share ownership, floor easement
- **Property Map** — Leaflet with dynamic loading (SSR-safe)
- **WhatsApp deeplink** — contact agent directly from listing card
- **Pro-Panel dashboard** — agency workspace for managing listings and analytics
- **Multilingual** — English, Russian, Turkish (i18n context)

---

## Getting Started

### Prerequisites

- Node.js 18+, Python 3.10+, Docker + Docker Compose

### 1. Start infrastructure

```bash
docker-compose up -d
```

PostgreSQL (`:5432`), Elasticsearch (`:9200`), Redis (`:6379`).

### 2. Backend

```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install fastapi uvicorn prisma pydantic elasticsearch pydantic-settings pyjwt bcrypt aiohttp

cp .env.example .env      # configure environment variables
prisma db push            # apply schema
python -m scripts.seed    # seed with sample data

uvicorn app.main:app --reload --port 8000
```

API docs: `http://localhost:8000/docs`

### 3. Web frontend

```bash
# From repo root — installs all workspaces including packages/api-client
npm install
npm run dev   # http://localhost:3001
```

Or directly:

```bash
cd frontend
npm install && npm run dev
```

---

## Project Structure

```
turkestate/
├── backend/
│   ├── app/
│   │   ├── core/           # config, database
│   │   ├── domain/         # entities, repository interfaces
│   │   ├── application/    # use cases
│   │   ├── infrastructure/ # Prisma repos, Elasticsearch
│   │   └── presentation/   # FastAPI routers & endpoints
│   ├── prisma/schema.prisma
│   └── scripts/seed.py
├── frontend/
│   └── src/
│       ├── app/            # Next.js App Router pages
│       ├── components/     # Header, PropertyMap
│       ├── context/        # LanguageContext (i18n)
│       └── i18n/           # ru.json, en.json, tr.json
└── packages/
    └── api-client/
        └── src/
            ├── types.ts        # All TypeScript types
            ├── client.ts       # Base HTTP client class
            ├── index.ts        # createTurkEstateApi() factory
            └── endpoints/
                ├── auth.ts
                ├── agencies.ts
                ├── search.ts
                └── locations.ts
```

---

## API Reference

Base URL: `http://localhost:8000/api/v1`

| Method | Path | Description |
|---|---|---|
| `POST` | `/auth/login` | JWT authentication |
| `POST` | `/agencies/register` | B2B onboarding (VKN + TTYB validation) |
| `GET` | `/locations/cities` | List cities |
| `GET` | `/locations/cities/:id/districts` | Districts for a city |
| `GET` | `/search/` | Faceted property search |

---

## Shared API Client

Works in any JavaScript environment — web or mobile:

```typescript
import { createTurkEstateApi } from '@turkestate/api-client';

// Web (Next.js)
const api = createTurkEstateApi(process.env.NEXT_PUBLIC_API_URL!);

// Mobile (React Native / Expo)
const api = createTurkEstateApi(process.env.EXPO_PUBLIC_API_URL!);

// Login and attach JWT for authenticated requests
const session = await api.auth.login({ email, password });
api.client.setToken(session.access_token);

// Search listings
const listings = await api.search.searchListings({
  propertyType: 'APARTMENT',
  vatandasligaUygun: true,
  minPrice: 400_000,
});
```

---

## Mobile App Roadmap

The architecture is mobile-ready from day one:

- All business logic lives on the backend (REST API, no server-side rendering logic)
- Authentication uses JWT tokens, not cookies
- `@turkestate/api-client` is framework-agnostic — plug directly into React Native

To bootstrap the mobile workspace:

```bash
npx create-expo-app mobile --template blank-typescript
# Add "mobile" to workspaces in root package.json
# Add "@turkestate/api-client": "*" to mobile/package.json
npm install
```

---

## Environment Variables

**backend/.env**
```env
DATABASE_URL=postgresql://turkestate_admin:admin_password_super_secure@localhost:5432/turkestate_db
SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
JWT_EXPIRE_HOURS=24
```

**frontend/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## License

Private. All rights reserved.

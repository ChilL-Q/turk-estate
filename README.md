# TurkEstate — B2B PropTech Platform

A closed B2B marketplace for the Turkish real estate market. Connects verified agencies, developers, and independent realtors with international buyers. Every participant is vetted by VKN (tax number) and TTYB (government realtor license).

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 14 · TypeScript · Tailwind CSS · Framer Motion |
| Backend | FastAPI · Hexagonal Architecture · Python 3.10 |
| ORM | Prisma (async Python client) |
| Database | PostgreSQL |
| Search | Elasticsearch 8.11 (Turkish analyzer + geo_point) |
| Auth | JWT (pyjwt, HS256, 24h TTL) |
| Infrastructure | Docker · docker-compose |

---

## Features

- **Agency Catalog** — three organization types: Real Estate Agencies, Developers, Independent Realtors. TTYB license verification.
- **Listings** — full CRUD with Elasticsearch sync. Filters: property type, rooms, price, İskan, citizenship eligibility.
- **Smart Search** — full-text search with Turkish morphological analyzer and geospatial queries.
- **Property Map** — Leaflet with dynamic loading (SSR-safe).
- **WhatsApp Deeplink** — contact the agent directly from the property card.
- **B2B Dashboard** — agency workspace for managing listings.
- **Multilingual** — RU / EN / TR.

---

## Getting Started

### 1. Infrastructure (PostgreSQL + Elasticsearch)

```bash
docker-compose up -d
```

### 2. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn prisma pydantic elasticsearch pydantic-settings pyjwt bcrypt aiohttp

# Copy and configure environment variables
cp .env.example .env

# Apply schema to database
prisma db push

# Seed with sample data (4 cities, 6 agencies, 10 listings)
python -m scripts.seed

# Start the server
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install

# Copy environment variables
cp .env.local.example .env.local

npm run dev  # http://localhost:3001
```

---

## Project Structure

```
turk-estate/
├── backend/
│   ├── app/
│   │   ├── core/           # config, database
│   │   ├── domain/         # entities, repository interfaces
│   │   ├── application/    # use cases
│   │   ├── infrastructure/ # Prisma repos, Elasticsearch
│   │   └── presentation/   # FastAPI routers & endpoints
│   ├── prisma/
│   │   └── schema.prisma
│   └── scripts/
│       └── seed.py         # sample data
└── frontend/
    ├── src/
    │   ├── app/            # Next.js App Router pages
    │   ├── components/     # Header, PropertyMap
    │   ├── context/        # LanguageContext (i18n)
    │   ├── i18n/           # ru.json, en.json, tr.json
    │   └── lib/
    │       └── api.ts      # API client
    └── tailwind.config.ts
```

---

## API Reference

Base URL: `http://localhost:8000/api/v1`

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/auth/login` | JWT authentication |
| `GET` | `/agencies/` | List agencies |
| `POST` | `/agencies/register` | Register agency (VKN + TTYB) |
| `GET` | `/listings/` | List properties |
| `GET` | `/listings/{id}` | Property detail |
| `POST` | `/listings/` | Create listing (auth required) |
| `GET` | `/search/listings` | Search via Elasticsearch |
| `GET` | `/address/cities` | List cities |

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

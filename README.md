# TurkEstate: B2B PropTech Platform

TurkEstate is a premium closed-network B2B real estate marketplace connecting verified Turkish agencies with global buyers. 

## System Architecture & Target Infrastructure
- **Backend Services**: Python FastAPI microservices following Hexagonal Architecture.
- **Database Layer**: PostgreSQL (primary relational DB) driven by Prisma ORM.
- **Search & Discovery**: Elasticsearch for full-text, faceted, and geospatial lookups.
- **Caching & Queues**: Redis, Memcache, and RabbitMQ for asynchronous processing.
- **Frontend SPA**: Next.js 14 (Node.js/React/TypeScript) and Tailwind CSS.
- **Infrastructure Orchestration**: Nomad and Consul (replacing standard K8s), with automated CI/CD.
- **Data & ML**: Hadoop stack for big data, Machine Learning algorithm wrappers for ranking and recommendations.
- **Mobile (Roadmap)**: Native iOS (Swift/Objective-C) and Android (Kotlin/Java).

## Core Domain Features
- **Strict B2B Onboarding**: Agencies must provide valid Tax Numbers (VKN) and Real Estate Licenses (TTYB) to register and list properties.
- **Elasticsearch Native**: Complex filtering accommodating Turkish properties (Tapu Status, Iskan, Aidat, Citizenship Eligibility algorithms).
- **Pro-Panel Dashboard**: Agency workspace for managing listings, evaluating broker performance analytics, and handling XML feed imports.
- **Premium B2C UI**: Light mode aesthetic inspired by leading platforms (CIAN, Zillow) tailored specifically for high-end international and local real estate buyers.

## Running Locally

### Frontend Node Server
```bash
cd frontend
npm install
npm run dev
```

### Python FastAPI Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn prisma pydantic elasticsearch pydantic-settings pyjwt bcrypt
prisma generate
uvicorn app.main:app --reload
```

## Production Details
Please refer to the MVP Roadmap documentation before launching the staging cluster in Kubernetes. Elasticsearch requires a minimum of 4GB allocated memory for robust polygon mapping.

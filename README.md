# TurkEstate — B2B PropTech Platform

Закрытая B2B-платформа для турецкого рынка недвижимости. Соединяет верифицированные агентства, застройщиков и риелторов с международными покупателями. Каждый участник проходит проверку по VKN (налоговый номер) и TTYB (государственная лицензия риелтора).

---

## Стек

| Слой | Технологии |
|------|-----------|
| Frontend | Next.js 14 · TypeScript · Tailwind CSS · Framer Motion |
| Backend | FastAPI · Hexagonal Architecture · Python 3.10 |
| ORM | Prisma (async Python client) |
| База данных | PostgreSQL |
| Поиск | Elasticsearch 8.11 (турецкий анализатор + geo_point) |
| Аутентификация | JWT (pyjwt, HS256, 24h TTL) |
| Инфраструктура | Docker · docker-compose |

---

## Возможности

- **Каталог агентств** — три типа организаций: Агентства недвижимости, Компании-застройщики, Частные риелторы. Верификация по TTYB.
- **Листинги** — CRUD с синхронизацией в Elasticsearch. Фильтры: тип объекта, комнаты, цена, İskan, гражданство.
- **Умный поиск** — полнотекстовый поиск с турецким морфологическим анализатором и геопространственными запросами.
- **Карта объектов** — Leaflet с динамической загрузкой (SSR-safe).
- **WhatsApp deeplink** — связь с агентом напрямую из карточки объекта.
- **B2B Дашборд** — рабочее пространство агентства для управления листингами.
- **Мультиязычность** — RU / EN / TR.

---

## Локальный запуск

### 1. Инфраструктура (PostgreSQL + Elasticsearch)

```bash
docker-compose up -d
```

### 2. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn prisma pydantic elasticsearch pydantic-settings pyjwt bcrypt aiohttp

# Скопируй и настрой переменные окружения
cp .env.example .env

# Применить схему к базе данных
prisma db push

# Заполнить тестовыми данными (4 города, 6 агентств, 10 объектов)
python -m scripts.seed

# Запустить сервер
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install

# Скопируй переменные окружения
cp .env.local.example .env.local

npm run dev  # http://localhost:3001
```

---

## Структура проекта

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
│       └── seed.py         # тестовые данные
└── frontend/
    ├── src/
    │   ├── app/            # Next.js App Router pages
    │   ├── components/     # Header, PropertyMap
    │   ├── context/        # LanguageContext (i18n)
    │   ├── i18n/           # ru.json, en.json, tr.json
    │   └── lib/
    │       └── api.ts      # API-клиент
    └── tailwind.config.ts
```

---

## API

База: `http://localhost:8000/api/v1`

| Метод | Путь | Описание |
|-------|------|----------|
| `POST` | `/auth/login` | JWT-аутентификация |
| `GET` | `/agencies/` | Список агентств |
| `POST` | `/agencies/register` | Регистрация агентства (VKN + TTYB) |
| `GET` | `/listings/` | Список объектов |
| `GET` | `/listings/{id}` | Карточка объекта |
| `POST` | `/listings/` | Создать объект (auth required) |
| `GET` | `/search/listings` | Поиск через Elasticsearch |
| `GET` | `/address/cities` | Список городов |

---

## Переменные окружения

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

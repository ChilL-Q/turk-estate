from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import db
from app.infrastructure.search.elasticsearch_client import es_client
from app.presentation.api.v1.endpoints import address, auth, agencies, search, listings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()
    try:
        await es_client.setup_index()
    except Exception:
        pass  # ES может быть недоступен в dev — не блокируем старт
    yield
    await db.disconnect()


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    description="Backend API for B2B Real Estate Marketplace",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(address.router, prefix="/api/v1/locations", tags=["Locations"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(agencies.router, prefix="/api/v1/agencies", tags=["B2B Agencies"])
app.include_router(search.router, prefix="/api/v1/search", tags=["Faceted Search"])
app.include_router(listings.router, prefix="/api/v1/listings", tags=["Listings"])


@app.get("/")
async def root():
    return {"message": "Welcome to TurkEstate B2B API", "status": "active"}

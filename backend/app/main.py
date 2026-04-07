from fastapi import FastAPI
from app.core.config import settings
from app.presentation.api.v1.endpoints import address, auth, agencies, search

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    description="Backend API for B2B Real Estate Marketplace"
)

app.include_router(address.router, prefix="/api/v1/locations", tags=["Locations"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(agencies.router, prefix="/api/v1/agencies", tags=["B2B Agencies"])
app.include_router(search.router, prefix="/api/v1/search", tags=["Faceted Search"])

@app.get("/")
async def root():
    return {"message": "Welcome to TurkEstate B2B API", "status": "active"}

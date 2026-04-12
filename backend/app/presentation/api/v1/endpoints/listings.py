from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException
from prisma import Prisma
from pydantic import BaseModel

from app.core.database import get_db
from app.infrastructure.repositories.prisma_listing_repository import PrismaListingRepository
from app.infrastructure.search.elasticsearch_client import es_client

router = APIRouter()


class CreateListingRequest(BaseModel):
    title: str
    description: str
    price: float
    currency: str = "TRY"
    propertyType: str
    tapuStatus: str
    iskan: bool = False
    aidat: float = 0.0
    krediyeUygun: bool = False
    vatandasligaUygun: bool = False
    rooms: str
    bathrooms: int = 1
    netSquareMeters: float
    grossSquareMeters: float
    floor: int
    totalFloors: int
    buildingAge: int
    neighborhoodId: int
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    agentId: str
    agencyId: str


def get_listing_repo(db: Prisma = Depends(get_db)) -> PrismaListingRepository:
    return PrismaListingRepository(db)


@router.get("/", response_model=List[Dict[str, Any]])
async def list_listings(
    page: int = 1,
    repo: PrismaListingRepository = Depends(get_listing_repo),
):
    skip = (page - 1) * 24
    return await repo.get_many(skip=skip, take=24)


@router.get("/{listing_id}", response_model=Dict[str, Any])
async def get_listing(
    listing_id: str,
    repo: PrismaListingRepository = Depends(get_listing_repo),
):
    listing = await repo.get_by_id(listing_id)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing


@router.post("/", response_model=Dict[str, Any], status_code=201)
async def create_listing(
    req: CreateListingRequest,
    repo: PrismaListingRepository = Depends(get_listing_repo),
):
    listing = await repo.create(data=req.model_dump())
    try:
        await es_client.sync_listing(listing)
    except Exception:
        pass  # ES sync non-fatal
    return listing

from fastapi import APIRouter, Depends
from prisma import Prisma

from app.core.database import get_db
from app.infrastructure.repositories.prisma_address_repository import PrismaAddressRepository

router = APIRouter()


def get_address_repo(db: Prisma = Depends(get_db)) -> PrismaAddressRepository:
    return PrismaAddressRepository(db)


@router.get("/cities")
async def read_cities(repo: PrismaAddressRepository = Depends(get_address_repo)):
    data = await repo.get_cities()
    return {"data": data}


@router.get("/cities/{city_id}/districts")
async def read_districts(city_id: int, repo: PrismaAddressRepository = Depends(get_address_repo)):
    data = await repo.get_districts_by_city(city_id)
    return {"data": data}


@router.get("/districts/{district_id}/neighborhoods")
async def read_neighborhoods(district_id: int, repo: PrismaAddressRepository = Depends(get_address_repo)):
    data = await repo.get_neighborhoods_by_district(district_id)
    return {"data": data}

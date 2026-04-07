from fastapi import APIRouter
from app.infrastructure.repositories.prisma_address_repository import PrismaAddressRepository

router = APIRouter()

# This would ideally be injected via a Dependency Injection container or Depends()
# In a full-blown Hexagonal architecture, we'd inject this at App startup.

@router.get("/cities")
async def read_cities():
    """
    Get all Turkish cities. (Mocked response until DB is populated)
    """
    return {"data": [{"id": 34, "name": "Istanbul"}, {"id": 7, "name": "Antalya"}]}

@router.get("/cities/{city_id}/districts")
async def read_districts(city_id: int):
    """
    Get districts (İlçe) for a specific city.
    """
    return {"data": []}

@router.get("/districts/{district_id}/neighborhoods")
async def read_neighborhoods(district_id: int):
    """
    Get neighborhoods (Mahalle) for a specific district.
    """
    return {"data": []}

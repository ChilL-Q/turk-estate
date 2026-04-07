from app.domain.repositories import AddressRepository
from prisma import Prisma
from typing import List

class PrismaAddressRepository(AddressRepository):
    def __init__(self, db: Prisma):
        self.db = db

    async def get_cities(self) -> List[dict]:
        cities = await self.db.city.find_many()
        return [city.model_dump() for city in cities]

    async def get_districts_by_city(self, city_id: int) -> List[dict]:
        districts = await self.db.district.find_many(where={"cityId": city_id})
        return [d.model_dump() for d in districts]

    async def get_neighborhoods_by_district(self, district_id: int) -> List[dict]:
        neighborhoods = await self.db.neighborhood.find_many(where={"districtId": district_id})
        return [n.model_dump() for n in neighborhoods]

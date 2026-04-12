from typing import List, Optional

from prisma import Prisma

from app.domain.repositories import AgencyRepository


class PrismaAgencyRepository(AgencyRepository):
    def __init__(self, db: Prisma):
        self.db = db

    async def find_by_vkn(self, vkn: str) -> Optional[dict]:
        agency = await self.db.agency.find_unique(where={"vkn": vkn})
        return agency.model_dump() if agency else None

    async def find_by_ttyb(self, ttyb: str) -> Optional[dict]:
        agency = await self.db.agency.find_unique(where={"ttyb": ttyb})
        return agency.model_dump() if agency else None

    async def create(self, name: str, vkn: str, ttyb: str, email: str) -> dict:
        agency = await self.db.agency.create(
            data={"name": name, "vkn": vkn, "ttyb": ttyb, "email": email, "status": "PENDING"}
        )
        return agency.model_dump()

    async def get_all(self, skip: int = 0, take: int = 50) -> List[dict]:
        agencies = await self.db.agency.find_many(skip=skip, take=take, order={"createdAt": "desc"})
        return [a.model_dump() for a in agencies]

    async def get_by_id(self, agency_id: str) -> Optional[dict]:
        agency = await self.db.agency.find_unique(where={"id": agency_id})
        return agency.model_dump() if agency else None

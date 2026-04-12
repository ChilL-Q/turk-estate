from typing import List, Optional

from prisma import Prisma


class PrismaListingRepository:
    def __init__(self, db: Prisma):
        self.db = db

    async def get_by_id(self, listing_id: str) -> Optional[dict]:
        listing = await self.db.listing.find_unique(
            where={"id": listing_id},
            include={
                "neighborhood": {
                    "include": {
                        "district": {
                            "include": {"city": True}
                        }
                    }
                },
                "agency": True,
                "agent": True,
            },
        )
        return listing.model_dump() if listing else None

    async def get_many(self, skip: int = 0, take: int = 24, agency_id: Optional[str] = None) -> List[dict]:
        where = {"agencyId": agency_id} if agency_id else {}
        listings = await self.db.listing.find_many(
            where=where,
            skip=skip,
            take=take,
            order={"createdAt": "desc"},
            include={
                "neighborhood": {
                    "include": {
                        "district": {
                            "include": {"city": True}
                        }
                    }
                },
                "agency": True,
            },
        )
        return [l.model_dump() for l in listings]

    async def create(self, data: dict) -> dict:
        listing = await self.db.listing.create(data=data)
        return listing.model_dump()

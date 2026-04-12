from abc import ABC, abstractmethod
from typing import List, Optional

class AddressRepository(ABC):
    """
    Abstract interface for the Data Access Layer concerning Turkish Address Hierarchy.
    (İl -> İlçe -> Mahalle).
    """

    @abstractmethod
    async def get_cities(self) -> List[dict]:
        pass

    @abstractmethod
    async def get_districts_by_city(self, city_id: int) -> List[dict]:
        pass

    @abstractmethod
    async def get_neighborhoods_by_district(self, district_id: int) -> List[dict]:
        pass

class AgencyRepository(ABC):
    """
    Handles business-only entities, checking VKN and TTYB.
    """

    @abstractmethod
    async def find_by_vkn(self, vkn: str) -> Optional[dict]:
        pass

    @abstractmethod
    async def find_by_ttyb(self, ttyb: str) -> Optional[dict]:
        pass

    @abstractmethod
    async def create(self, name: str, vkn: str, ttyb: str, email: str) -> dict:
        pass

    @abstractmethod
    async def get_all(self, skip: int = 0, take: int = 50) -> List[dict]:
        pass

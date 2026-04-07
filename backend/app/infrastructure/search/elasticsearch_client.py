from elasticsearch import AsyncElasticsearch
from app.core.config import settings

class ESClient:
    """
    Elasticsearch Infrastructure adapter for faceted real estate lookups.
    """
    def __init__(self):
        self.client = AsyncElasticsearch(settings.ELASTICSEARCH_URL)
        self.index_name = "turkestate_listings"
        
    async def ping(self) -> bool:
        return await self.client.ping()

    async def setup_index(self):
        """
        Creates index mappings catering to Turkish Tapu and Iskan properties.
        """
        mapping = {
            "mappings": {
                "properties": {
                    "id": {"type": "keyword"},
                    "title": {"type": "text", "analyzer": "turkish"},
                    "description": {"type": "text", "analyzer": "turkish"},
                    "price": {"type": "double"},
                    "propertyType": {"type": "keyword"},
                    "tapuStatus": {"type": "keyword"},
                    "iskan": {"type": "boolean"},
                    "krediyeUygun": {"type": "boolean"},
                    "vatandasligaUygun": {"type": "boolean"},
                    "cityId": {"type": "integer"},
                    "districtId": {"type": "integer"},
                    "neighborhoodId": {"type": "integer"},
                    "rooms": {"type": "keyword"},
                    "grossSquareMeters": {"type": "double"},
                    "location": {"type": "geo_point"},
                    "createdAt": {"type": "date"}
                }
            }
        }
        
        # Check if index exists before creating
        if not await self.client.indices.exists(index=self.index_name):
            await self.client.indices.create(index=self.index_name, body=mapping)
            
    async def sync_listing(self, listing_data: dict):
        """
        Indexes a raw Prisma listing dictionary to Elasticsearch.
        """
        await self.client.index(
            index=self.index_name, 
            id=listing_data["id"], 
            document=listing_data
        )
            
es_client = ESClient()

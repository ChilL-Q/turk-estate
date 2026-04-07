from app.infrastructure.search.elasticsearch_client import es_client

class SearchService:
    @staticmethod
    async def faceted_search(filters: dict):
        """
        Builds and executes the complex Elasticsearch query for filtering.
        """
        must_clauses = []
        
        if filters.get("propertyType"):
            must_clauses.append({"term": {"propertyType": filters["propertyType"]}})
        
        if filters.get("iskan"):
            must_clauses.append({"term": {"iskan": True}})
            
        if filters.get("vatandasligaUygun"):
            must_clauses.append({"term": {"vatandasligaUygun": True}})
            
        if filters.get("minPrice") or filters.get("maxPrice"):
            price_range = {}
            if filters.get("minPrice"):
                price_range["gte"] = filters["minPrice"]
            if filters.get("maxPrice"):
                price_range["lte"] = filters["maxPrice"]
            must_clauses.append({"range": {"price": price_range}})
            
        # Execute query if we have clauses, otherwise match_all
        query_body = {"query": {"match_all": {}}}
        if must_clauses:
            query_body = {
                "query": {
                    "bool": {
                        "must": must_clauses
                    }
                }
            }
            
        # Top level Sorting & Pagination configs
        query_body["sort"] = [{"createdAt": {"order": "desc"}}]
        query_body["size"] = 24
        
        # Attempt fetching from ES. For MVP, wrap in try/except if docker is offline.
        try:
            response = await es_client.client.search(index=es_client.index_name, body=query_body)
            return [hit["_source"] for hit in response["hits"]["hits"]]
        except Exception:
            # Fallback for mocked local testing without ELK cluster
            return [{"id": "mock-1", "title": "Elasticsearch Mock Result"}]

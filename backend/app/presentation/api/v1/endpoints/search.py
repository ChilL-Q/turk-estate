from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List, Dict, Any
from app.application.use_cases.search_service import SearchService

router = APIRouter()

@router.get("/", response_model=List[Dict[str, Any]])
async def search_listings(
    propertyType: Optional[str] = Query(None, description="APARTMENT, VILLA, COMMERCIAL"),
    iskan: bool = Query(False, description="Has building occupancy permit"),
    vatandasligaUygun: bool = Query(False, description="Eligible for Turkish Citizenship ($400k+)"),
    minPrice: Optional[float] = Query(None, description="Minimum price filter"),
    maxPrice: Optional[float] = Query(None, description="Maximum price filter"),
    page: int = Query(1, ge=1)
):
    """
    Search Turkiye properties utilizing Elasticsearch backend with specific Turkish market facets.
    """
    filters = {
        "propertyType": propertyType,
        "iskan": iskan,
        "vatandasligaUygun": vatandasligaUygun,
        "minPrice": minPrice,
        "maxPrice": maxPrice,
        "page": page
    }
    
    try:
        results = await SearchService.faceted_search(filters=filters)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search engine unavailable: {str(e)}")

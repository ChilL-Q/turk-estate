from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.application.use_cases.agency_service import AgencyService
from typing import Dict, Any

router = APIRouter()

class AgencyRegistrationRequest(BaseModel):
    name: str
    vkn: str
    ttyb: str
    email: str

@router.post("/register", response_model=Dict[str, Any])
async def register_agency(req: AgencyRegistrationRequest):
    """
    Register a new B2B agency. Validates Tax Number (VKN) and Real Estate License (TTYB).
    """
    try:
        is_valid = AgencyService.validate_agency_credentials(vkn=req.vkn, ttyb=req.ttyb)
        status = AgencyService.determine_onboarding_status(is_valid)
        
        # Here we would normally inject Prisma repository to persist this agency to the database.
        
        return {
            "message": "Agency successfully initiated onboarding", 
            "status": status, 
            "agency_name": req.name
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

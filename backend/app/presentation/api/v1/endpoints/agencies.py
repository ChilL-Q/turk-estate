from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException
from prisma import Prisma
from pydantic import BaseModel

from app.application.use_cases.agency_service import AgencyService
from app.core.database import get_db
from app.infrastructure.repositories.prisma_agency_repository import PrismaAgencyRepository

router = APIRouter()


class AgencyRegistrationRequest(BaseModel):
    name: str
    vkn: str
    ttyb: str
    email: str


def get_agency_repo(db: Prisma = Depends(get_db)) -> PrismaAgencyRepository:
    return PrismaAgencyRepository(db)


@router.get("/", response_model=List[Dict[str, Any]])
async def list_agencies(repo: PrismaAgencyRepository = Depends(get_agency_repo)):
    return await repo.get_all()


@router.post("/register", response_model=Dict[str, Any])
async def register_agency(
    req: AgencyRegistrationRequest,
    repo: PrismaAgencyRepository = Depends(get_agency_repo),
):
    try:
        is_valid = AgencyService.validate_agency_credentials(vkn=req.vkn, ttyb=req.ttyb)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if await repo.find_by_vkn(req.vkn):
        raise HTTPException(status_code=409, detail="Agency with this VKN already exists")
    if await repo.find_by_ttyb(req.ttyb):
        raise HTTPException(status_code=409, detail="Agency with this TTYB already registered")

    status = AgencyService.determine_onboarding_status(is_valid)
    agency = await repo.create(name=req.name, vkn=req.vkn, ttyb=req.ttyb, email=req.email)
    return {"message": "Agency registered", "status": status, "agency": agency}

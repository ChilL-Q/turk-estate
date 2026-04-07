from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(req: LoginRequest):
    """
    MVP Mock Authentication.
    Ideally replaces with OAuth2PasswordRequestForm and real pyjwt token generation spanning multiple roles.
    """
    if req.email == "admin@turkestate.com" and req.password == "admin123":
        return {
            "access_token": "mocked-jwt-token-superadmin",
            "token_type": "bearer",
            "role": "SUPER_ADMIN"
        }
    return {"error": "Invalid credentials", "status": 401}

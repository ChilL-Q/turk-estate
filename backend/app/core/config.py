from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "TurkEstate B2B Platform"

    # DB
    DATABASE_URL: str = "postgresql://turkestate_admin:admin_password_super_secure@localhost:5432/turkestate_db"

    # Elasticsearch
    ELASTICSEARCH_URL: str = "http://localhost:9200"

    # JWT
    SECRET_KEY: str = "change_me_in_production_use_openssl_rand_hex_32"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_HOURS: int = 24

    class Config:
        env_file = ".env"

settings = Settings()

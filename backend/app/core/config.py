from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "TurkEstate B2B Platform"
    
    # DB
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/turkestate"
    
    # Elasticsearch
    ELASTICSEARCH_URL: str = "http://localhost:9200"

    class Config:
        env_file = ".env"

settings = Settings()

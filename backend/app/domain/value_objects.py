import re
from dataclasses import dataclass
from typing import Optional

class DomainValidationError(Exception):
    pass

@dataclass(frozen=True)
class TTYBLicense:
    """Taşınmaz Ticareti Yetki Belgesi number"""
    license_number: str
    
    def __post_init__(self):
        # Format usually starts with city code (2 digits) followed by 5 digits
        if not re.match(r"^\d{7}$", self.license_number) and not re.match(r"^\d{10}$", self.license_number):
            raise DomainValidationError(f"Invalid TTYB format: {self.license_number}. Must be 7-10 digits.")

@dataclass(frozen=True)
class TaxNumber:
    """Vergi Kimlik Numarası (VKN) for Agencies"""
    vkn: str
    
    def __post_init__(self):
        if len(self.vkn) != 10 or not self.vkn.isdigit():
            raise DomainValidationError(f"VKN must be exactly 10 digits. Got: {self.vkn}")

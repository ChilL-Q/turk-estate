from app.domain.value_objects import TTYBLicense, TaxNumber, DomainValidationError

class AgencyService:
    """
    Application service orchestrating Agency business rules.
    """
    
    @staticmethod
    def validate_agency_credentials(vkn: str, ttyb: str) -> bool:
        """
        Validates Tax Number (VKN) and License (TTYB).
        For MVP, tests the domain format. Production would verify against E-Devlet/TTBS APIs.
        """
        try:
            _vkn = TaxNumber(vkn=vkn)
            _ttyb = TTYBLicense(license_number=ttyb)
            return True
        except DomainValidationError as e:
            raise ValueError(str(e))

    @staticmethod
    def determine_onboarding_status(vkn_valid: bool) -> str:
        # In this minimal logic, return VERIFIED if valid.
        return "VERIFIED" if vkn_valid else "PENDING"

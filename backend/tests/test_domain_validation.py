import pytest
from app.domain.value_objects import TaxNumber, TTYBLicense, DomainValidationError
from app.application.use_cases.agency_service import AgencyService

def test_tax_number_validation_success():
    """Valid 10-digit Turkish Tax Number."""
    valid_vkn = "1234567890"  
    vkn_obj = TaxNumber(vkn=valid_vkn)
    assert vkn_obj.vkn == valid_vkn

def test_tax_number_validation_failure():
    """Invalid VKN should raise domain validation exceptions."""
    invalid_vkn = "12345"
    with pytest.raises(DomainValidationError):
        TaxNumber(vkn=invalid_vkn)
        
    invalid_vkn_alpha = "12345ABC90"
    with pytest.raises(DomainValidationError):
        TaxNumber(vkn=invalid_vkn_alpha)

def test_ttyb_license_validation_success():
    """Valid 7-digit TTYB business license (Istanbul region)."""
    valid_ttyb = "3400512" 
    ttyb_obj = TTYBLicense(license_number=valid_ttyb)
    assert ttyb_obj.license_number == valid_ttyb

def test_agency_service_onboarding():
    """Ensure service orchestrates pure domain rules."""
    assert AgencyService.validate_agency_credentials(vkn="1234567890", ttyb="3400512") is True

def test_agency_service_onboarding_bad_agent():
    with pytest.raises(ValueError):
        AgencyService.validate_agency_credentials(vkn="BADDATA", ttyb="000")

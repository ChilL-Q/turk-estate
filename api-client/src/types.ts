// ─── Location ────────────────────────────────────────────────────────────────

export interface City {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
  cityId: number;
}

export interface Neighborhood {
  id: number;
  name: string;
  districtId: number;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: 'bearer';
  role: 'SUPER_ADMIN' | 'AGENCY_ADMIN' | 'AGENT';
}

// ─── Agency ───────────────────────────────────────────────────────────────────

export interface AgencyRegistrationRequest {
  name: string;
  /** 10-digit Turkish Tax Number */
  vkn: string;
  /** 7–10 digit Real Estate License */
  ttyb: string;
  email: string;
}

export type AgencyStatus = 'VERIFIED' | 'PENDING' | 'REJECTED';

export interface AgencyRegistrationResponse {
  message: string;
  status: AgencyStatus;
  agency_name: string;
}

// ─── Listings / Search ────────────────────────────────────────────────────────

export type PropertyType = 'APARTMENT' | 'VILLA' | 'COMMERCIAL';

export type TapuStatus = 'FULL_OWNERSHIP' | 'SHARE_OWNERSHIP' | 'FLOOR_EASEMENT' | 'PENDING';

export interface GeoPoint {
  lat: number;
  lon: number;
}

export interface Listing {
  id: string;
  title: string;
  propertyType: PropertyType;
  /** Has building occupancy permit (iskan belgesi) */
  iskan: boolean;
  /** Eligible for Turkish Citizenship ($400k+) */
  vatandasligaUygun: boolean;
  price: number;
  tapuStatus: TapuStatus;
  krediyeUygun: boolean;
  cityId: number;
  districtId: number;
  neighborhoodId: number;
  rooms: string;
  grossSquareMeters: number;
  location: GeoPoint;
  createdAt: string;
}

export interface SearchFilters {
  propertyType?: PropertyType;
  iskan?: boolean;
  vatandasligaUygun?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
}

// ─── Generic API response wrapper ─────────────────────────────────────────────

export interface ApiListResponse<T> {
  data: T[];
}

export interface ApiError {
  error: string;
  status: number;
}

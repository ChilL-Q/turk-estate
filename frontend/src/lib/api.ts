const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error((error as { detail?: string }).detail ?? `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Neighborhood {
  id: number;
  name: string;
  districtId: number;
  district?: District;
}

export interface District {
  id: number;
  name: string;
  cityId: number;
  city?: City;
}

export interface City {
  id: number;
  name: string;
}

export type AgencyType = 'REALTOR' | 'AGENCY' | 'DEVELOPER';

export interface Agency {
  id: string;
  name: string;
  vkn: string;
  ttyb: string;
  status: 'PENDING' | 'VERIFIED' | 'SUSPENDED';
  agencyType: AgencyType;
  email: string | null;
  phone: string | null;
  description: string | null;
  city: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  propertyType: 'APARTMENT' | 'VILLA' | 'COMMERCIAL' | 'LAND';
  tapuStatus: 'KAT_IRTIFAKI' | 'KAT_MULKIYETI' | 'ARSA_TAPULU' | 'HISSELI_TAPU';
  iskan: boolean;
  aidat: number;
  krediyeUygun: boolean;
  vatandasligaUygun: boolean;
  rooms: string;
  bathrooms: number;
  netSquareMeters: number;
  grossSquareMeters: number;
  floor: number;
  totalFloors: number;
  buildingAge: number;
  neighborhoodId: number;
  latitude: number | null;
  longitude: number | null;
  agentId: string;
  agencyId: string;
  createdAt: string;
  updatedAt: string;
  neighborhood?: Neighborhood;
  agency?: Agency;
  agent?: User;
}

// ─── Search ───────────────────────────────────────────────────────────────────

export interface SearchFilters {
  propertyType?: string;
  iskan?: boolean;
  vatandasligaUygun?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
}

export async function searchListings(filters: SearchFilters): Promise<Listing[]> {
  const params = new URLSearchParams();
  if (filters.propertyType) params.set('propertyType', filters.propertyType);
  if (filters.iskan) params.set('iskan', 'true');
  if (filters.vatandasligaUygun) params.set('vatandasligaUygun', 'true');
  if (filters.minPrice != null) params.set('minPrice', String(filters.minPrice));
  if (filters.maxPrice != null) params.set('maxPrice', String(filters.maxPrice));
  params.set('page', String(filters.page ?? 1));
  return apiFetch<Listing[]>(`/api/v1/search/?${params}`);
}

export async function getListing(id: string): Promise<Listing> {
  return apiFetch<Listing>(`/api/v1/listings/${id}`);
}

export async function getListings(page = 1): Promise<Listing[]> {
  return apiFetch<Listing[]>(`/api/v1/listings/?page=${page}`);
}

export async function getAgencies(): Promise<Agency[]> {
  return apiFetch<Agency[]>('/api/v1/agencies/');
}

export async function getCities(): Promise<{ data: City[] }> {
  return apiFetch<{ data: City[] }>('/api/v1/locations/cities');
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatPrice(price: number, currency: string): string {
  const symbols: Record<string, string> = { TRY: '₺', USD: '$', EUR: '€' };
  const symbol = symbols[currency] ?? currency;
  return `${symbol}${price.toLocaleString('tr-TR')}`;
}

export function getListingLocation(listing: Listing): string {
  const parts: string[] = [];
  if (listing.neighborhood?.name) parts.push(listing.neighborhood.name);
  if (listing.neighborhood?.district?.name) parts.push(listing.neighborhood.district.name);
  if (listing.neighborhood?.district?.city?.name) parts.push(listing.neighborhood.district.city.name);
  return parts.join(', ') || 'Türkiye';
}

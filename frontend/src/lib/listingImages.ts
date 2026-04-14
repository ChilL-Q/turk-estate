// Direct Unsplash image URLs — no API key or config needed.
// Permanent, resolution-specific links to real estate photos.

const IMAGES: Record<string, string[]> = {
  APARTMENT: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=500&fit=crop',
  ],
  VILLA: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1613490493576-4c5d00d8e9e8?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=500&fit=crop',
  ],
  COMMERCIAL: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&h=500&fit=crop',
  ],
  LAND: [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1470058869958-2a77bde41905?w=800&h=500&fit=crop',
  ],
};

/**
 * Returns a deterministic real estate photo URL for a listing.
 * Same listing ID always gets the same photo.
 */
export function getListingImage(id: string, propertyType: string): string {
  const pool = IMAGES[propertyType] ?? IMAGES.APARTMENT;
  const hex = id.replace(/-/g, '').slice(-6);
  const idx = parseInt(hex, 16) % pool.length;
  return pool[idx];
}

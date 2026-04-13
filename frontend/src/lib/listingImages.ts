// Specific picsum IDs that look like real estate
const IMAGES: Record<string, number[]> = {
  APARTMENT: [164, 165, 239, 271, 317, 453, 464, 534],
  VILLA:     [106, 188, 250, 338, 396, 437, 493, 545],
  COMMERCIAL:[152, 178, 256, 325, 373, 431, 510, 563],
  LAND:      [117, 167, 206, 259, 343, 407, 488, 527],
};

/**
 * Returns a deterministic Picsum photo URL for a listing.
 * Same listing ID always gets the same photo.
 */
export function getListingImage(id: string, propertyType: string): string {
  const pool = IMAGES[propertyType] ?? IMAGES.APARTMENT;
  const hex = id.replace(/-/g, '').slice(-6);
  const idx = parseInt(hex, 16) % pool.length;
  const picId = pool[idx];
  return `https://picsum.photos/id/${picId}/800/500`;
}

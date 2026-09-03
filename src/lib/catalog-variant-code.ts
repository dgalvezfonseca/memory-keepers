const normalizeFilmFormat = (filmType: string) =>
  filmType
    .toLowerCase()
    .replaceAll(" ", "")
    .replace(/[^a-z0-9]/g, "");

export function getVolumeVariantCode(productSlug: string, units: number): string {
  return `${productSlug}:volume:${units}`;
}

export function getReelVariantCode(productSlug: string, filmType: string, reelId: string): string {
  const diameter = reelId.replace(/[^0-9]/g, "");
  return `${productSlug}:reel:${normalizeFilmFormat(filmType)}:${diameter}`;
}

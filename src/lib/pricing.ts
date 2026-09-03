import type { ReelSize, VolumeTier } from "@/types/catalog";

export function recommendTier(tiers: VolumeTier[], requestedUnits: number): VolumeTier {
  const sorted = [...tiers].sort((a, b) => a.units - b.units);
  return sorted.find((tier) => tier.units >= requestedUnits) ?? sorted[sorted.length - 1]!;
}

export function reelSubtotal(reel: ReelSize, quantity: number): number {
  return reel.price * Math.max(1, quantity);
}

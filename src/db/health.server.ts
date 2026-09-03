import "@tanstack/react-start/server-only";

import { sql } from "drizzle-orm";

import { getDatabase } from "./index.server";

const HEALTH_CACHE_MS = 5_000;
let cached: { healthy: boolean; expiresAt: number } | undefined;
let pending: Promise<boolean> | undefined;

export async function isDatabaseHealthy(): Promise<boolean> {
  const now = Date.now();
  if (cached && cached.expiresAt > now) return cached.healthy;
  if (pending) return pending;

  pending = getDatabase()
    .execute(sql`SELECT 1`)
    .then(() => true)
    .catch(() => false)
    .then((healthy) => {
      cached = { healthy, expiresAt: Date.now() + HEALTH_CACHE_MS };
      return healthy;
    })
    .finally(() => {
      pending = undefined;
    });

  return pending;
}

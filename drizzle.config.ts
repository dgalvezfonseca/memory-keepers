import process from "node:process";

import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for Drizzle commands.");
}

export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: databaseUrl,
  },
  breakpoints: true,
  strict: true,
  verbose: true,
});

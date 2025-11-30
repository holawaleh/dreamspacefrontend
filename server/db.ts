import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Allow running without a database (use mocks) — set USE_MOCKS=true to force mock mode
const wantsMock = (process.env.USE_MOCKS === "true" || process.env.USE_MOCKS === "1");
export const hasDatabase = Boolean(process.env.DATABASE_URL) && !wantsMock;

if (!hasDatabase) {
  // Don't throw if DATABASE_URL isn't present — other code will fallback to a mock storage.
  console.warn("DATABASE_URL not present or mock mode requested — server will run with in-memory mocks.");
}

export let pool: Pool | undefined;
export let db: any | undefined;

if (hasDatabase && process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
}

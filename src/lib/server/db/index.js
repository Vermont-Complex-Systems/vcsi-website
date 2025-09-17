import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';

// Check if we're in a built/deployed environment vs development
// In development: src/lib/server/db/courses.db
// In production: ./courses.db (relative to build directory)
const isDevelopment = process.cwd().includes('vcsi-website') && !process.env.DEPLOYED;
const databaseUrl = process.env.DATABASE_URL || (isDevelopment ? 'src/lib/server/db/courses.db' : './courses.db');

const client = new Database(databaseUrl);
export const db = drizzle(client, { schema });

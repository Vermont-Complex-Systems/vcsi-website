import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';

const databaseUrl = process.env.DATABASE_URL || 'src/lib/server/db/courses.db';

const client = new Database(databaseUrl);
export const db = drizzle(client, { schema });

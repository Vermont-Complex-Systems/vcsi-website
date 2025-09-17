// src/lib/server/db/index.js
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';
import * as schema from './schema.js';

const dbPath = process.env.DATABASE_URL || path.join(process.cwd(), 'courses.db');

const client = new Database(dbPath);
export const db = drizzle(client, { schema });

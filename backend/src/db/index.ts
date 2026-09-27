import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// بيوصل الـ Backend بتاعك بقاعدة البيانات PostgreSQL عن طريق Drizzle.
import * as schema from "./schema";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL }); //  بدل ما كل request يعمل connection جديدة:
// الـ Pool بيدير مجموعة connections ويعيد استخدامها
export const db = drizzle(pool, { schema });

/// الملف ده بيتعامل مع الاسكيما

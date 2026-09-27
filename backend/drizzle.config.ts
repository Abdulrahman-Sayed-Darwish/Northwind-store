// مسؤول عن إعداد Drizzle Kit اللي بنستخدمه في الـ migrations والـ schema management.
/// <reference types="node" />
import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle", //حط ملفات الـ migrations في فولدر drizzle.
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});

/// drizzle.config.ts = Drizzle Kit يعرف فين الـ schema، نوع الداتابيز، وفين الـ DB اللي هيشتغل عليها

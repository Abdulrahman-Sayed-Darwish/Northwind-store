import { StreamChat } from "stream-chat";
import type { Env } from "./env.js";
import type { UserRole } from "../db/schema.js";
// الملف ده مسؤول عن ربط الـ Backend بتاعك بـ Stream Chat وتنظيم الـ Users اللي هيستخدموا الشات.
export function streamChatDisplayName(
  role: UserRole,
  displayName: string | null,
  email: string,
): string {
  const base = displayName ?? email.split("@")[0];
  if (role === "admin") return `Admin · ${base}`;
  if (role === "support") return `Support · ${base}`;
  return base;
}
// هاتلهو بيجهزلك الـ Client اللي هتتعامل من خلاله مع Stream.
export function getStreamChatServer(env: Env) {
  return StreamChat.getInstance(env.STREAM_API_KEY, env.STREAM_API_SECRET);
}

export function streamUserId(clerkUserId: string) {
  return `clerk_${clerkUserId}`;
}

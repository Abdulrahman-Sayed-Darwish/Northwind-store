import type { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { getLocalUser } from "../lib/users.js";
import {
  getStreamChatServer,
  streamChatDisplayName,
  streamUserId,
} from "../lib/stream.js";
import { getEnv } from "../lib/env.js";

const env = getEnv();
// المستخدم عامل Login بـ Clerk → الـ Backend يتأكد منه → يجيب بياناته → يجهز نفس المستخدم في Stream → يطلع له Token → الـ Frontend يستخدم الـ Token للدخول إلى Stream Chat.
export async function createStreamToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId, isAuthenticated } = getAuth(req);
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    //   1-- get user from db by userId
    const localUser = await getLocalUser(userId);
    if (!localUser) {
      res.status(503).json({ error: "Account not synced yet" });
      return;
    }

    const server = getStreamChatServer(env);
    //   get user from clerk by userId
    const clerkUser = await clerkClient.users.getUser(userId);

    const combined =
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
      null;

    const name = streamChatDisplayName(
      localUser.role,
      localUser.displayName ?? combined ?? clerkUser.username,
      localUser.email,
    );

    const image = clerkUser.imageUrl || undefined;
    const sid = streamUserId(userId);
    // Upsert = Update + Insert
    await server.upsertUser({ id: sid, name, image });
    // هنا Stream بيعمل Token للمستخدم.
    const token = server.createToken(sid);

    res.json({ token, apiKey: env.STREAM_API_KEY, userId: sid, name });
  } catch (e) {
    next(e);
  }
}

import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { getEnv } from "./lib/env";
import { clerkWebhookHandler } from "./webhooks/clerk";
import path from "node:path";
import fs from "node:fs";
import keepAliveCron from "./lib/cron";
import meRouter from "./routes/meRouter";
import productRouter from "./routes/productRouter";
import streamRouter from "./routes/streamRouter";
import checkoutRouter from "./routes/checkoutRouter";
const app = express();
app.use(cors());
const env = getEnv();
const PORT = env.PORT;
app.use(clerkMiddleware());

const rawJson = express.raw({ type: "application/json", limit: "1mb" }); //مشكلة التحقق من إن الـ Webhook جاي فعلًا من Clerk ومحدش لعب في البيانات.
// it's important that you don't parse the webhook event data, it should be in the raw format
app.post("/webhooks/clerk", rawJson, (req, res) => {
  void clerkWebhookHandler(req, res);
});
// app.post("/webhooks/polar", rawJson, (req, res) => {
//   void polarWebhookHandler(req, res);
// });

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/me", meRouter);
app.use("/api/products", productRouter);
app.use("/api/stream", streamRouter);
app.use("/api/checkout", checkoutRouter);
const publicDir = path.join(process.cwd(), "public");
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }

    if (req.path.startsWith("/api") || req.path.startsWith("/webhooks")) {
      next();
      return;
    }

    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  if (env.NODE_ENV === "production") {
    keepAliveCron.start();
  }
});

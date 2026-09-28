import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { getEnv } from "./lib/env";
import { clerkWebhookHandler } from "./webhooks/clerk";
const env = getEnv();
const app = express();
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
const PORT = env.PORT;
const rawJson = express.raw({ type: "application/json", limit: "1mb" }); //مشكلة التحقق من إن الـ Webhook جاي فعلًا من Clerk ومحدش لعب في البيانات.

// it's important that you don't parse the webhook event data, it should be in the raw format
app.post("/webhooks/clerk", rawJson, (req, res) => {
  void clerkWebhookHandler(req, res);
});

app.listen(PORT, () => {
  console.log("Listening on port 3001 ");
});

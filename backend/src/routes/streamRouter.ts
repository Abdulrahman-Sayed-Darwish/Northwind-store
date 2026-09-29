// import { getAuth } from "@clerk/express";
import { Router } from "express";
import { createStreamToken } from "../controllers/stream.controller";
// import { getLocalUser } from "../lib/users";

const router = Router();
router.post("/token", createStreamToken);
export default router;

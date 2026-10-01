import { Router } from "express";

import { createCheckout } from "../controllers/createCheckout.controller";

const router = Router();
router.post("/", createCheckout);
export default router;

import { Router } from "express";
import {
  getCategories,
  getProductBySlug,
  listProducts,
} from "../controllers/product.controller";

const router = Router();
router.get("/", listProducts);
router.get("/:slug", getProductBySlug);
router.get("/categories", getCategories);
export default router;

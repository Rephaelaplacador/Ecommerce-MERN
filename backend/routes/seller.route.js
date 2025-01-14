import express from "express";
import { getSellers, getSellerProducts } from "../controllers/seller.controller.js";

const router = express.Router();


router.get("/", getSellers);


router.get("/:id/products", getSellerProducts);

export default router;

import express from "express";
import { getAllUsers, updateUser, deleteUser } from "../controllers/users.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/all", protectRoute, adminRoute, getAllUsers)
router.put("/:id", protectRoute, updateUser); 
router.delete("/:id", protectRoute, adminRoute, deleteUser); 

export default router;

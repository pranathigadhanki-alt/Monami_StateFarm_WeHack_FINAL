import { Router } from "express";
import { getMyProfile } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get("/me", getMyProfile);

export default userRoutes;

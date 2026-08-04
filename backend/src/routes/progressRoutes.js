import { Router } from "express";
import { getMyProgress, updateMyProgress } from "../controllers/progressController.js";

const progressRoutes = Router();

progressRoutes.get("/me", getMyProgress);
progressRoutes.put("/me", updateMyProgress);

export default progressRoutes;

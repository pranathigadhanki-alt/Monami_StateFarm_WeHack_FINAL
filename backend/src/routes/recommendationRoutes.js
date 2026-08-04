import { Router } from "express";
import { getMyRecommendations } from "../controllers/recommendationController.js";

const recommendationRoutes = Router();

recommendationRoutes.get("/me", getMyRecommendations);

export default recommendationRoutes;

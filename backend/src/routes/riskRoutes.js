import { Router } from "express";
import { getLatestMyRiskScore, getMyRiskHistory, recalculateRiskScore } from "../controllers/riskController.js";

const riskRoutes = Router();

riskRoutes.get("/me/latest", getLatestMyRiskScore);
riskRoutes.get("/me/history", getMyRiskHistory);
riskRoutes.post("/recalculate", recalculateRiskScore);

export default riskRoutes;

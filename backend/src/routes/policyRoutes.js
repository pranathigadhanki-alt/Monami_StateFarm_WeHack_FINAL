import { Router } from "express";
import { getMyPolicy } from "../controllers/policyController.js";

const policyRoutes = Router();

policyRoutes.get("/me", getMyPolicy);

export default policyRoutes;

import { Router } from "express";
import { createSurvey, getMySurvey } from "../controllers/surveyController.js";

const surveyRoutes = Router();

surveyRoutes.get("/me/latest", getMySurvey);
surveyRoutes.post("/me", createSurvey);

export default surveyRoutes;

import { getLatestSurvey, saveSurvey } from "../models/surveyModel.js";
import { saveRiskScore } from "../models/riskModel.js";
import { calculateRiskScore } from "../services/riskService.js";

export async function createSurvey(req, res) {
  try {
    const survey = await saveSurvey(req.supabase, req.user.id, req.body);
    const { score, factors } = calculateRiskScore(survey);
    const riskScore = await saveRiskScore(req.supabase, req.user.id, score, factors);

    return res.status(201).json({
      survey,
      riskScore,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getMySurvey(req, res) {
  try {
    const survey = await getLatestSurvey(req.supabase, req.user.id);
    return res.json({ survey });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

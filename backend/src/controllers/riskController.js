import { getLatestRiskScore, getRiskHistory, saveRiskScore } from "../models/riskModel.js";
import { getLatestSurvey } from "../models/surveyModel.js";
import { calculateRiskScore } from "../services/riskService.js";

export async function recalculateRiskScore(req, res) {
  try {
    const survey = await getLatestSurvey(req.supabase, req.user.id);
    if (!survey) {
      return res.status(400).json({ error: "Survey data is required before calculating risk score" });
    }

    const { score, factors } = calculateRiskScore(survey);
    const riskScore = await saveRiskScore(req.supabase, req.user.id, score, factors);

    return res.status(201).json({ riskScore });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getLatestMyRiskScore(req, res) {
  try {
    const riskScore = await getLatestRiskScore(req.supabase, req.user.id);
    return res.json({ riskScore });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getMyRiskHistory(req, res) {
  try {
    const history = await getRiskHistory(req.supabase, req.user.id);
    return res.json({ history });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

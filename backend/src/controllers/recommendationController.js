import { getLatestRiskScore } from "../models/riskModel.js";
import { getLatestSurvey } from "../models/surveyModel.js";
import { getLatestRecommendation, getRecommendations, saveRecommendation } from "../models/recommendationModel.js";
import { buildRecommendation } from "../services/recommendationService.js";

export async function getMyRecommendations(req, res) {
  try {
    let latestRecommendation = await getLatestRecommendation(req.supabase, req.user.id);

    if (!latestRecommendation) {
      const surveyData = await getLatestSurvey(req.supabase, req.user.id);
      const riskScore = await getLatestRiskScore(req.supabase, req.user.id);
      const text = buildRecommendation({
        riskScore: riskScore?.score ?? 5,
        surveyData,
      });
      latestRecommendation = await saveRecommendation(req.supabase, req.user.id, text);
    }

    const recommendations = await getRecommendations(req.supabase, req.user.id);

    return res.json({
      latestRecommendation,
      recommendations,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

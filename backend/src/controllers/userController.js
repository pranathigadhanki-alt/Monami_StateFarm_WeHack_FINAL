import { getLatestRiskScore, getRiskHistory } from "../models/riskModel.js";
import { getUserProfile, upsertUserFromAuth } from "../models/userModel.js";

export async function getMyProfile(req, res) {
  try {
    let profile = {
      id: req.user.id,
      email: req.user.email,
      created_at: req.user.created_at,
    };

    try {
      await upsertUserFromAuth(req.supabase, req.user);
      const storedProfile = await getUserProfile(req.supabase, req.user.id);
      if (storedProfile) {
        profile = storedProfile;
      }
    } catch {
      // Fall back to auth profile when table-level policy blocks writes/reads.
    }

    const latestRiskScore = await getLatestRiskScore(req.supabase, req.user.id);
    const history = await getRiskHistory(req.supabase, req.user.id);

    return res.json({
      profile,
      latestRiskScore,
      history,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

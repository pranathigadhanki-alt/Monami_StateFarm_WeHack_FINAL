import { getPolicyByUser, saveOrUpdatePolicy } from "../models/policyModel.js";
import { getLatestRiskScore } from "../models/riskModel.js";

function buildPolicyFromRiskScore(score) {
  if (score >= 7) {
    return {
      type: "Premium",
      premium: 2600,
      renewalDate: new Date(Date.now() + 31536000000).toISOString(),
    };
  }

  if (score >= 4) {
    return {
      type: "Premium",
      premium: 1900,
      renewalDate: new Date(Date.now() + 31536000000).toISOString(),
    };
  }

  return {
    type: "Basic",
    premium: 1300,
    renewalDate: new Date(Date.now() + 31536000000).toISOString(),
  };
}

export async function getMyPolicy(req, res) {
  try {
    let policy = await getPolicyByUser(req.supabase, req.user.id);

    if (!policy) {
      const latestRiskScore = await getLatestRiskScore(req.supabase, req.user.id);
      const score = latestRiskScore?.score ?? 5;
      const generatedPolicy = buildPolicyFromRiskScore(score);
      policy = await saveOrUpdatePolicy(req.supabase, req.user.id, generatedPolicy);
    }

    return res.json({ policy });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

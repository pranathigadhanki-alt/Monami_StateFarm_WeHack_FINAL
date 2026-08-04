export function buildRecommendation({ riskScore, surveyData }) {
  const homeType = surveyData?.home_type || "home";
  const safetyFeatures = String(surveyData?.safety_features || "None");

  if (riskScore >= 7) {
    return `Your ${homeType.toLowerCase()} currently has elevated risk factors. We recommend a Premium policy with stronger weather and theft protection, plus lower deductibles. Consider adding smoke detection, leak sensors, and monitored security to reduce future premiums.`;
  }

  if (riskScore >= 4) {
    return `Your profile is moderate risk. A Premium policy offers better long-term value for your ${homeType.toLowerCase()}, especially if you expand safety upgrades beyond "${safetyFeatures}". This can improve protection while keeping renewal pricing stable.`;
  }

  return `Your profile is low risk, so a Basic policy can be cost-effective while still protecting your ${homeType.toLowerCase()}. Maintain your current safety setup ("${safetyFeatures}") and review replacement-cost options at renewal for added confidence.`;
}

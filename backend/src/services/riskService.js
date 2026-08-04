function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function parseHomeValue(value) {
  const normalized = String(value || "").replace(/[^0-9.]/g, "");
  return Number.parseFloat(normalized) || 0;
}

export function calculateRiskScore(surveyData) {
  const currentYear = new Date().getFullYear();
  const yearBuilt = Number(surveyData.year_built);
  const homeAge = Number.isFinite(yearBuilt) ? currentYear - yearBuilt : 30;
  const homeValue = parseHomeValue(surveyData.home_value);
  const zipcode = String(surveyData.zipcode || "");
  const safetyFeatures = String(surveyData.safety_features || "");

  const factors = {
    ageRisk: 0,
    zipcodeRisk: 0,
    valueRisk: 0,
    safetyAdjustment: 0,
  };

  factors.ageRisk = clamp(homeAge / 20, 0, 3);

  const lastDigit = Number.parseInt(zipcode.slice(-1), 10);
  factors.zipcodeRisk = Number.isNaN(lastDigit) ? 1 : clamp(lastDigit / 3.5, 0, 2.5);

  if (homeValue < 200000) factors.valueRisk = 1;
  else if (homeValue < 500000) factors.valueRisk = 1.8;
  else if (homeValue < 900000) factors.valueRisk = 2.4;
  else factors.valueRisk = 3;

  const normalizedSafety = safetyFeatures.toLowerCase();
  if (normalizedSafety.includes("all")) factors.safetyAdjustment = -2;
  else if (normalizedSafety.includes("smoke") && normalizedSafety.includes("security")) factors.safetyAdjustment = -1.4;
  else if (normalizedSafety.includes("smoke") || normalizedSafety.includes("security") || normalizedSafety.includes("leak")) factors.safetyAdjustment = -0.8;
  else factors.safetyAdjustment = 0;

  const raw = factors.ageRisk + factors.zipcodeRisk + factors.valueRisk + factors.safetyAdjustment;
  const score = Number(clamp(raw, 0, 10).toFixed(1));

  return { score, factors };
}

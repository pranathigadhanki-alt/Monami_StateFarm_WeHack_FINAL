import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
dotenv.config({ path: "backend/.env" });

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error("Missing Supabase URL or anon key in env files");
}

const supabase = createClient(url, anonKey);
const email = "monaLisa@gmail.com";
const password = "monami";

let signIn = await supabase.auth.signInWithPassword({ email, password });

if (signIn.error) {
  const signUp = await supabase.auth.signUp({ email, password });
  if (signUp.error) throw signUp.error;
  signIn = await supabase.auth.signInWithPassword({ email, password });
}

if (signIn.error || !signIn.data.user) {
  throw new Error(
    `${signIn.error?.message || "Login failed"}. If this says \"Email not confirmed\", disable Supabase email confirmation first and run: npm run seed:demo-user`,
  );
}

const userId = signIn.data.user.id;
const accessToken = signIn.data.session?.access_token;
const refreshToken = signIn.data.session?.refresh_token;
if (!accessToken) {
  throw new Error("Missing access token after login");
}
if (!refreshToken) {
  throw new Error("Missing refresh token after login");
}

const setSession = await supabase.auth.setSession({
  access_token: accessToken,
  refresh_token: refreshToken,
});
if (setSession.error) throw setSession.error;

const renewalDate = new Date(Date.now() + 31536000000).toISOString().slice(0, 10);

const ensureUser = await supabase
  .from("users")
  .upsert({ id: userId, email }, { onConflict: "id" });
if (ensureUser.error) {
  process.stdout.write(`Skipping users table seed (${ensureUser.error.message})\n`);
}

const survey = await supabase
  .from("survey_data")
  .select("id")
  .eq("user_id", userId)
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();
if (survey.error) throw survey.error;
if (!survey.data) {
  const insert = await supabase.from("survey_data").insert({
    user_id: userId,
    zipcode: "78701",
    year_built: 2016,
    home_value: "$450,000",
    home_type: "Single-family",
    safety_features: "Smoke detectors + Security system",
  });
  if (insert.error) throw insert.error;
}

const risk = await supabase
  .from("risk_scores")
  .select("id")
  .eq("user_id", userId)
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();
if (risk.error) throw risk.error;
if (!risk.data) {
  const insert = await supabase.from("risk_scores").insert({
    user_id: userId,
    score: 4.2,
    factors: {
      ageRisk: 0.5,
      zipcodeRisk: 1.2,
      valueRisk: 1.8,
      safetyAdjustment: -0.8,
    },
  });
  if (insert.error) throw insert.error;
}

const policy = await supabase.from("policies").upsert(
  {
    user_id: userId,
    type: "Premium",
    premium: 1900,
    renewal_date: renewalDate,
  },
  { onConflict: "user_id" },
);
if (policy.error) throw policy.error;

const recommendation = await supabase
  .from("recommendations")
  .select("id")
  .eq("user_id", userId)
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();
if (recommendation.error) throw recommendation.error;
if (!recommendation.data) {
  const insert = await supabase.from("recommendations").insert({
    user_id: userId,
    text: "We recommend Premium coverage with weather and theft protection. Add leak sensors and maintain your current smoke/security setup to reduce future premiums.",
  });
  if (insert.error) throw insert.error;
}

const progress = await supabase.from("user_progress").upsert(
  {
    user_id: userId,
    exhibits_completed: 2,
  },
  { onConflict: "user_id" },
);
if (progress.error) throw progress.error;

process.stdout.write(`Demo account is ready: ${email}\n`);
process.stdout.write("Use password in app: monami\n");

export async function saveRiskScore(supabase, userId, score, factors) {
  const { data, error } = await supabase
    .from("risk_scores")
    .insert({
      user_id: userId,
      score,
      factors,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function getLatestRiskScore(supabase, userId) {
  const { data, error } = await supabase
    .from("risk_scores")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getRiskHistory(supabase, userId) {
  const { data, error } = await supabase
    .from("risk_scores")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

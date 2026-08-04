export async function saveSurvey(supabase, userId, payload) {
  const { data, error } = await supabase
    .from("survey_data")
    .insert({
      user_id: userId,
      zipcode: payload.zipcode,
      year_built: payload.yearBuilt,
      home_value: payload.homeValue,
      home_type: payload.homeType,
      safety_features: payload.safetyFeatures,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function getLatestSurvey(supabase, userId) {
  const { data, error } = await supabase
    .from("survey_data")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

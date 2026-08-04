export async function saveRecommendation(supabase, userId, text) {
  const { data, error } = await supabase
    .from("recommendations")
    .insert({
      user_id: userId,
      text,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function getLatestRecommendation(supabase, userId) {
  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getRecommendations(supabase, userId) {
  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

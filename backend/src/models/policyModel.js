export async function saveOrUpdatePolicy(supabase, userId, payload) {
  const { data, error } = await supabase
    .from("policies")
    .upsert(
      {
        user_id: userId,
        type: payload.type,
        premium: payload.premium,
        renewal_date: payload.renewalDate,
      },
      { onConflict: "user_id" },
    )
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function getPolicyByUser(supabase, userId) {
  const { data, error } = await supabase
    .from("policies")
    .select("*")
    .eq("user_id", userId)
    .order("renewal_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

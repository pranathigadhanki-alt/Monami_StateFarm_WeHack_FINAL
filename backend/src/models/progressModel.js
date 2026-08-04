export async function getProgress(supabase, userId) {
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;

  return (
    data ?? {
      user_id: userId,
      exhibits_completed: 0,
    }
  );
}

export async function saveProgress(supabase, userId, exhibitsCompleted) {
  const { data, error } = await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: userId,
        exhibits_completed: exhibitsCompleted,
      },
      { onConflict: "user_id" },
    )
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

import { createSupabaseClientForUser, supabaseAdmin } from "../config/supabase.js";

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing bearer token" });
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = data.user;
  req.supabase = createSupabaseClientForUser(token);
  next();
}

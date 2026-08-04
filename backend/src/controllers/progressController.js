import { getProgress, saveProgress } from "../models/progressModel.js";

export async function getMyProgress(req, res) {
  try {
    const progress = await getProgress(req.supabase, req.user.id);
    return res.json({ progress });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function updateMyProgress(req, res) {
  try {
    const exhibitsCompleted = Number(req.body.exhibitsCompleted ?? 0);
    const progress = await saveProgress(req.supabase, req.user.id, exhibitsCompleted);
    return res.json({ progress });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

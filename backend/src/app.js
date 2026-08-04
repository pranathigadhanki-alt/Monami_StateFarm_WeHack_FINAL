import express from "express";
import cors from "cors";
import { requireAuth } from "./middleware/authMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";
import riskRoutes from "./routes/riskRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? true,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api", requireAuth);
app.use("/api/user-profile", userRoutes);
app.use("/api/survey", surveyRoutes);
app.use("/api/risk-scores", riskRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/renewal-suggestions", recommendationRoutes);
app.use("/api/progress", progressRoutes);

export default app;

import dotenv from "dotenv";

dotenv.config({ path: "backend/.env" });
dotenv.config();

const { default: app } = await import("./app.js");

const port = Number(process.env.PORT || 4000);

app.listen(port, () => {
  process.stdout.write(`Backend server running on port ${port}\n`);
});

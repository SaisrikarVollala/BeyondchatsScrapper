import express from "express";
import articleRoutes from "./routes/articles.route.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import storeToDB from "./scripts/storeToDB.js";

const app = express();
const PORT = ENV.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", articleRoutes);



app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);


async function startServer() {
  try {
    await connectDB();
    await storeToDB();

    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

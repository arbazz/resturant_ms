import express, { Application } from "express";
import { env } from "process";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app: Application = express();

// Middlewares
app.use("/api", router);

const PORT: string | Number = env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

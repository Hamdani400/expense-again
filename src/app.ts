import express from "express";
import cors from "cors";
import prisma from "./config/prisma";
import { errorHandler } from "./middleware/error.middleware";
import authRoute from "./modules/auth/auth.route";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoute);

app.use(errorHandler);

export default app;

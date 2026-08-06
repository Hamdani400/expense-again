import express from "express";
import cors from "cors";
import prisma from "./config/prisma";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();

  return res.json(users);
});

app.use(errorHandler);

export default app;

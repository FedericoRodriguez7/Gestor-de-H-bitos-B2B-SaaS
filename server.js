import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import habitosRoutes from "./routes/habitos.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/habitos", habitosRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(8080, () => console.log("Servidor corriendo en http://localhost:8080"));
  })
  .catch(err => console.error(err));

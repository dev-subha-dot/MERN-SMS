import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Routes
import employeeRoutes from "./routes/employeeRoutes.js";
dotenv.config();
const app = express();

app.use(express.static(path.join(process.cwd(), "src", "Uploads")));
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/employee", employeeRoutes);


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));

import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.get("/", (req, res) => {
    console.log("server is calling");
    res.send("Hello, API is working 🚀");
});


// Connect to MongoDB
connectDB();

// Routes
app.use("/employees", employeeRoutes);

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

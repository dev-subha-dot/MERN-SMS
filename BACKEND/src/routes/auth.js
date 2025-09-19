// routes/auth.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // basic checks
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // check existing email
        const existing = await User.findOne({ email: email });
        if (existing) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // ⚠️ store password directly (no bcrypt)
        const user = new User({
            fullName,
            email,
            password
        });

        await user.save();
        return res.status(200).json({ message: "User registered successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;4

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email: email, password: password });
        if (!user) {
            return res.status(400).json({ message: "not a valid user" });
        }

        return res.status(200).json({
            message: "Login successful",
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


export default router;



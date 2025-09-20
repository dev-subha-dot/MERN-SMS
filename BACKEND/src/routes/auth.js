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
            return res.json({ status: 400, message: "Please fill all fields" });
        }

        // check existing email
        const existing = await User.findOne({ email: email });
        if (existing) {
            return res.json({ status: 400, message: "Email already in use" });
        }

        // ⚠️ store password directly (no bcrypt)
        const user = new User({
            fullName,
            email,
            password
        });

        await user.save();
        return res.json({ status: 200, message: "User registered successfully" });
    } catch (err) {
        return res.json({ status: 500, message: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body; 4

        if (!email || !password) {
            return res.json({ status: 400, message: "Please provide email and password" });
        }

        const user = await User.findOne({ email: email, password: password });
        if (!user) {
            return res.json({ status: 400, message: "not a valid user" });
        }

        return res.json({
            status: 200, message: "Login successful",
        });

    } catch (err) {
        return res.json({ status: 500, message: err.message });
    }
});


export default router;



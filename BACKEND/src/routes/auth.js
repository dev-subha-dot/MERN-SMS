// routes/auth.js
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            fullName,
            email,
            password: hash
        });

        await user.save();
        return res.json({ status: 200, message: "User registered successfully" });
    } catch (err) {
        return res.json({ status: 500, message: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ status: 400, message: "Please provide email and password" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ status: 400, message: "not a valid user" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ status: 400, message: "Invalid password" });
        }
        const userObj = { id: user._id, name: user.fullName };
        const token = jwt.sign(userObj, process.env.JWT_SECREAT, { expiresIn: "1h" });

        return res.json({
            status: 200, message: "Login successful",
            token: token, userType: user.userType
        });

    } catch (err) {
        return res.json({ status: 500, message: err.message });
    }
});


export default router;



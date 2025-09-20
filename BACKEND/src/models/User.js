import mongoose from "mongoose";
import { regex } from "../config/config.js";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [
                regex.email,
                "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            match: [
                regex.password,
                "Password must be at least 8 characters long and include both uppercase and lowercase letters",
            ],
        },
        userType: {
            type: Number,
            default: 2
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
    },
    { timestamps: true } // automatically adds createdAt & updatedAt
);

export default mongoose.model("User", userSchema);

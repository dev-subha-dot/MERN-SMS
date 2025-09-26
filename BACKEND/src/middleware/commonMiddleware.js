import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
    console.log("========req=========", req.headers);
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) return res.json({ status: 401, message: "Unauthroized" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECREAT);
        console.log("decoded", decoded);
        req.user = decoded; // attach payload to request
        next();
    } catch (err) {
        return res.json({ status: 401, message: "Unauthroized" });
    }
};
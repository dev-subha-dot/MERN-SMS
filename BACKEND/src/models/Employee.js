import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    EmpId: { type: Number, required: true, unique: true },
    ProfileImg: { type: String },
    Name: { type: String, required: true },
    Department: { type: String },
    Designation: { type: String },
    Project: { type: String },
    Type: { type: String },
    Status: { type: String }
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);

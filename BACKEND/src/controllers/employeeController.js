// controllers/employeeController.js
import Employee from "../models/Employee.js";

// Create Employee
export const createEmployee = async (req, res) => {
  console.log("testing for CE", req.body)
  try {
    const { EmpId, ProfileImg, Name, Department, Designation, Project, Type, Status } = req.body;

    const employee = new Employee({ EmpId, ProfileImg, Name, Department, Designation, Project, Type, Status });
    await employee.save();

    res.json({ status: 200, message: "Created Successfully", data: employee });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

// Get Employees (with search + pagination)
export const getEmployee = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    // Search condition (case-insensitive)
    const searchCondition = search
      ? {
        $or: [
          { Name: { $regex: search, $options: "i" } },
          { EmpId: { $regex: search, $options: "i" } },
          { Department: { $regex: search, $options: "i" } },
          { Designation: { $regex: search, $options: "i" } },
          { Project: { $regex: search, $options: "i" } },
          { Type: { $regex: search, $options: "i" } },
          { Status: { $regex: search, $options: "i" } },
        ],
      }
      : {};

    // Query DB
    const employees = await Employee.find(searchCondition)
      .sort({ _id: 1 })
      .skip(skip)
      .limit(limit);

    const totalItems = await Employee.countDocuments(searchCondition);
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      status: 200,
      message: "",
      data: employees,
      pagination: { totalPages }
    });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

// Get Employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params._id);
    if (!employee) return res.json({ status: 404, message: "Employee not found" });

    res.json({ status: 200, message: "", data: employee });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

// Update Employee
export const updateEmployee = async (req, res) => {
  console.log("update", req.body)
  console.log("updated", req.params)

  try {
    const { _id } = req.body; // NOTE: changed to params instead of body
    const updatedEmployee = await Employee.findByIdAndUpdate(_id, req.body, { new: true });

    if (!updatedEmployee) return res.json({ status: 404, message: "Employee not found" });

    res.json({ status: 200, message: "Updated Successfully", data: updatedEmployee });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(_id);

    if (!deletedEmployee) return res.json({ status: 404, message: "Employee not found" });

    res.json({ status: 200, message: "Deleted Successfully" });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

// Upload Profile Image (just return file info for now)
export const uploadProfileImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 400, message: "No file uploaded" });
    }

    res.json({
      status: 200,
      message: "File uploaded successfully",
      file: req.file
    });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

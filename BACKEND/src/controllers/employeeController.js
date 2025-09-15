import { pool } from "../db.js";

export const createEmployee = async (req, res) => {
  try {
    const { EmpId, ProfileImg, Name, Department, Designation, Project, Type, Status } = req.body;
    const parsedEmployeedId = parseInt(EmpId);
    const [r] = await pool.query(
      "INSERT INTO Employee (EmpId, ProfileImg, Name, Department, Designation, Project, Type, Status) VALUES (?,?,?,?,?,?,?,?)",
      [parsedEmployeedId, ProfileImg, Name, Department, Designation, Project, Type, Status]
    );
    if (r) {
      res.json({ status: 200, message: "Created Successfully" })
    }
    else {
      res.json({ status: 400, message: "Failed To Create" })
    }
  }
  catch (err) {
    res.json({ status: 500, message: err.message })
  }
};

export const getEmployee = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const search = req.query.search;
    const offset = (page - 1) * limit;

    let searchCondition = "";
    let values = [];

    if (search) {
      searchCondition = `WHERE Name LIKE ? OR EmpId LIKE ? OR Department LIKE ? OR Designation LIKE ? OR Project LIKE ? OR Type LIKE ? OR Status LIKE ?`;
      const likeSearch = `%${search}%`;
      values = [likeSearch, likeSearch, likeSearch, likeSearch, likeSearch, likeSearch, likeSearch];
    }

    // Get paginated employees
    const [rows] = await pool.query(
      `SELECT * FROM Employee ${searchCondition} ORDER BY Id ASC LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    // Get total count
    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total FROM Employee ${searchCondition}`,
      values
    );

    const totalItems = countRows[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      status: 200,
      message: "",
      data: rows, // record
      pagination: {
        totalPages
      },
    });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Employee WHERE Id=?", [req.params.id]);
    if (rows) {
      res.json({ status: 200, message: "", data: rows[0] })
    }
    else {
      res.json({ status: 400, message: "Failed To Get" })
    }
  }
  catch (err) {
    res.json({ status: 500, message: err.message })
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { EmpId, ProfileImg, Name, Department, Designation, Project, Type, Status, Id } = req.body;
    const parsedEmployeedId = parseInt(EmpId);
    const [r] = await pool.query(
      "UPDATE Employee SET EmpId=?, ProfileImg=?, Name=?, Department=?, Designation=?, Project=?, Type=?, Status=? WHERE Id=?",
      [parsedEmployeedId, ProfileImg, Name, Department, Designation, Project, Type, Status, Id]
    );
    if (r) {
      res.json({ status: 200, message: "Updated Successfully" })
    }
    else {
      res.json({ status: 400, message: "Failed To Update" })
    }
  } catch (err) {
    res.json({ status: 500, message: err.message })
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const [r] = await pool.query("DELETE FROM Employee WHERE Id=?", [req.params.id]);
    if (r) {
      res.json({ status: 200, message: "Deleted Successfully" })
    }
    else {
      res.json({ status: 400, message: "Failed To Dekete" })
    }
  } catch (err) {
    res.json({ status: 500, message: err.message })
  }
};

export const uploadProfileImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 400, message: "No file uploaded" });
    }
    // You can also store req.file.path in DB under employee profile
    res.json({
      status: 200,
      message: "File uploaded successfully",
      file: req.file
    });
  } catch (err) {
    res.json({ status: 500, message: err.message })
  }
};

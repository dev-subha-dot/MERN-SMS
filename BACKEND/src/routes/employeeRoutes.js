import { Router } from "express";
import {
  createEmployee,
  getEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  uploadProfileImg
} from "../controllers/employeeController.js";
import upload from "../multer.js";
import { verifyToken } from "../middleware/commonMiddleware.js";

const router = Router();

router.post("/create_employee", createEmployee);
router.get("/get_employee", verifyToken, getEmployee);
router.get("/get_employee_byId/:_id", getEmployeeById);
router.put("/update_employee", updateEmployee);
router.delete("/delete_employee_byId/:_id", deleteEmployee);
router.post("/upload", upload.single("file"), uploadProfileImg);


export default router;
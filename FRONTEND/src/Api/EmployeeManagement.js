import axios from "axios";
const baseUrl = 'http://localhost:3002/api/employee/'

// Add Employee
export const addEmployee = async (employeeData) => {
  console.log("employeeData", employeeData);
  return axios.post(`${baseUrl}create_employee`, employeeData);
};

// Get All Employee
export const getEmployee = (page, limit, search = "") => {
  return axios.get(`${baseUrl}get_employee?page=${page}&limit=${limit}&search=${search}`);
};

// 🔍 Get Employee by ID
export const getEmployeeById = async (id) => {
  return axios.get(`${baseUrl}get_employee_byId/${id}`);
};

// ✏️ Update Employee
export const updateEmployee = async (employeeData) => {
  return axios.put(`${baseUrl}update_employee`, employeeData);
};

// Delete Employee
export const deleteEmployee = async (id) => {
  return axios.delete(`${baseUrl}delete_employee_byId/${id}`);
};

// File Upload
export const fileUpload = async (formData) => {
  return await axios.post(`${baseUrl}upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};




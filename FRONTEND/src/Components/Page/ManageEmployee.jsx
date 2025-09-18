import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useParams } from "react-router-dom";

// Images
import defaultProfile from "../../assets/profile.png";

// Api
import { addEmployee, getEmployeeById, updateEmployee, fileUpload } from '../../Api/EmployeeManagement';

const departments = [
    {
        name: "Design",
        options: ["UI/UX Designer", "Graphic Designer", "Product Designer"]
    },
    {
        name: "Development",
        options: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
    },
    {
        name: "Testing & QA",
        options: ["Manual Tester", "Automation Tester", "Performance Tester"]
    },
    {
        name: "Business Analyst",
        options: ["Junior Analyst", "Senior Analyst", "Product Analyst"]
    }
];

export default function ManageEmployee() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ProfileImg: "",
        Name: "",
        EmpId: "",
        Department: "",
        Designation: "",
        Project: "",
        Type: "",
        Status: "",
    });
    const [errors, setErrors] = useState({});
    const currentDept = departments.find(
        (d) => d.name === formData.Department
    ); // Based on Selected department find the designation options

    console.log("currentDept", currentDept);
    const { id, mode } = useParams();
    const [profileImg, setProfileImage] = useState(""); // Only To show 


    // If edit or View fetch the employee Details based on Id
    useEffect(() => {
        if (id && mode) {
            fetchEmployeeById(id);
        }
    }, [id, mode]);

    const fetchEmployeeById = async (id) => {
        // Call API to get employee details
        const response = await getEmployeeById(id);
        if (response.data.status === 200) {
            console.log("fetchData", response.data.data);
            setFormData(response.data.data);
            if (response.data.data.ProfileImg) {
                setProfileImage(`http://localhost:3002/${response.data.data.ProfileImg}`);
            }
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (value) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
        else {
            setErrors({
                ...errors,
                [name]: "Requried"
            });
        }

    };

    // Handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            const response = await fileUpload(formData);
            console.log(response.data);
            if (response.data.status === 200) {
                setProfileImage(`http://localhost:3002/${response.data.file.filename}`);
                setFormData((prev) => ({
                    ...prev,
                    ProfileImg: response.data.file.filename
                }));

            }
        }
    };

    // Validation
    const validate = () => {
        let newErrors = {};
        if (!formData.Name) newErrors.Name = "Requried";
        if (!formData.EmpId) newErrors.EmpId = "Requried";
        if (!formData.Department) newErrors.Department = "Requried";
        if (!formData.Designation)
            newErrors.Designation = "Requried";
        if (!formData.Type) newErrors.Type = "Requried";
        if (!formData.Status) newErrors.Status = "Requried";
        console.log(newErrors);
        return newErrors;
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Add Employee
            if (!mode) {
                let res = await addEmployee(formData);
                console.log("res", res);
                if (res.data.status === 200) {
                    alert(res.data.message);
                    navigate("/employee");
                }
                else {
                    alert(res.data.message);
                }
            }
            // Update Employee
            else {
                let res = await updateEmployee(formData);
                console.log("res", res);
                if (res.data.status === 200) {
                    alert(res.data.message);
                    navigate("/employee");
                }
                else {
                    alert(res.data.message);
                }
            }

        }
    };


    // For View
    const renderview = () => {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <label className="form-label">Name</label>
                        <div>{formData.Name}</div>
                    </div>

                    <div className="col-md-6 mt-3">
                        <label className="form-label">Employee ID</label>
                        <div>{formData.EmpId}</div>
                    </div>
                    <hr className="mt-3"></hr>


                    <div className="col-md-6 mt-3">
                        <label className="form-label">Department</label>
                        <div>{formData.Department}</div>
                    </div>

                    <div className="col-md-6 mt-3">
                        <label className="form-label">Designation</label>
                        <div>{formData.Designation}</div>
                    </div>
                    <hr className="mt-3"></hr>

                    <div className="col-md-6 mt-3">
                        <label className="form-label">Project</label>
                        <div>{formData.Project ? formData.Project : '-'}</div>
                    </div>

                    <div className="col-md-6 mt-3">
                        <label className="form-label">Type</label>
                        <div>{formData.Type}</div>
                    </div>
                    <hr className="mt-3"></hr>


                    <div className="col-md-6 mt-3">
                        <label className="form-label">Status</label>
                        <div>{formData.Status}</div>
                    </div>
                    <hr className="mt-3"></hr>
                </div>
            </div>
        )
    }

    // For Add or Edit
    const addorEditrender = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Name */}
                    <div className="col-md-6 mt-3">
                        <label className="form-label fw-bold">Name*</label>
                        <input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            className={`form-control br-10 py-3 ${errors.Name ? "is-invalid" : ""
                                }`}
                        />
                        <div className="invalid-feedback">{errors.Name}</div>
                    </div>

                    {/* Employee ID */}
                    <div className="col-md-6 mt-3">
                        <label className="form-label fw-bold">Employee ID*</label>
                        <input
                            type="text"
                            name="EmpId"
                            value={formData.EmpId}
                            onChange={handleChange}
                            className={`form-control br-10 py-3 ${errors.EmpId ? "is-invalid" : ""
                                }`}
                        />
                        <div className="invalid-feedback">{errors.EmpId}</div>
                    </div>

                    {/* Department */}
                    <div className="col-md-6 mt-3">
                        <label className="form-label fw-bold">Department*</label>
                        <select
                            name="Department"
                            value={formData.Department}
                            onChange={handleChange}
                            className={`form-select br-10 py-3 ${errors.Department ? "is-invalid" : ""
                                }`}
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept, i) => (
                                <option key={i} value={dept.name}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{errors.Department}</div>
                    </div>

                    {/* Designation */}
                    <div className="col-md-6 mt-3">
                        <label className="form-label fw-bold">Designation*</label>
                        <select
                            name="Designation"
                            value={formData.Designation}
                            onChange={handleChange}
                            className={`form-select br-10 py-3 ${errors.Designation ? "is-invalid" : ""
                                }`}
                            disabled={!currentDept}
                        >
                            <option value="">Select Designation</option>
                            {currentDept &&
                                currentDept.options.map((role, i) => (
                                    <option key={i} value={role}>
                                        {role}
                                    </option>
                                ))}
                        </select>
                        <div className="invalid-feedback">{errors.Designation}</div>
                    </div>

                    {/* Project */}
                    <div className="col-md-6 mt-3">
                        <label className="form-label fw-bold">Project</label>
                        <input
                            type="text"
                            name="Project"
                            value={formData.Project}
                            onChange={handleChange}
                            className="form-control br-10 py-3"
                        />
                    </div>

                    {/* Type */}
                    <div className="col-md-6 mt-3">
                        <label className="form-label fw-bold">Type*</label>
                        <select
                            name="Type"
                            value={formData.Type}
                            onChange={handleChange}
                            className={`form-select br-10 py-3 ${errors.Type ? "is-invalid" : ""
                                }`}
                        >
                            <option value="">Select Type</option>
                            <option value="Office">Office</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                        <div className="invalid-feedback">{errors.Type}</div>
                    </div>

                    {/* Status */}
                    <div className="col-md-6 mt-3">
                        <label className="form-label fw-bold">Status*</label>
                        <select
                            name="Status"
                            value={formData.Status}
                            onChange={handleChange}
                            className={`form-select br-10 py-3 ${errors.Status ? "is-invalid" : ""
                                }`}
                        >
                            <option value="">Select Status</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Contract">Contract</option>
                            <option value="Intern">Intern</option>
                        </select>
                        <div className="invalid-feedback">{errors.Status}</div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-end mt-4">
                    <button type="button" className="btn btn-secondary me-2">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Confirm
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className="container addemployee_container mt-4">

            {/* Page Title */}
            <h4 className="fw-bold mb-3">
                <Link to='/employee'>
                    <i className="bi bi-arrow-left me-2"></i>
                </Link>
                {!mode && "Add New Employee"}
                {mode === "edit" && "Edit Employee Details"}
                {mode === "view" && "View Employee Details"}
            </h4>
            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <a className="nav-link active fw-bold text-primary" href="#!">
                        <i className="bi bi-person me-2"></i> Personal Information
                    </a>
                </li>
            </ul>

            {/* Profile Image Upload */}
            <div className="mb-4 d-flex align-items-center">
                <div className="position-relative">
                    <img
                        src={profileImg || defaultProfile}
                        alt="Profile"
                        className="rounded-circle"
                        width="100"
                        height="100"
                    />
                    {
                        mode !== "view" &&
                        <label
                            htmlFor="profilePic"
                            className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2"
                            style={{ cursor: "pointer" }}
                        >
                            <i className="bi bi-pencil"></i>
                        </label>
                    }

                    <input
                        type="file"
                        id="profilePic"
                        accept="image/*"
                        className="d-none"
                        onChange={handleImageUpload}
                    />

                </div>
            </div>

            {
                mode !== "view" &&
                addorEditrender()
            }


            {
                mode === "view" && renderview()
            }


        </div>
    );
}

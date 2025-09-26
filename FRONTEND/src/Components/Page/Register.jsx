import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { configUser, registerUser } from "../../Api/AuthManagement";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [config, setConfig] = useState({ email: "", password: "" })

  const getConfig = async () => {
    const res = await configUser();
    if (res.data.status === 200) {
      const { email, password } = res.data.data;
      setConfig({
        email: new RegExp(email),      // convert string → RegExp
        password: new RegExp(password) // convert string → RegExp
      });
    }
  }
  useEffect(() => {
    getConfig()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({
      ...errors,
      [e.target.name]: e.target.value.trim() ? "" : errors[e.target.name], // clear error for this field
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    // Fullname validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    // Email validation
    const emailRegex = config.email;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    const passwordRegex = config.password;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters, with uppercase & lowercase letters";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await registerUser(formData);
      if (res.data.status === 200) {
        alert(res.data.message || "Registered");
        navigate("/Login");
      }
      else {
        alert(res.data.message);
      }
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Error registering user" });
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <form onSubmit={handleSubmit} className="signup_container border p-4 rounded shadow">
          <h3 className="text-center mb-4">Sign Up</h3>

          <div className="form-group mb-3">
            <label >Full Name</label>
            <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
          </div>

          <div className="form-group mb-3">
            <label>Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          <button type="submit" className="btn btn-success w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

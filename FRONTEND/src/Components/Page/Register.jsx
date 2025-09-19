import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formdata", formData);
    const res = await axios.post("http://localhost:3002/api/auth/register", formData);
    console.log("result", res);
    if (res.status === 200) {
      alert(res.data.message || "Registered");
      navigate("/Login");
    }
    else {
      alert(err.response?.data?.message || "Error registering user");
    }


  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <form onSubmit={handleSubmit} className="signup_container border p-4 rounded shadow">
          <h3 className="text-center mb-4">Sign Up</h3>

          <div className="form-group mb-3">
            <label >Full Name</label>
            <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="form-group mb-3">
            <label>Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-success w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Api/AuthManagement";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);
      console.log("User Data:", res.data.user);
      if (res.data.status === 200) {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", res.data.userType);
        navigate("/Employee");
      }
      else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <form
          className="login_container border p-4 rounded shadow"
          onSubmit={handleSubmit}
        >
          <h4 className="text-center mb-4">LOGIN</h4>

          <div className="form-group mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            SIGN IN
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Not a member? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

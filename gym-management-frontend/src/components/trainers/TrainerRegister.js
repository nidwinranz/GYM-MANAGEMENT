import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import img from "../../img/black-black.jpg";
export default function Register() {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    weight: "",
    height: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Prevent negative values for height and weight
    if (name === "height" && parseFloat(value) < 0) {
      // Show a toast message or perform any other action to notify the user
      toast.error("Height cannot be negative!");
      return; // Prevent setting state for negative values
    }

    if (name === "weight" && parseFloat(value) < 0) {
      // Show a toast message or perform any other action to notify the user
      toast.error("weight cannot be negative!");
      return; // Prevent setting state for negative values
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { username, email, password, gender, weight, height, role } =
      formData;
    console.log(role);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          gender,
          weight,
          height,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate("/trainer-add-view", { state: { user } });
      }, 3000);
    } catch (error) {
      console.error("Error registering:", error.message);
      toast.error(error.message || "Failed to register!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <img
        src={img}
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1000px",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <div
        className="container box3 mt-3 "
        style={{ width: "600px", padding: "35px" }}
      >
        <h4 className="text-warning text-center">Trainer Register</h4>
        <div className="underline1 bg-warning w-100"></div>
        <form className="mt-4 p-5 w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-warning">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-warning">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-warning">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label text-warning">
              Gender
            </label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label text-warning">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="trainer">Trainer</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label text-warning">
              Weight
            </label>
            <input
              type="number"
              className="form-control"
              id="weight"
              placeholder="Enter your weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="height" className="form-label text-warning">
              Height
            </label>
            <input
              type="number"
              className="form-control"
              id="height"
              placeholder="Enter your height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="d-flex">
            <button
              className="btn btn-warning"
              style={{ marginRight: "272px" }}
            >
              REGISTER
            </button>
            <ToastContainer />
            <button
              className="btn btn-warning"
              onClick={() => navigate("/trainer-add-view", { state: { user } })}
            >
              BACK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

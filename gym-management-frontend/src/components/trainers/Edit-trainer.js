import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import img5 from "../../img/back.jpg";
import UserNavbar from "../UserNavbar";

export default function EdittrainerIdProfile() {
  const location = useLocation();
  const { user, trainerId } = location.state || {};
  const navigate = useNavigate();

  // State to hold the form data
  const [formData, setFormData] = useState({
    username: trainerId.username,
    email: trainerId.email,
    gender: trainerId.gender,
    weight: trainerId.weight,
    height: trainerId.height,
  });

  // Event handler to update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/users/${trainerId._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update trainerId profile");
      }
      const updatedtrainerIdData = await response.json();
      console.log(
        "trainerId profile updated successfully:",
        updatedtrainerIdData
      );
      // After updating, navigate back to the profile view
      navigate("/trainer-add-view", {
        state: { user, trainerId: updatedtrainerIdData },
      });
    } catch (error) {
      console.error("Error updating trainerId profile:", error.message);
    }
  };

  // Event handler for navigating back
  const handleBack = () => {
    navigate("/trainer-add-view", { state: { user } });
  };

  return (
    <div>
      <UserNavbar />
      <img
        src={img5}
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "850px",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <div
        className="container box3 mt-3 "
        style={{ width: "500px", padding: "35px" }}
      >
        <h4 className="text-warning text-center">Edit trainerId Profile</h4>
        <div className="underline bg-warning w-100"></div>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-warning">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-warning">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-warning">Gender</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label text-warning">Weight</label>
            <input
              type="number"
              className="form-control"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-warning">Height</label>
            <input
              type="number"
              className="form-control"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning"
            style={{ marginRight: "262px" }}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-warning ms-5"
            onClick={handleBack}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AddLauncher: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rocketType: "",
    latitude: "",
    longitude: "",
    city: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.rocketType ||
      !formData.latitude ||
      !formData.longitude ||
      !formData.city
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      await api.post("/launchers", {
        ...formData,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      });
      alert("Launcher added successfully!");
      setFormData({
        name: "",
        rocketType: "",
        latitude: "",
        longitude: "",
        city: "",
      });
      navigate("/");
    } catch (error) {
      alert("An error occurred while adding the launcher.");
    }
  };

  return (
    <div className="app">
      <header className="page-header">
        <div>
          <h1>Add new launcher</h1>
          <p className="meta">Fill in the launcher details and save.</p>
        </div>
        <button className="ghost-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-grid">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <select
            name="rocketType"
            value={formData.rocketType}
            onChange={handleChange}
            required
          >
            <option value="">Select Rocket Type</option>
            <option value="Shahab3">Shahab3</option>
            <option value="Fetah110">Fetah110</option>
            <option value="Radwan">Radwan</option>
            <option value="Kheibar">Kheibar</option>
          </select>
          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <button className="primary-button" type="submit">
          Add Launcher
        </button>
      </form>
    </div>
  );
};

export default AddLauncher;

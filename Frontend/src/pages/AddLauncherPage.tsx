import React, { useState } from 'react';
import api from '../api/axios';

const AddLauncherPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    rocketType: '',
    latitude: '',
    longitude: '',
    city: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/launchers', formData);
    alert('Launcher added successfully!');
    setFormData({ name: '', rocketType: '', latitude: '', longitude: '', city: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Launcher</h1>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <select name="rocketType" value={formData.rocketType} onChange={handleChange}>
        <option value="">Select Rocket Type</option>
        <option value="Shahab3">Shahab3</option>
        <option value="Fetah110">Fetah110</option>
        <option value="Radwan">Radwan</option>
        <option value="Kheibar">Kheibar</option>
      </select>
      <input type="number" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} />
      <input type="number" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} />
      <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
      <button type="submit">Add Launcher</button>
    </form>
  );
};

export default AddLauncherPage;
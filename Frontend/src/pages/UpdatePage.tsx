import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import type { Launcher } from "../types/Launcher";
import { useLauncherStore } from "../store/useLauncherStore";

const UpdatePage: React.FC = () => {
  const params = useParams();
  const id = params.id as string | undefined;
  const navigate = useNavigate();

  const launchers = useLauncherStore((s) => s.launchers);
  const setLaunchers = useLauncherStore((s) => s.setLaunchers);

  const [launcher, setLauncher] = useState<Launcher | null>(null);

  const [name, setName] = useState("");
  const [rocketType, setRocketType] = useState("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const found = launchers.find((l) => l._id === id);
    if (found) {
      setLauncher(found);
      return;
    }

    const fetchLauncher = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/launchers/${id}`);
        setLauncher(res.data);
      } catch (err) {
        console.error("Failed to fetch launcher", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLauncher();
  }, [id, launchers]);

  useEffect(() => {
    if (!launcher) return;
    setName(launcher.name ?? "");
    setRocketType(launcher.rocketType ?? "");
    setLatitude(String(launcher.latitude ?? ""));
    setLongitude(String(launcher.longitude ?? ""));
    setCity(launcher.city ?? "");
  }, [launcher]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!name.trim() || !rocketType.trim() || !city.trim()) {
      alert("Please fill in name, rocket type and city.");
      return;
    }

    const updated: Launcher = {
      _id: id,
      name: name.trim(),
      rocketType: rocketType.trim(),
      latitude: Number(latitude),
      longitude: Number(longitude),
      city: city.trim(),
    };

    try {
      const res = await api.put(`/launchers/${id}`, updated);
      const saved: Launcher = res.data;

      setLaunchers(
        launchers.map((l) => (l._id === id ? { ...l, ...saved } : l))
      );

      alert("Launcher updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Failed to update launcher", err);
      alert("Failed to update launcher");
    }
  };


  if (!launcher && (loading || !id))
    return (
      <div className="app">
        <p>Loading launcher details...</p>
      </div>
    );

  if (!launcher)
    return (
      <div className="app">
        <p>Launcher not found.</p>
      </div>
    );

  return (
    <div className="app">
      <h2>Update Launcher</h2>
      <div className="form-card" style={{ maxWidth: 720 }}>
        <form onSubmit={handleSubmit} className="form-grid">
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Rocket Type</label>
            <input
              type="text"
              value={rocketType}
              onChange={(e) => setRocketType(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Latitude</label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          <div>
            <label>Longitude</label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          <div>
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="details-actions">
            <button className="primary-button" type="submit">
              Save
            </button>
            <Link to={`/launcher/${id}`} className="ghost-button" style={{alignSelf: 'center'}}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
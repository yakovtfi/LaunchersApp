import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { Launcher } from "../types/Launcher";
import { useLauncherStore } from "../store/useLauncherStore";

const PageDetailsLaunche: React.FC = () => {
  const params = useParams();
  const id = params.id as string | undefined;
  const navigate = useNavigate();

  const launchers = useLauncherStore((s) => s.launchers);
  const setLaunchers = useLauncherStore((s) => s.setLaunchers);

  const [launcher, setLauncher] = useState<Launcher | null>(null);

  useEffect(() => {
    if (!id) return;

    const found = launchers.find((l) => l._id === id);
    if (found) {
      setLauncher(found);
      return;
    }

    const fetchLauncher = async () => {
      try {
        const res = await api.get(`/launchers/${id}`);
        setLauncher(res.data);
      } catch (err) {
        console.error("Failed to fetch launcher", err);
      }
    };

    fetchLauncher();
  }, [id, launchers]);

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this launcher?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/launchers/${id}`);
      setLaunchers(launchers.filter((l) => l._id !== id));
      alert("Launcher deleted successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete launcher");
    }
  };

  if (!launcher)
    return (
      <div className="app">
        <p>Loading launcher details </p>
      </div>
    );

  return (
    <div className="app">
      <header className="page-header">
        <div>
          <h1>{launcher.name}</h1>
          <p className="meta">Launcher details and coordinates.</p>
        </div>
        <button className="ghost-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      <section className="details-grid">
        <div>
          <strong>Rocket type</strong>
          <div>{launcher.rocketType}</div>
        </div>
        <div>
          <strong>City</strong>
          <div>{launcher.city}</div>
        </div>
        <div>
          <strong>Latitude</strong>
          <div>{launcher.latitude}</div>
        </div>
        <div>
          <strong>Longitude</strong>
          <div>{launcher.longitude}</div>
        </div>
      </section>

      <div className="details-actions">
        <button className="danger-button" onClick={handleDelete}>
          Delete launcher
        </button>
      </div>
    </div>
  );
};

export default PageDetailsLaunche;
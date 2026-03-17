import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import type { Launcher } from "../types/Launcher";


const HomePage: React.FC = () => {
  const [launchers, setLaunchers] = useState<Launcher[]>([]);
  const [cityQuery, setCityQuery] = useState("");
  const [rocketFilter, setRocketFilter] = useState("all");

  useEffect(() => {
    const fetchLaunchers = async () => {
      try {
        const response = await api.get("/launchers");
        setLaunchers(response.data);
      } catch (error) {
        console.error("Failed to load launchers", error);
      }
    };
    fetchLaunchers();
  }, []);

  const filteredLaunchers = useMemo(() => {
    return launchers.filter((launcher) => {
      const matchesCity = launcher.city
        .toLowerCase()
        .includes(cityQuery.trim().toLowerCase());
      const matchesRocket =
        rocketFilter === "all" || launcher.rocketType === rocketFilter;
      return matchesCity && matchesRocket;
    });
  }, [cityQuery, launchers, rocketFilter]);

  const handleDelete = async (id: string | undefined) => {
    const confirmed = window.confirm("Delete this launcher?");
    if (!confirmed) return;
    try {
      await api.delete(`/launchers/${id}`);
      setLaunchers((prev) => prev.filter((launcher) => launcher._id !== id));
    } catch (error) {
      console.error("Failed to delete launcher", error);
      alert("Failed to delete launcher");
    }
  };

  return (
    <div className="app">
      <header className="page-header">
        <div>
          <h1>Launchers</h1>
          <p className="meta">Browse, filter, and delete existing launchers.</p>
        </div>
        <Link to="/add-launcher" className="primary-button">
          Add launcher
        </Link>
      </header>

      <section className="filters">
        <input
          type="text"
          placeholder="Search by city"
          value={cityQuery}
          onChange={(event) => setCityQuery(event.target.value)}
        />
        <select
          value={rocketFilter}
          onChange={(event) => setRocketFilter(event.target.value)}
        >
          <option value="all">All rocket types</option>
          <option value="Shahab3">Shahab3</option>
          <option value="Fetah110">Fetah110</option>
          <option value="Radwan">Radwan</option>
          <option value="Kheibar">Kheibar</option>
        </select>
      </section>

      <section className="launcher-grid">
        {filteredLaunchers.map((launcher) => (
          <article key={launcher._id} className="launcher-card">
            <div>
              <h3>{launcher.name}</h3>
              <div className="meta">City: {launcher.city}</div>
              <div className="meta">Rocket: {launcher.rocketType}</div>
            </div>
            <div className="card-actions">
              <Link to={`/launcher/${launcher._id}`} className="ghost-button">
                View details
              </Link>
              <Link to={`/update/${launcher._id}`} className="primary-button">
                Edit
              </Link>
              <button
                className="danger-button"
                onClick={() => handleDelete(launcher._id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
        {filteredLaunchers.length === 0 && (
          <p>No launchers match the current filters.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import api from "../api/axios";
import type { User } from "../types/user";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    type_user: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/auth/users");
      setUsers(
        (data || []).map((user: any) => ({
          _id: user.id ?? user._id,
          username: user.username,
          email: user.email,
          type_user: user.user_type ?? user.type_user,
          last_login: user.last_login,
        }))
      );
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const resetForm = () => {
    setFormData({ username: "", password: "", email: "", type_user: "" });
    setEditingId(null);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!formData.username || !formData.email || !formData.type_user) {
      setError("Username, email, and user type are required.");
      return;
    }

    if (!editingId && !formData.password) {
      setError("Password is required for new users.");
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        const payload: Record<string, string> = {
          username: formData.username,
          email: formData.email,
          user_type: formData.type_user,
        };
        if (formData.password) {
          payload.password = formData.password;
        }
        await api.put(`/auth/register/${editingId}`, payload);
      } else {
        await api.post("/auth/register", {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          user_type: formData.type_user,
        });
      }
      resetForm();
      await fetchUsers();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user._id || null);
    setFormData({
      username: user.username,
      password: "",
      email: user.email,
      type_user: user.type_user,
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const confirmed = window.confirm("Delete this user?");
    if (!confirmed) return;
    try {
      await api.delete(`/auth/register/${id}`);
      await fetchUsers();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <div className="app">
      <header className="page-header">
        <div>
          <h1>Manage users</h1>
          <p className="meta">
            Create, update, or delete users. Only one user per type is allowed.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-grid">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder={editingId ? "New password (optional)" : "Password"}
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="type_user"
            value={formData.type_user}
            onChange={handleChange}
            required
          >
            <option value="">Select user type</option>
            <option value="admin">Admin</option>
            <option value="air_force">Air Force</option>
            <option value="intel">Intel</option>
            <option value="user">User</option>
          </select>
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="actions-row">
          <button className="primary-button" type="submit" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Update user" : "Create user"}
          </button>
          {editingId && (
            <button type="button" className="ghost-button" onClick={resetForm}>
              Cancel edit
            </button>
          )}
        </div>
      </form>

  <section className="launcher-grid margin-top">
        {loading && <p>Loading users...</p>}
        {!loading && users.length === 0 && <p>No users found.</p>}
        {users.map((user) => (
          <article key={user._id} className="launcher-card">
            <div>
              <h3>{user.username}</h3>
              <div className="meta">Email: {user.email}</div>
              <div className="meta">Type: {user.type_user}</div>
            </div>
            <div className="card-actions">
              <button className="ghost-button" onClick={() => handleEdit(user)}>
                Edit
              </button>
              <button
                className="danger-button"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default RegisterPage;
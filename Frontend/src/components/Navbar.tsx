import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/useUsers";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleShowCurrentUser = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    alert(`Username: ${user.username}\nType: ${user.type_user}`);
  };
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">Launchers Control</div>
        <nav className="navbar-links">
          {user && (
            <>
              <NavLink to="/">Home</NavLink>
              {(user.type_user === "admin" || user.type_user === "intel") && (
                <NavLink to="/add-launcher">Add Launcher</NavLink>
              )}
            </>
          )}
          {user?.type_user === "admin" && (
            <NavLink to="/register">Register User</NavLink>
          )}
          {!user && <NavLink to="/login">Login</NavLink>}
        </nav>
        <div className="user-info">
          <button className="logout-button" onClick={handleShowCurrentUser}>Current User</button>
          {user && (
            <>
              <span className="span-user">{user.username}</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">Launchers Control</div>
        <nav className="navbar-links">
          <NavLink
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            to="/add-launcher"
          >
            Add Launcher
          </NavLink>
         
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

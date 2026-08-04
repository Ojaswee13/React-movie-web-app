import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

function NavBar({ resetHome }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link" onClick={resetHome}>
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
      <NavLink to="/verify" className="logo">CertVerify</NavLink>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/verify" onClick={() => setMenuOpen(false)}>
  Verify
</NavLink>


          {token ? (
            <>
              <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/upload" onClick={() => setMenuOpen(false)}>
                Upload
              </NavLink>
              <NavLink to="/students" onClick={() => setMenuOpen(false)}>
                Students
              </NavLink>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <NavLink
              className="login-btn"
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

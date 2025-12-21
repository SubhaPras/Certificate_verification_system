import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/verify" className="logo">
          CertVerify
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/verify">Verify</Link>

        {token ? (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/upload">Upload</Link>
            <Link to="/admin/students">Students</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link className="login-btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

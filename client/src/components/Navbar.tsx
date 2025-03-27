import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState<boolean>(auth.loggedIn());
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []); // Only run once when the component mounts

  const handleLogout = () => {
    auth.logout();
    setLoginCheck(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="nav">
      <div className="nav-title">
        <Link to="/">Krazy Kanban Board</Link>
      </div>
      <ul>
        {!loginCheck ? (
          <li className="nav-item">
            <button type="button">
              <Link to="/login">Login</Link>
            </button>
          </li>
        ) : (
          <li className="nav-item">
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;

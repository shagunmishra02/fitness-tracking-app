import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, Moon, Sun, User } from 'lucide-react';
import './Navbar.css';

function Navbar({ onLogout, darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          💪 Fitness Tracker
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/profile" className="nav-link">Profile</Link>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="btn btn-danger" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

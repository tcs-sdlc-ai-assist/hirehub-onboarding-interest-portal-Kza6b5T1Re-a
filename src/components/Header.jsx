import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem('hirehub_logged_in') === 'true');
  }, [location.pathname]);

  const handleLogin = () => {
    sessionStorage.setItem('hirehub_logged_in', 'true');
    setLoggedIn(true);
    navigate('/admin');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('hirehub_logged_in');
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <nav
      className="card flex-center"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '1em 2em',
        background: 'var(--color-bg)',
        boxShadow: 'var(--box-shadow)',
        marginBottom: '2em',
      }}
    >
      <div className="flex" style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--color-primary)' }}>
          HireHub Onboarding Portal
        </a>
        <div className="flex" style={{ gap: '1em' }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'btn btn-accent' : 'btn'
            }
            style={{ fontSize: '1rem' }}
          >
            Home
          </NavLink>
          <NavLink
            to="/apply"
            className={({ isActive }) =>
              isActive ? 'btn btn-success' : 'btn'
            }
            style={{ fontSize: '1rem' }}
          >
            Apply
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? 'btn btn-danger' : 'btn'
            }
            style={{ fontSize: '1rem' }}
          >
            Admin
          </NavLink>
        </div>
        <div>
          {loggedIn ? (
            <button className="btn btn-danger" onClick={handleLogout} style={{ fontSize: '1rem' }}>
              Logout
            </button>
          ) : (
            <button className="btn btn-accent" onClick={handleLogin} style={{ fontSize: '1rem' }}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {};

export default Header;
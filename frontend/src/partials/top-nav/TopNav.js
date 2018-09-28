// Node modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Assets
import './TopNav.css';


const TopNav = ({user, logout}) => (
  <nav className="top-nav">
    <Link to="/" className="top-nav__link">Home</Link>
    <Link to="/dashboard" className="top-nav__link">Dashboard</Link>
    {
      user.is_staff &&
      <Link to="/admin" className="top-nav__link">Admin</Link>
    }
    <span
      className="top-nav__link"
      onClick={logout}>
      Logout
    </span>
  </nav>
);

TopNav.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default TopNav;


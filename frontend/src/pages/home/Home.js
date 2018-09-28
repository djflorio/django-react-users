// Node modules
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Assets
import './Home.css';


const Home = (props) => (
  <div className="home">
    <h1 className="home__title">Cool People</h1>
    <p className="home__slogan">
      Signup today to show that you're a cool person!
    </p>
    {
      !props.isAuthenticated ?
      <div>
        <Link to="/signup" className="home__button">
          Become Cool
        </Link>
        <Link to="/login" className="home__button">
          Login
        </Link>
      </div>
      :
      <Link to="/dashboard" className="home__button">
        Dashboard
      </Link>
    }
  </div>
);

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default Home;
// Node modules
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import './Dashboard.css';


const Dashboard = (props) => (
  <div className="dashboard">
    <h1 className="dashboard__header">Hello, {props.username}!</h1>
    <p className="dashboard__tagline">
      Do you feel cool now?
    </p>
  </div>
);

Dashboard.propTypes = {
  username: PropTypes.string
}

export default Dashboard;
// Node modules
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import './Dashboard.css';


const Dashboard = (props) => (
  <div className="dashboard">
    <h1 className="dashboard__header">Hello, {props.username}!</h1>
    <p className="dashboard__tagline">
      Why not head over to <a className="dashboard__link" href="https://www.shakacode.com/">ShakaCode</a> and
      explore the forums?
    </p>
  </div>
);

Dashboard.propTypes = {
  username: PropTypes.string
}

export default Dashboard;
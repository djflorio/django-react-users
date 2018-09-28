// Node modules
import React from 'react';
import { connect } from 'react-redux';

// Assets
import './Dashboard.css';

// Components
import Dashboard from './Dashboard';


const DashboardContainer = (props) => (
  <Dashboard username={props.user.username} />
);

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(
  mapStateToProps,
  null
)(DashboardContainer);
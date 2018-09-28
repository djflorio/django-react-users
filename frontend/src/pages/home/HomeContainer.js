// Node modules
import React from 'react';
import { connect } from 'react-redux';

// Assets
import './Home.css';

// Components
import Home from './Home';


const HomeContainer = (props) => (
  <Home isAuthenticated={props.isAuthenticated} />
);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(
  mapStateToProps,
  null
)(HomeContainer);
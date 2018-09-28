// Node modules
import React from 'react';
import { connect } from 'react-redux';

// Assets
import './TopNav.css';

// Components
import TopNav from './TopNav';

// Actions
import { logout } from '../auth/AuthActions';


const TopNavContainer = (props) => {
  
  if(props.isAuthenticated) {
    return (
      <TopNav
        user={props.user}
        logout={props.logout}
      />
    );
  } else {
    return null;
  }
  
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavContainer);


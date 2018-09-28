// Node modules
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Assets
import './App.css';

// Pages
import Home from './pages/home/HomeContainer';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/DashboardContainer';
import AdminHome from './pages/admin-home/AdminHome';
import AdminAdd from './pages/admin-add/AdminAdd';
import AdminEdit from './pages/admin-edit/AdminEdit';
import TopNav from './partials/top-nav/TopNavContainer';

// Components
import requireAuth from './partials/auth/requireAuth';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App__background"></div>
          <TopNav />
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={requireAuth(Dashboard)} />
          <Route exact path="/admin/:page?" component={requireAuth(AdminHome, true)} />
          <Route path="/admin/add-user" component={requireAuth(AdminAdd, true)} />
          <Route path="/admin/edit-user/:id" component={requireAuth(AdminEdit, true)} />
        </div>
      </Router>
    );
  }
}

export default App;

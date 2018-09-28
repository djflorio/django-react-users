// Node modules
import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import './AdminHome.css';

// Components
import UserList from '../../partials/user-list/UserListContainer';


const AdminHome = (props) => (
  <div className="admin-home">
    <h1 className="admin-home__header">Admin Portal</h1>
    <Link to="/admin/add-user" className="admin-home__add">
      Add User
    </Link>
    <UserList
      curPage={parseInt(props.match.params.page, 10) || 1}
    />
  </div>
);

export default AdminHome;
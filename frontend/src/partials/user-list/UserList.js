// Node modules
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// Assets
import './UserList.css';
import { faUserEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const UserList = (props) => (
  <table className="user-list">
    <thead className="user-list__head">
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Is Admin</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {
      props.users.map(user => (
        <tr key={user.id} className="user-list__user">
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.is_staff ? "Yes" : "No"}</td>
          <td>
            <Link 
              to={"/admin/edit-user/" + user.id}
              className="user-list__action">
              <FontAwesomeIcon
                icon={faUserEdit}
              />
            </Link>
            <FontAwesomeIcon
              className="user-list__action"
              icon={faTrash}
              onClick={() => props.deleteUser(user.id)}
            />
          </td>
        </tr>
      ))
    }
    </tbody>
  </table>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteUser: PropTypes.func.isRequired
}

export default UserList;
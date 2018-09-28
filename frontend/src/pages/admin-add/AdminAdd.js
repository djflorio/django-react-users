// Node modules
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Assets
import './AdminAdd.css';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

// Components
import AddUserForm from '../../partials/add-user-form/AddUserFormContainer';


const AdminAdd = () => (
  <div className="admin-add">
    <Link to="/admin" className="admin-add__back">
      <FontAwesomeIcon icon={faBackward} />&nbsp;admin home
    </Link>
    <AddUserForm />
  </div>
);

export default AdminAdd;
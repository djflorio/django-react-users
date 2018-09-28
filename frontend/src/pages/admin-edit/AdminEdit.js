// Node modules
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Assets
import './AdminEdit.css';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

// Components
import EditUserForm from '../../partials/edit-user-form/EditUserFormContainer';


const AdminEdit = (props) => (
  <div className="admin-edit">
    <Link to="/admin" className="admin-edit__back">
      <FontAwesomeIcon icon={faBackward} />&nbsp;admin home
    </Link>
    <EditUserForm user_id={props.match.params.id} />
  </div>
);

export default AdminEdit;
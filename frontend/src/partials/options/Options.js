// Node modules
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import './Options.css';


const Options = (props) => {

  const {
    options, onPerPageChange, onOrderingChange, onFilterAdminChange
  } = props;
  
  return (
    <div className="options">
      <div className="options__option">
        Results per page:&nbsp;
        <select value={options.perPage} onChange={onPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div className="options__option">
        Order by:&nbsp;
        <select value={options.ordering} onChange={onOrderingChange}>
          <option value="default">default</option>
          <option value="username">Username (a..z)</option>
          <option value="-username">Username (z..a)</option>
          <option value="date_joined">Join Date (oldest first)</option>
          <option value="-date_joined">Join Date (newest first)</option>
        </select>
      </div>
      <div className="options__option">
        Filter role:&nbsp;
        <select value={options.filterAdmin} onChange={onFilterAdminChange}>
          <option value="default">None</option>
          <option value="true">Admin</option>
          <option value="false">User</option>
        </select>
      </div>
    </div>
  );
}

Options.propTypes = {
  options: PropTypes.object.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  onOrderingChange: PropTypes.func.isRequired,
  onFilterAdminChange: PropTypes.func.isRequired
}

export default Options;
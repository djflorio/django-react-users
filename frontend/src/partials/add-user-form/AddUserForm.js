// Node modules
import React from 'react';
import PropTypes from 'prop-types';

// Components
import FormTextField from '../form-text-field/FormTextField';


const AddUserForm = (props) => (
  <form
    className="form"
    onSubmit={props.onSubmit}>
    <FormTextField
      type="text"
      name="username"
      placeholder="username"
      value={props.username}
      onChange={props.onChange}
      error={props.errors.username}
    />
    <FormTextField
      type="text"
      name="email"
      placeholder="email"
      value={props.email}
      onChange={props.onChange}
      error={props.errors.email}
    />
    <FormTextField
      type="password"
      name="password"
      placeholder="password"
      value={props.password}
      onChange={props.onChange}
      error={props.errors.password}
    />
    <FormTextField
      type="password"
      name="passwordConfirmation"
      placeholder="confirm password"
      value={props.passwordConfirmation}
      onChange={props.onChange}
      error={props.errors.passwordConfirmation}
    />
    <label className="form__checkbox">
      <input
        type="checkbox"
        name="is_staff"
        checked={props.is_staff}
        onChange={props.onChange}
      />
      Admin
    </label>
    
    <button
      className="form__submit"
      type="submit"
      disabled={props.loading}>
      { props.loading ? "Please wait..." : "Add User" }
    </button>
  </form>
);

AddUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  is_staff: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

export default AddUserForm;
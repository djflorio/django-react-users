// Node modules
import React from 'react';
import PropTypes from 'prop-types';

// Components
import FormTextField from '../form-text-field/FormTextField';


const LoginForm = (props) => (
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
      type="password"
      name="password"
      placeholder="password"
      value={props.password}
      onChange={props.onChange}
      error={props.errors.password}
    />

    <button
      className="form__submit"
      type="submit"
      disabled={props.loading}>
      { props.loading ? "Please wait..." : "Login" }
    </button>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

export default LoginForm;
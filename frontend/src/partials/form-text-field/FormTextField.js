// Node modules
import React from 'react';
import PropTypes from 'prop-types';


const FormTextField = ({type, name, placeholder, value, error, onChange}) => (
  <div className="textfield">
    <input
      type={type}
      className={"textfield__input" + (error ? " textfield__input--error" : "")}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <span className="textfield__error">{error}</span>}
  </div>
);

FormTextField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default FormTextField;
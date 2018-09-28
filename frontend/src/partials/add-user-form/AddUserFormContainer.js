// Node modules
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import AddUserForm from './AddUserForm';

// Actions
import {
  validateAddUserInput, updateAddUserErrors, addUserRequest
} from './AddUserFormActions';


class AddUserFormContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      is_staff: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.updateAddUserErrors({});
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [target.name]: value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { errors, isValid } = validateAddUserInput(this.state);

    if (!isValid) {
      this.props.updateAddUserErrors(errors);
    } else {
      this.props.addUserRequest(this.state, this.props.history);
    }
  }

  render() {
    return (
      <AddUserForm
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        username={this.state.username}
        email={this.state.email}
        password={this.state.password}
        passwordConfirmation={this.state.passwordConfirmation}
        is_staff={this.state.is_staff}
        errors={this.props.errors}
        loading={this.props.loading}
      />
    );
  }
  
}

function mapStateToProps(state) {
  return {
    errors: state.addUserForm.errors,
    loading: state.addUserForm.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addUserRequest: (data, history) => {
      dispatch(addUserRequest(data, history));
    },
    updateAddUserErrors: (errors) => {
      dispatch(updateAddUserErrors(errors));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddUserFormContainer));
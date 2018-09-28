// Node modules
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import EditUserForm from './EditUserForm';

// Actions
import {
  validateEditUserInput, updateEditUserErrors, editUserRequest, fetchUser
} from './EditUserFormActions';


class EditUserFormContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      is_staff: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addUserToState = this.addUserToState.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.user_id, this.addUserToState);
  }

  componentWillUnmount() {
    this.props.updateEditUserErrors({});
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [target.name]: value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { errors, isValid } = validateEditUserInput(this.state);

    if (!isValid) {
      this.props.updateEditUserErrors(errors);
    } else {
      this.props.editUserRequest(this.state, this.props.history);
    }
  }

  addUserToState(user) {
    this.setState({
      id: user.id,
      username: user.username,
      email: user.email,
      is_staff: user.is_staff
    });
  }

  render() {
    return (
      <EditUserForm
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        username={this.state.username}
        email={this.state.email}
        password={this.state.password}
        passwordConfirmation={this.state.passwordConfirmation}
        is_staff={this.state.is_staff}
        errors={this.props.errors}
        loading={this.props.loading}
        fetching={this.props.fetching}
      />
    );
  }
  
}

function mapStateToProps(state) {
  return {
    errors: state.editUserForm.errors,
    loading: state.editUserForm.loading,
    fetching: state.editUserForm.fetching,
    user: state.editUserForm.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editUserRequest: (data, history) => {
      dispatch(editUserRequest(data, history));
    },
    updateEditUserErrors: (errors) => {
      dispatch(updateEditUserErrors(errors));
    },
    fetchUser: (id, callback) => {
      dispatch(fetchUser(id, callback));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditUserFormContainer));
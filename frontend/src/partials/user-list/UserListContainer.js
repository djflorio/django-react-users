// Node modules
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import UserList from './UserList';
import Pagination from '../pagination/Pagination';
import Options from '../options/OptionsContainer';

// Actions
import { retrieveUsers, deleteUser } from './UserListActions';


class UserListContainer extends React.Component {

  constructor(props) {
    super(props);

    this.onPageChange = this.onPageChange.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  componentDidMount() {
    this.props.retrieveUsers(this.props.curPage, this.props.options);
  }

  onPageChange(p) {
    if (p === null) return;
    this.props.history.push("/admin/" + p);
    this.props.retrieveUsers(p, this.props.options);
  }

  onDeleteUser(id) {
    this.props.deleteUser(id, this.props.curPage, this.props.options);
  }

  render() {
    return (
      <div>
        <Options />
        <UserList
          users={this.props.users}
          deleteUser={this.onDeleteUser}
        />
        <Pagination
          total={this.props.total || 0}
          perPage={this.props.options.perPage}
          curPage={this.props.curPage}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.userList.users,
    total: state.userList.total,
    options: state.options
  }
}

function mapDispatchToProps(dispatch) {
  return {
    retrieveUsers: (page, options) => {
      dispatch(retrieveUsers(page, options));
    },
    deleteUser: (id, curPage, options) => {
      const confirmation = window.confirm(
        "Permanently delete this user?"
      );
      if (confirmation) {
        dispatch(deleteUser(id, curPage, options));
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserListContainer));
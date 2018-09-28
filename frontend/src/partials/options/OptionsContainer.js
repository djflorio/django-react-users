// Node modules
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Options from './Options';

// Actions
import { setPerPage, setOrdering, setFilterAdmin } from './OptionsActions';
import { retrieveUsers } from '../user-list/UserListActions';


class OptionsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.onPerPageChange = this.onPerPageChange.bind(this);
    this.onOrderingChange = this.onOrderingChange.bind(this);
    this.onFilterAdminChange = this.onFilterAdminChange.bind(this);
  }

  onPerPageChange(e) {
    const perPage = parseInt(e.target.value, 10);
    this.props.setPerPage(perPage);
    this.props.history.push("/admin/1");
    const options = {
      ...this.props.options,
      perPage: perPage
    };
    this.props.retrieveUsers(options);
  }

  onOrderingChange(e) {
    const ordering = e.target.value;
    this.props.setOrdering(ordering);
    this.props.history.push("/admin/1");
    const options = {
      ...this.props.options,
      ordering: ordering
    };
    this.props.retrieveUsers(options);
  }

  onFilterAdminChange(e) {
    const value = e.target.value;
    this.props.setFilterAdmin(value);
    this.props.history.push("/admin/1");
    const options = {
      ...this.props.options,
      filterAdmin: value
    };
    this.props.retrieveUsers(options);
  }

  render() {
    return (
      <Options
        options={this.props.options}
        onPerPageChange={this.onPerPageChange}
        onOrderingChange={this.onOrderingChange}
        onFilterAdminChange={this.onFilterAdminChange}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    options: state.options
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPerPage: (perPage) => {
      dispatch(setPerPage(perPage));
    },
    setOrdering: (ordering) => {
      dispatch(setOrdering(ordering));
    },
    setFilterAdmin: (value) => {
      dispatch(setFilterAdmin(value));
    },
    retrieveUsers: (options) => {
      dispatch(retrieveUsers(1, options));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OptionsContainer));
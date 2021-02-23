import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/index';

import Logout from './Logout';
import UserLoginForm from './UserLoginForm';

class HomePage extends Component {

  render() {
    if (this.props.token) {
      return (
        <div style={{ textAlign: "center", padding: "90px" }}>
          <h2>Organize your life with TodoApp</h2>
          {this.props.user.username &&
            <h4>Welcome, {this.props.user.username}</h4>}
          {!this.props.user.username &&
            <h5>You are not currently logged in</h5>}
          <Logout />
        </div>)
    } else {
      return (
        <UserLoginForm />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    username: state.username,
    loading: state.loading,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

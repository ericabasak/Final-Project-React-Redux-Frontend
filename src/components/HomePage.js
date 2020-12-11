import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/index';

class HomePage extends Component {

  state = {
    username: "",
    email: ""
  }

  render() {
    return (
      <div style={{ textAlign: "center", padding: "90px" }}>
        <h2>Organize your life with TodoApp</h2>
        {this.props.user.username &&
          <h4>Welcome, {this.props.user.username}</h4>}

        {!this.props.user.username &&
          <h5>You are not currently logged in</h5>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    username: state.username,
    loading: state.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => dispatch(fetchCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

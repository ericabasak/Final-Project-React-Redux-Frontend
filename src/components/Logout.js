import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

class Logout extends Component {

  logout = () => {
    this.props.logoutUser();
  }

  render() {
    return(
      <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div>
          {this.props.user.username && <h4>Hi, {this.props.user.username}</h4>}
          <Button onClick={this.logout} type="submit" label="Logout">Logout</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch({type: 'LOGOUT_USER'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
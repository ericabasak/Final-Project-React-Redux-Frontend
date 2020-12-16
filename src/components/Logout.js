import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button } from '@material-ui/core';

class Logout extends Component {

  logout = () => {
    localStorage.removeItem("token");
    this.props.logoutUser();
  }

  render() {
    return(
      <div>
      
         
            <Box pl={70}>
              {this.props.user.username && <h4>Hi, {this.props.user.username}</h4>}
              <Button onClick={this.logout} type="submit" label="Logout">Logout</Button>
            </Box>
         
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/index';

class Nav extends Component {

  logout = () => {
    localStorage.removeItem("token");
    this.props.logoutUser();
  }
  
  render() {
    return (
      <div>
        <AppBar 
        postion="static"
          style={{
            postion: "static",
            backgroundColor: "#bcaaa4", 
            color: "#484030",
            boxShadow: "0px 0px 0px 0px"
            }}>
          <Toolbar>
            <IconButton edge="start" aria-label="menu">
              </IconButton>
                <Typography variant="h2" padding="20px">
                  Todo App
                </Typography> 
                &nbsp;
                <Box color="primary" padding={2} position="right">
                  <Link to="/homepage">Home</Link>
                </Box>
                &nbsp;
                {!this.props.user.username &&
                (<Box color="primary" padding={2} position="right">
                  <Link to="/userloginform">Login</Link> 
                </Box>)
                }
                &nbsp;
                <Box color="primary" padding={2} position="right">
                  <Link to="/">Main</Link>
                </Box>
                &nbsp;
                <Box color="primary" padding={2} position="right">
                  <Link to="/usersignupform">Signup</Link>
                </Box>
            
                <Box pl={70}>
                    {this.props.user.username && <h4>Hi, {this.props.user.username}</h4>}
                  <Button onClick={this.logout} type="submit" label="Logout">Logout</Button>
                </Box>
          </Toolbar>
        </AppBar>
      </div>      
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch({type: 'LOGOUT_USER'})
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);
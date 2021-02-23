import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@material-ui/core';

class Nav extends Component {

  // DO THIS --
  // auth token passed in every function and store in redux instead of local storage
  // redux for state
  
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
                {/* <Box color="primary" padding={2} position="right">
                  <Link to="/userloginform">Login</Link> 
                </Box>
                &nbsp; */}
                <Box color="primary" padding={2} position="right">
                  <Link to="/">Lists</Link>
                </Box>
                &nbsp;
                <Box color="primary" padding={2} position="right">
                  <Link to="/usersignupform">Signup</Link>
                </Box>
          </Toolbar>
        </AppBar>
      </div>      
    );
  }
}

export default Nav;
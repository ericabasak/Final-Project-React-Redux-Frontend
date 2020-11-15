import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';



// const navStyle = {
//   background: '#cbb9aa',
//   color: '#rrr',
//   textAlign: 'center',
//   textDecoration: 'none',
//   padding: '12px',
//   margin: '6px 6px 6px 6px'
// }

// const linkStyle = {
//   color: '#fff'
// }

class Nav extends Component {


  logout = () => {
    localStorage.removeItem("token")
  }
  
  render() {
    return (
      <div>
        <AppBar postion="relative" color="transparent">
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
                <Box color="primary" padding={2} position="right">
                  <Link to="/userloginform">Login</Link> 
                </Box>
                &nbsp;
                <Box color="primary" padding={2} position="right">
                  <Link to="/">Main</Link>
                </Box>
                &nbsp;
                <Box color="primary" padding={2} position="right">
                  <Link to="/usersignupform">Signup</Link>
                </Box>
                <Box pl={70}>
                  <Button onClick={this.logout} type="submit" label="Logout">Logout</Button>
                </Box>
          </Toolbar>
        </AppBar>
      </div>      
    );
  }
}


export default Nav
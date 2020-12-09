import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/index';

class Nav extends Component {

  state = {
    username: ""
  }

  componentDidMount = () => {
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    fetch('http://localhost:3001/api/v1/get_current_user', {
      method: 'GET',
      headers: 
      {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.user) {
      this.setState({
        username: data.user.username,
      })
      }
    })
  }


  logout = () => {
    localStorage.removeItem("token")
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
                    {this.state.username && <h4>Hi, {this.state.username}</h4>}
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
    username: state.username,
    loading: state.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => dispatch(fetchCurrentUser())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);
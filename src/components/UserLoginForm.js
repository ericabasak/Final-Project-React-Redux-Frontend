import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

class UserLoginForm extends Component {

  state = {
    username: "",
    password: ""
  }

  // now i need to submit the info from the form the backend
  // where it will authenticate the user and if valid, sent the user back
  // with that response, then set the state
  handleLoginForm = e => {
    e.preventDefault();
    console.log("it this login form being called?")
    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      // credentials: "include",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
      })
    })
      .then(resp => resp.json())
      .then(response => {
        // set user to state
        //redirect user
        console.log('receieved response from login');
        console.log(response);
        if (response.errors) {
          console.log(response);
          alert(response.error)
        } else {
          // localStorage.setItem('token', response.token);
          this.props.setToken(response.token)
          this.props.history.push("/")
          this.props.setCurrentUser(response.user);
        }
      })
  }

  handleUsernameChange = e => {
    this.setState({
      username: e.target.value, 
      password: this.state.password 
    })
  }

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value, 
      username: this.state.username 
    })
  }

  render() {
    if (this.props.user.username) {
      this.props.history.push('/');
    }

    return (
      <div className="loginForm">
        <div>
            <Typography variant="h4" align="center">
                  Welcome to Todo App
            </Typography> 
            <Typography variant="h4" align="center">
              Login
            </Typography> 
        </div>
          <form onSubmit={this.handleLoginForm} style={{ textAlign: "center" }}>
            <div>
              <TextField
                label="Username"
                type="text" 
                name="username"
                required
                value={this.props.username} 
                onChange={this.handleUsernameChange} 
              />
            </div>
            <div>
              <TextField 
                label="Password"
                type="password" 
                name="password"
                required
                value={this.props.password} 
                onChange={this.handlePasswordChange}
              />
            </div>
            <br></br>
            <br></br>
            <Button 
              type="submit" 
              label="Login">Enter</Button>
            <br></br>
            <br></br>
            <Button onClick={() => this.props.history.push("/usersignupform")}>Create Account</Button>
          </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    user: state.user,
    token: state.token
  };
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch({type: 'ADD_CURRENT_USER', user: user}),
    setToken: (token) => dispatch({type: 'LOGIN_SUCCESS', token: token})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginForm);

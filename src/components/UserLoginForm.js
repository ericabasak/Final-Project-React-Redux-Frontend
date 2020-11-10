import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

class UserLoginForm extends Component {

  state = {
    username: "",
    password: ""
  }

  // handleChange = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // now i need to submit the info from the form the backend
  // where it will authenticate the user and if valid, sent the user back
  // with that response, then set the state
  handleLoginForm = e => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
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
        if (response.errors) {
          alert(response.errors)
        } else {
          this.props.history.push("/home")
        }
      })
  }


  handleUsernameChange = e => {
    this.setState({username: e.target.value, password: this.state.password })
  }

  handlePasswordChange = e => {
    this.setState({password: e.target.value, username: this.state.username })
  }

  render() {
    return (
      <div className="loginForm">
        <div>
          <h1 style={{ color: "#484030", textAlign: "center" }}>Login</h1>

            <h2>{ this.state.username ? 
               `Logged in as ${ this.state.username }` : 
                "Not logged in"}
            </h2>
        </div>
        <br></br>
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

export default UserLoginForm;

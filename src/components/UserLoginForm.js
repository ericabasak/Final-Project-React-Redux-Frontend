import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class UserLoginForm extends Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = e => {
    e.preventDefault()
    console.log(this.state)
    fetch("http://localhost:3001/api/v1/userloginform", {
      method: "POST",
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

  render() {
    return(
      <div className="loginForm">
        <div>
          <h1 style={{ color: "black", textAlign: "center" }}> Login </h1>
        </div>
        <br></br>
          <form onSubmit={this.handleLogin} style={{ textAlign: "center" }}>
            <div>
              <label>
                Username:
                <input 
                  type="text" 
                  name="username"
                  placeholder="enter username"
                  value={this.state.username} 
                  onChange={this.handleChange} 
                />
              </label>
            </div>
            <br></br>
            <div>
              <label>
                Password:
                <input 
                  type="text" 
                  name="password"
                  placeholder="password"
                  value={this.state.password} 
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <br></br>
            <Button color="primary" variant="contained" type="submit" label="Login"> Enter </Button>
          </form>
          <br></br>
          <div>
            <form style={{ textAlign: "center" }}>
              <Button color="primary" variant="contained" onClick={() => this.props.history.push("/usersignupform")}> Create Account </Button>
            </form>
          </div>
      </div>
    );
  }
}

export default UserLoginForm

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

  handleSubmitForm = e => {
    e.preventDefault()
    this.props.login({
      username: this.state.username,
      password: this.state.password
    })
  }

  render() {
    return(
      <div className="loginForm">
        <div>
          <h1 style={{ color: "black", textAlign: "center" }}> Login </h1>
        </div>
        <br></br>
          <form onSubmit={this.handleSubmitForm} style={{ textAlign: "center" }}>
            <div>
              <label>
                Username:
                <input 
                  type="text" 
                  name="username"
                  placeholder="username"
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
            <Button type="submit" label="Login"> Enter </Button>
          </form>
          <br></br>
          <div>
            <form style={{ textAlign: "center" }}>
              <Button type="subit" label="create account"> Create Account </Button>
            </form>
          </div>
      </div>
    );
  }
}

export default UserLoginForm

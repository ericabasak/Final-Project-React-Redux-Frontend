import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class UserSignupForm extends Component {

  state = {
    username: "",
    email: "",
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
      email: this.state.email,
      password: this.state.password
    })
  }



  render() {
    return(
      <div className="signupForm">
        <div>
          <h1 style={{ textAlign: "center" }}> Create Account </h1>
        </div>
        <form onSubmit={this.handleSubmitForm} style={{ textAlign: "center" }}>
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
              Email:
                <input 
                type="text"
                name="email"
                placeholder="enter email"
                value={this.state.email}
                onChange={this.handleChange}
                />
            </label>
          </div>
          <br></br>
          <div>
            <label>
              Password:
                <input
                type="password"
                name="password"
                placeholder="enter password"
                value={this.state.password}
                onChange={this.handleChange}
                />
            </label>
          </div>
          <br></br>
          <Button type="submit" label="signup"> Create Account </Button>
        </form>
      </div>
    )
  }
}

export default UserSignupForm
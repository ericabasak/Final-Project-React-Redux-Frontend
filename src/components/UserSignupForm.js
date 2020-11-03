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
    e.preventDefault();
    console.log(e);
    fetch("http://localhost:3001/api/v1/usersignupform", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password_digest: this.state.password,
        email: this.state.email
      })
    })
      .then(resp => resp.json())
      .then(response => {
        console.log(response);
        if (response.errors) {
          alert(response.errors)
        } else {
          this.props.history.push("/home")
        }
      })
    // this.props.login({
    //   username: this.state.username,
    //   email: this.state.email,
    //   password: this.state.password
    // })
  }



  render() {
    return (
      <div className="signupForm">
        <div>
          <h1 style={{ textAlign: "center" }}> Create Account </h1>
        </div>
        <form onSubmit={this.handleSubmitForm} style={{ textAlign: "center" }}>
          <div>
            <label>
              Username:
              <br></br>
               <input
                type="text"
                name="username"
                required
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
              <br></br>
                <input
                type="text"
                name="email"
                required
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
              <br></br>
                <input
                type="password"
                name="password"
                placeholder="enter password"
                required
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <br></br>
          <Button color="primary" variant="contained" type="submit" label="signup"> Create Account </Button>
        </form>
      </div>
    )
  }
}

export default UserSignupForm
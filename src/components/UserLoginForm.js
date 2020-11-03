import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class UserLoginForm extends Component {

  // state = {
  //   username: "",
  //   password: ""
  // }


  // handleChange = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  handleLoginForm = e => {
    e.preventDefault()
    console.log(this.props)
    console.log("hello from the form submit - cows moooooo")
    fetch("http://localhost:3001/api/v1/userloginform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        loginForm: {
          username: this.props.username,
          password: this.props.password
        }
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
    return (
      <div className="loginForm">
        <div>
          <h1 style={{ color: "black", textAlign: "center" }}> Login </h1>
        </div>
        <br></br>
          <form onSubmit={this.handleLoginForm} style={{ textAlign: "center" }}>
            <div>
              <label>
                Username:
                <br></br>
                <input 
                  type="text" 
                  name="username"
                  placeholder="enter username"
                  value={this.props.username} 
                  onChange={this.handleLoginFormChange} 
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
                  placeholder="password"
                  value={this.props.password} 
                  onChange={this.handleLoginFormChange}
                />
              </label>
            </div>
            <br></br>
            <Button color="primary" variant="contained" type="submit" label="Login"> Enter </Button>
            <br></br>
            <Button color="primary" variant="contained" onClick={() => this.props.history.push("/usersignupform")}> Create Account </Button>
          </form>
      </div>
    )
  }
  
}

export default UserLoginForm;

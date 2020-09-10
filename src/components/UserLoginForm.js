import React, { Component } from 'react';

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
          <form onSubmit={this.handleSubmitForm}>
            <div>
              <label>
                Username:
                <input 
                  type="text" 
                  value={this.state.username} 
                  onChange={this.handleChange} 
                />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input 
                  type="text" 
                  value={this.state.password} 
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <btn type="submit" label="Login"> Submit </btn>
          </form>
      </div>
    );
  }
}

export default UserLoginForm

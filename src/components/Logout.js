import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class Logout extends Component {

  logout = (e) => {
    e.preventDefault();
    console.log("hi from the logout")
    fetch("http://localhost:3001/api/v1/logout", {
      method: "DELETE",
      credentials: "include",
      header: 
      {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(resp => alert(resp.message))
      this.setState({
        currentUser: null
      })
  }

  render() {
    return(
      <div className="Logout">
        <form onSubmit={this.logout}>
          <Button 
            color="primary" 
            variant="contained" 
            type="submit" 
            label="Logout"> Logout </Button>
        </form>
      </div>
    )
  }
}

export default Logout;
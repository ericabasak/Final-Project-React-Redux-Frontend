import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class Logout extends Component {

  logout = () => {
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
      // this.setState({
      //   currentUser: null
      // })
  }


  render() {
    return(
      <div className="Logout">
        <Button onClick={this.logout} type="submit" label="Logout">Logout</Button>
      </div>
    )
  }
}

export default Logout;
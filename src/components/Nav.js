import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {

  handleLogout = () => {
    this.props.logout()
    this.props.history.push("/")
  }

  render() {
    return (
      <div style={ navStyle }>
        <h1>TodoApp</h1>
        <Link 
          style={ linkStyle } 
          to="/homepage"> Home </Link>
          | 
        <Link 
          style={ linkStyle } 
          to="/userloginform"> Login </Link>
          |
        <Link 
          style={ linkStyle } 
          to="/"> Main </Link> 
          | 
        <Link 
          style={ linkStyle } 
          to="/alllists"> Lists </Link>
          | 
        <Link 
          style={ linkStyle } 
          to="/usersignupform"> Sign up </Link>
          |
          <div className="item" style={ linkStyle } onClick={this.handleLogout}> Logout </div>
      </div>
    );
  }
}

const navStyle = {
  background: '#2089F3',
  color: '#fff',
  textAlign: 'center',
  textDecoration: 'none',
  padding: '15px',
  margin: '10px 10px 10px 10px'
}

const linkStyle = {
  color: '#fff'
}

export default Nav
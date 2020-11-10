import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {


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
      </div>
      
      
    );
  }
}

const navStyle = {
  background: '#cbb9aa',
  color: '#rrr',
  textAlign: 'center',
  textDecoration: 'none',
  padding: '12px',
  margin: '6px 6px 6px px'
}

const linkStyle = {
  color: '#fff'
}

export default Nav
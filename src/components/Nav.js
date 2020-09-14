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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div style={ navStyle }>
        <h1>TodoApp</h1>
        <Link style={ linkStyle } to="/">Main</Link> | <Link style={ linkStyle } to="/homepage">Home</Link>
      </div>
    );
  }
}

const navStyle = {
  background: '#2089F3',
  color: '#fff',
  textAlign: 'center',
  padding: '15px'
}

const linkStyle = {
  color: '#fff'
}

export default Nav
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Nav from './components/Nav';
import UserLoginForm from './components/UserLoginForm';
import UserSignupForm from './components/UserSignupForm';
import Logout from './components/Logout';
import MainComponent from './components/MainComponent';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentUser: null,
      name: "",
      title: "",
      is_complete: false,
      loginForm: {
        email: "",
        password: ""
      }
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <Nav logout={this.logout} />
            <Logout logout={this.logout}/>
            <Route exact path="/homepage" component={HomePage} />
            <Route exact path="/userloginform" 
              component={UserLoginForm} 
              getCurrentUser={this.getCurrentUser}
              handleLoginFormChange={this.handleLoginFormChange}
              username={this.state.loginForm.username}
              password={this.state.loginForm.password} 
              />
            <Route exact path="/usersignupform" 
              component={UserSignupForm} 
            />
            <Route exact path="/" 
              component={MainComponent} 
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { items: state.items};
};
 
const mapDispatchToProps = dispatch => {
  return { increaseCount: () => dispatch({ type: 'INCREASE_COUNT' })};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

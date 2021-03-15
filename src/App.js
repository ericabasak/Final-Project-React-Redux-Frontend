import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './components/HomePage';
import Nav from './components/Nav';
import UserLoginForm from './components/UserLoginForm';
import UserSignupForm from './components/UserSignupForm';
import MainComponent from './components/MainComponent';
import { getCurrentUser } from './actions/index';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentUser: null,
      name: "",
      title: "",
      isComplete: false,
      loginForm: {
        email: "",
        password: ""
      }
    }
  }

  componentDidMount() {
    this.props.getCurrentUser(this.props.token);
  }

  render() {
    // console.log(this.props);
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <Nav />
            <Route exact path="/homepage" render={props => <HomePage {...props} />} />
            <Route exact path="/userloginform" render={props => <UserLoginForm {...props} />} />
            <Route exact path="/usersignupform" component={UserSignupForm} />
            <Route exact path="/" component={MainComponent} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  return { 
    // todos: state.todos,
    // user: state.user,
    token: state.token
  };
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: (token) => dispatch(getCurrentUser(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

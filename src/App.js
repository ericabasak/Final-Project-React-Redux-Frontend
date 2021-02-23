import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import Nav from './components/Nav';
// import Logout from './components/Logout';
import UserLoginForm from './components/UserLoginForm';
import UserSignupForm from './components/UserSignupForm';
import MainComponent from './components/MainComponent';
import { connect } from 'react-redux';
import './App.css';
import { fetchCurrentUser } from './actions/index';

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

  componentDidMount() {
    this.props.fetchCurrentUser(this.props.token);
  }

  render() {
    console.log(this.props);

    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <Nav />
            <Route exact path="/homepage" render={props => <HomePage {...props} />} />
            {/* <Route exact path="/userloginform" 
              component={UserLoginForm} 
              getCurrentUser={this.getCurrentUser}
              handleLoginFormChange={this.handleLoginFormChange}
              username={this.state.loginForm.username}
              password={this.state.loginForm.password} 
              history={this.props.history}
              {...this.props}
              /> */}
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
  console.log(ownProps);
  return { 
    // todos: state.todos,
    // user: state.user,
    token: state.token
  };
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser: (token) => dispatch(fetchCurrentUser(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default withRouter(connect(mapStateToProps, mapDispatchToProps))(App);

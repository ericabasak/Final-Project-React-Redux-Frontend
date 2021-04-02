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
import Grid from '@material-ui/core/Grid';


class App extends Component {

  constructor(props) {
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

        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={6}>
            <Nav />
            <Route exact path="/homepage" render={props => <HomePage {...props} />} />
            <Route exact path="/userloginform" render={props => <UserLoginForm {...props} />} />
            <Route exact path="/usersignupform" component={UserSignupForm} />
            <Route exact path="/" component={MainComponent} />
          </Grid>
        </Grid>
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


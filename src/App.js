import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import Todos from './components/Todos';
// import TodoForm from './components/TodoForm';
import HomePage from './components/HomePage';
import Nav from './components/Nav';
import AllLists from './components/AllLists';
import UserLoginForm from './components/UserLoginForm';
import UserSignupForm from './components/UserSignupForm';
import MainComponent from './components/MainComponent';

// import { v4 as uuidv4 } from 'uuid';
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

  // state = {
  //   todos: [{
  //     id: uuidv4(),
  //     title: "",
  //     is_complete: false,
  //     currentUser: null,
  //     name: "",
  //     loginForm: {
  //       email: "",
  //       password: "",
  //       username: ""
  //     }
  //   }]
  // }

  // first goal:
  // loggin and get current user


  // logout = () => {
  //   this.setState({
  //     currentUser: null
  //   })
  // }

  // handleLogin = (e) => {
  //   e.preventDefault()
  //   console.log("hello from the app login")
  //   fetch("http://localhost:3000/api/v1/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({
  //       username: this.state.username,
  //       password: this.state.password
  //     })
  //       .then(resp => resp.json())
  //       .then(console.log)
  //   })
  // }

  // original handleChange
  // handleLoginFormChange = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }



  handleLoginFormChange = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state.todos.loginForm,
      [name]: value
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <Nav />
            <Route exact path="/homepage" component={HomePage} />
            <Route exact path="/alllists" component={AllLists} />
            <Route exact path="/userloginform" 
              component={UserLoginForm} 
              handleLoginFormChange={this.handleLoginFormChange}
              username={this.state.loginForm.username}
              password={this.state.loginForm.password}
              />
            <Route exact path="/usersignupform" component={UserSignupForm} />
            <Route exact path="/" logout={this.logout} component={MainComponent} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

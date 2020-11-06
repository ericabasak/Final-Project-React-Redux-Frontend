import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import Todos from './components/Todos';
// import TodoForm from './components/TodoForm';
import HomePage from './components/HomePage';
import Nav from './components/Nav';
import AllLists from './components/AllLists';
import UserLoginForm from './components/UserLoginForm';
import UserSignupForm from './components/UserSignupForm';
import Logout from './components/Logout';
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



  // getCurrentUser = () => {
  //   console.log("get current user is being called")
  //   fetch("http://localhost:3001/api/v1/get_current_user", {
  //     method: "GET",
  //     credentials: "include",
  //     header: 
  //     {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(resp => {
  //       if (resp.error) {
  //         alert(resp.error)
  //       } else {
  //         this.setState({
  //           currentUser: resp.user
  //         })
  //       }
  //     })
  //     .catch(console.log)
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
            <Logout logout={this.logout}/>
            <Route exact path="/homepage" component={HomePage} />
            <Route exact path="/alllists" component={AllLists} />
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

export default App;

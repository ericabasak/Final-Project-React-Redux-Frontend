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

import { v4 as uuidv4 } from 'uuid';
import './App.css';

class App extends Component {

  state = {
    todos: [{
      id: uuidv4(),
      title: "",
      is_complete: false,
      // currentUser: null,
      name: ""
    }]
  }

  logout = () => {
    this.setState({
      currentUser: null
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
        .then(resp => resp.json())
        .then(console.log)
    })
  }


  // delete todo item
  // deleteTodo = (id) => {
  //   this.setState({
  //     todos: [...this.state.todos.filter(todo => todo.id !== id)]
  //   })
  // }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <Nav />
            <Route exact path="/homepage" component={HomePage} />
            <Route exact path="/alllists" component={AllLists} />
            <Route exact path="/userloginform" component={UserLoginForm} />
            <Route exact path="/usersignupform" component={UserSignupForm} />
            <Route exact path="/" logout={this.logout} component={MainComponent} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;

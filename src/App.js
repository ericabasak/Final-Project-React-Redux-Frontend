import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Todos from './components/Todos';
import TodoForm from './components/TodoForm';
import HomePage from './components/HomePage';
import Nav from './components/Nav';
import AllLists from './components/AllLists';
import UserLoginForm from './components/UserLoginForm';
import UserSignupForm from './components/UserSignupForm';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

class App extends Component {

  state = {
    todos: [{
      id: uuidv4(),
      title: "take out the trash",
      is_complete: false,
      currentUser: null
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

  // toggle complete vs not complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.is_complete = !todo.is_complete
      }
      return todo;
    }) });
  }

  // delete todo item
  deleteTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    })
  }

  // add form for todo item
  todoForm = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      is_complete: false,
    }
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  render() {
    return (
        <BrowserRouter>
            <div className="App">
              <div className="container">
                <Nav />
                  <Route exact path="/" logout={this.logout} render={props => (
                    <React.Fragment> 
                      <TodoForm todoForm={this.todoForm} />
                      <Todos todos={this.state.todos} 
                      markComplete={this.markComplete}
                      deleteTodo={this.deleteTodo}
                      />
                    </React.Fragment>
                  )} />
                    <React.Fragment>
                    <Route exact path="/homepage" render={() => <HomePage name="Adi" />} />
                    <Route exact path="/alllists" component={AllLists} />
                    <Route exact path="/userloginform" component={UserLoginForm} />
                    <Route exact path="/usersignupform" component={UserSignupForm} />
                   </React.Fragment> 
              </div>
            </div>
        </BrowserRouter>
    );
  }
}


export default App;

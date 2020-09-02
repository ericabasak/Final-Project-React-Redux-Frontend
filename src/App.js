import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import TodoForm from './components/TodoForm';
import HomePage from './components/HomePage';
import Nav from './components/Nav';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

class App extends Component {

  state = {
    todos: [{
      id: uuidv4(),
      title: "take out the trash",
      is_complete: false
    },
    {
      id: uuidv4(),
      title: "go to grocery store",
      is_complete: true
    },
    {
      id: uuidv4(),
      title: "moew lawn",
      is_complete: false
    }]
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
      <Router>
        <div className="App">
          <div className="container">
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Nav />
                <TodoForm todoForm={this.todoForm} />
                <Todos todos={this.state.todos} 
                markComplete={this.markComplete}
                deleteTodo={this.deleteTodo}
                />
              </React.Fragment>
            )} />
            <Route exact path="/homepage" component={HomePage}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

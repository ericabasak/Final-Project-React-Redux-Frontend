import React, { Component } from 'react';
import Todos from './components/Todos';
import TodoForm from './components/TodoForm';
import uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

class App extends Component {

  state = {
    todos: [
      {
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
      }
    ]
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
      <div className="App">
        <div className="container">
          <TodoForm todoForm={this.todoForm} />
          <Todos todos={this.state.todos} 
          markComplete={this.markComplete}
          deleteTodo={this.deleteTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;

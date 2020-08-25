import React, { Component } from 'react';
import Todos from './components/Todos';
import './App.css';

class App extends Component {

  state = {
    todos: [
      {
        id: 1,
        title: "take out the trash",
        is_complete: false
      },
      {
        id: 2,
        title: "go to grocery store",
        is_complete: true
      },
      {
        id: 3,
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

  render() {
    // console.log(this.state.todos)
    return (
      <div className="App">
        <Todos todos={this.state.todos} 
        markComplete={this.markComplete}
        deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

export default App;

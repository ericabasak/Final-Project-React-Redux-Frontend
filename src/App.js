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

  render() {
    // console.log(this.state.todos)
    return (
      <div className="App">
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;

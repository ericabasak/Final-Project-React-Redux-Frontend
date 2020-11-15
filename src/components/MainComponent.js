import React, { Component } from 'react';
import TodoForm from './TodoForm';
import Todos from './Todos';

class MainComponent extends Component {

  render() {
    return (
      <div>
        <TodoForm />
        <Todos />
      </div>
    )
  }
}

export default MainComponent;

// import { createGenerateClassName } from '@material-ui/core';
import React, { Component } from 'react';
import SingleList from './SingleList';
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

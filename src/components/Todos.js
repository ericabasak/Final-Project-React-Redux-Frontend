import React, { Component } from 'react';
// import TodoItem from './TodoItem';

class Todos extends Component {
  state = {}

  componentDidMount() {
    // fetch the data
    // set the state
    fetch("http://localhost:3001/api/v1/items", {
      method: "GET",
      headers: 
      {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
    .then(response => response.json())
    .then(data => 
      this.setState = {
        todos: data
    })
  }


  render() {
    // check if state is define
    // map the array into some html
    // this.state.key.map((e,i) => {
    //   return <h1 key={i}>{e.name}</h1>
    // });
    return (
      <div>
        {this.state.todos && this.state.todos.map((todo, index) => <li key={index}> todo={todo.name}</li>)}
      </div>
    )
  }
}

export default Todos;

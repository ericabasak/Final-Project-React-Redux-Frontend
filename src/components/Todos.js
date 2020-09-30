import React, { Component } from 'react';

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
      .then(data => {
        console.log(data);
        this.setState({ todos: data })
      })
  }

  isCompleteHandler = (e) => {
    // make a fetch call to is_complete
    console.log(e.target.checked);
    console.log(e.target.value);
    const id = e.target.value;
    const url = `http://localhost:3001/api/v1/items/${id}`;
    fetch(url, {
      method: "PATCH",
      headers: 
      {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: e.target.value,
        is_complete: e.target.checked
      })
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      this.setState({ is_complete: ""})
    })
  }

  render() {
    // check if state is define
    // map the array into some html
    // this.state.key.map((e,i) => {
    //   return <h1 key={i}>{e.name}</h1>
    // });
    console.log(this.state);

    return (
      <div>
        { this.state.todos && this.state.todos.map((todo, index) => {
          
           return (
            <div key={index}>
            <input type="checkbox" value={todo.id} onChange={this.isCompleteHandler}/>&nbsp;&nbsp;&nbsp;
            <span>{todo.name} {todo.is_complete}</span>
            </div>
          )
          
        })}
      </div>
    )
  }
}

export default Todos;

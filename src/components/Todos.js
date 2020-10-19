import React, { Component } from 'react';

class Todos extends Component {
  state = {}

  componentDidMount() {
    console.log('Todos executing componentDidMount');
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

    console.log("hello");
    this.get_lists();
  }

  get_lists = () => {
    console.log("calling get list function")
    fetch("http://localhost:3001/api/v1/lists", {
      method: "GET",
      header:
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
      .then(r => {
        console.log(r);
        let oldTodos = this.state.todos;
        let oldTodoIndex = oldTodos.findIndex(e => e.id === r.id)
        oldTodos[oldTodoIndex] = r
        this.setState({ todos: oldTodos })
        // this.setState({ todos: []})
      })
  }

  render() {
    console.log('Todos executing render function');

    return (
      <div>
        { this.state.todos && this.state.todos.map((todo, index) => {

          return (
            <div key={index}>
              <input 
                type="checkbox" 
                checked={todo.value} 
                value={todo.id} 
                onChange={this.isCompleteHandler} 
              />
              &nbsp;&nbsp;&nbsp;
              <span>{todo.name} {todo.is_complete}</span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Todos;

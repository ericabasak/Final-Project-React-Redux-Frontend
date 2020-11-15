import React, { Component } from 'react';
import SingleList from './SingleList';
import { withRouter } from 'react-router-dom';

class Todos extends Component {
  state = {
    lists: [],
    todos: ""
  }

  componentDidMount() {
    this.get_lists();
  }

  get_lists = () => {
    console.log("calling get list function")
    fetch("http://localhost:3001/api/v1/lists", {
      method: "GET",
      headers:
      {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    })
    .then(response => {
      console.log(response);
      if (response.status === 401) {
        this.props.history.push("/userloginform");
        return
      } else {
        return response.json()
      }
    })
    .then(data => {
      console.log(data);
      this.setState({ lists: data })
    })
  }

  isCompleteHandler = (e) => {
    // make a fetch call to is_complete
    // making an update to item
    console.log(e.target.checked);
    console.log(e.target.value);
    const id = e.target.value;
    const url = `http://localhost:3001/api/v1/items/${id}`;
    fetch(url, {
      method: "PATCH",
      headers:
      {
        "Authorization": "Bearer " + localStorage.getItem("token")
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
      })
  }
  
  render() {
    return(
      <div>
        {this.state.lists.map((e, index) => <SingleList 
          key={index} 
          name={e.title} 
          id={e.id} /> 
        )}
      </div>
    )
  }
}

export default withRouter(Todos);

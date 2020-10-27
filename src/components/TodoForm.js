import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class TodoForm extends Component {

  state = {
    name: "",
    is_complete: false,
    title: ""
  }

  // update the state by rerendering
  onChangeList = (e) => {
    this.setState({ title: e.target.value });
  }

  onSubmitList = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/lists", {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.state.title
      })
    }).then(response => response.json())
    .then(response => console.log(response));
    this.todoForm(this.state.title);
    this.setState({ title: "" });
  }

  // add form for todo item
  todoForm = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      is_complete: false
    }
    this.setState({ title: [...this.state.title, newTodo] });
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmitList} style={{ display: 'flex' }}>
          <label>
            Create list:
            <input
                type="text"
                name="title"
                style={{ flex: '10', padding: '10px' }}
                placeholder="enter list name"
                value={this.state.title}
                onChange={this.onChangeList}
              />
          </label>
          <br></br>
          <input
            type="submit"
            value="submit"
            className="btn"
            style={{flex: '1'}}
          />
        </form>
        
        {/* <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
          <p>Add items to your list:</p>
          <input
            type="text"
            name="title"
            style={{ flex: '10', padding: '10px' }}
            placeholder="enter task..."
            value={this.state.name}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="add item"
            className="btn"
            style={{flex: '1'}}
          />
        </form> */}
      </>
    );
  };
}


export default TodoForm;
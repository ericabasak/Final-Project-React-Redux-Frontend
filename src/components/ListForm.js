import { TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class ListForm extends Component {

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
        "Authorization": "Bearer " + localStorage.getItem("token")
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
      title,
      is_complete: false
    }
    this.setState({ 
      title: [...this.state.title, newTodo]
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmitList} style={{ display: 'flex' }}>
          <TextField
            label="Create List"
            type="text"
            name="create list"
            fullWidth
            style={{ flex: '30', padding: '20px' }}
            value={this.state.title}
            onChange={this.onChangeList}
          />
          <br></br>
          <Button type="submit" label="Submit">Submit</Button>
        </form>
      </>
    );
  };
}

export default ListForm;
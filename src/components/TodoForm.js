import React, { Component } from 'react';

class TodoForm extends Component {

  state = {
    name: " ",
    is_complete: false
  }

  onChange = (e) => {
    // console.log(e.target.value);
    this.setState({ name: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/items", {
      method: "POST",
      headers: 
      {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ 
        name: this.state.name, 
        is_complete: false 
      })
    }).then(response => response.json())
    .then(response => console.log(response));

    this.props.todoForm(this.state.name);
    this.setState({ 
      name: " ",
      is_complete: false
     });

  }

  render() {
    return (
        <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
          <input
            type="text"
            name="title"
            style={{ flex: '10', padding: '5px' }}
            placeholder="enter task..."
            value={this.state.title}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="add item"
            className="btn"
            style={{flex: '1'}}
          />
        </form>
    );
  };

}


export default TodoForm;
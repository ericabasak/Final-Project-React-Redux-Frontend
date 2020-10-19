import React, { Component } from 'react';

class TodoForm extends Component {

  state = {
    name: " ",
    is_complete: false,
    title: " "
  }

  onChange = (e) => {
    // console.log(e.target.value);
    this.setState({ name: e.target.value });
  }

  onChangeList = (e) => {
    this.setState({ title: e.target.value });
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
    this.props.todoForm(this.state.title);
    this.setState({
      title: " "
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmitList} style={{ display: 'flex' }}>
          <p>Create a list:</p>
        <input
            type="text"
            name="title"
            style={{ flex: '10', padding: '10px' }}
            placeholder="enter list name..."
            value={this.state.title}
            onChange={this.onChangeList}
          />
          <input
            type="submit"
            value="create list"
            className="btn"
            style={{flex: '1'}}
          />
        </form>
        <br></br>
        
        <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
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
        </form>
      </>
    );
  };
}


export default TodoForm;
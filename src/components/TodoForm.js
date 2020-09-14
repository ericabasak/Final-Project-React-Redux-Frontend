import React, { Component } from 'react';

class TodoForm extends Component {

  state = {
    title: " ",
    is_complete: false
  }

  onChange = (e) => this.setState({ title: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.todoForm(this.state.title);
    this.setState({ title: " " });
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
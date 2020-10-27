import React, { Component } from 'react';

class TodoItem extends Component {

  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
    }
  }

  // for updating the checkbox next to each item
  handleCheckboxChange = (e) => {
    this.setState({ is_complete: e.target.checked })
  }

  // toggle complete vs not complete
  // for updating the checkbox next to each item
  // handleCheckboxChange = (id) => {
  //   // this.setState({ is_complete: e.target.checked })
  //   this.setState({
  //     todos: this.state.todos.map(e => {
  //       if ( e.id === id ) {
  //         e.is_complete = !e.is_complete
  //       }
  //       return e;
  //     })
  //   });
  // }

  render() {
    return (
      <div style={this.getStyle()}>
          <label>
            <input
              name="is_complete"
              type="checkbox"
              checked={this.state.is_complete}
              onChange={this.state.handleCheckboxChange}
            />
          </label>
          &nbsp; {this.props.name} &nbsp;
          <button onClick={this.props.deleteTodo}>remove</button>
      </div>
    )
  }
}

export default TodoItem;
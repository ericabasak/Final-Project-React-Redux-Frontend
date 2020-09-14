import React, { Component } from 'react';

class TodoItem extends Component {

  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.todo.is_complete ? 'line-through' : 'none'
    }
  }

  render() {
    return (
      <div style={this.getStyle()}>
        <p>
          <input type="checkbox" onChange={this.props.markComplete.bind(this, this.props.todo.id)} /> {' '}
          { this.props.todo.title }
          <button onClick={this.props.deleteTodo.bind(this, this.props.todo.id)}>remove</button>
        </p>
      </div>
    )
  }
}

export default TodoItem;
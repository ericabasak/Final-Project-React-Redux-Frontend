import React, { Component } from 'react';

class TodoItem extends Component {

  state = {
    name: "",
    is_complete: false,
    title: ""
  }

  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
    }
  }

  // for updating the checkbox next to each item
  // handler for onChange
  handleCheckboxChange = (e) => {
    e.preventDefault();
    console.log("this checkbox was clicked")
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

  // handler for onclick to delete item
  handleDelete = (e) => {
    e.preventDefault();
    console.log("this button is being deleted")
  }

  render() {
    return (
      <div style={this.getStyle()}>
          <label>
            <input
              name="is_complete"
              type="checkbox"
              checked={this.props.value}
              onChange={this.handleCheckboxChange}
            />
          </label>
          &nbsp; {this.props.name} &nbsp;
          <button onClick={this.handleDelete}>remove</button>
      </div>
    )
  }
}


export default TodoItem;
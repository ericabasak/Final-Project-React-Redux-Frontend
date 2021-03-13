import React, { Component } from 'react';
import Items from './Items';
import { Button, Checkbox, TextField } from '@material-ui/core';

class SingleList extends Component {
  
  state = {
    name: "",
    isComplete: this.props.isComplete
  }

  // WHY DOES THIS NEED TO BE LOCATED IN HERE VERSES SINGLELISTCONTAINER??????
  // in the parameter, why is e there and not is_complete?
  updateListStatus = (e) => {
    console.log("the the checkbox is being called for list")
    this.setState({ isComplete: !this.state.isComplete }, () =>
      this.props.updateListStatus(this.props.id, this.state.isComplete) 
    )
  }


  // handler for when an item or todo is created within a list
  handleSubmit = (e) => {
   e.preventDefault();
    this.props.addTodoItemToList(
      this.props.id, 
      this.state.name, 
      this.props.token
    )
    this.setState({ 
      ...this.state, 
      name: "" 
    })
  }

  onChange = (e) => {
    this.setState({ 
      name: e.target.value 
    });
  }

  render() {
    console.log(this.props);
    
    return (
      <div>
        <h2>
          <Checkbox
            name="isComplete"
            type="checkbox"
            color="default"
            checked={this.state.isComplete}
            onChange={this.updateListStatus}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <span style={{ textDecoration: this.state.isComplete ? "line-through" : "" }}>
            {this.props.name}
          </span>
        </h2>
        <div>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex' }}>
            <TextField
              label="Add todo item"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            <br></br>
            <br></br>
            <Button type="submit" label="Submit">Enter</Button>
          </form>
        </div>

        {this.props.todos.map((e, index) => 
        (<Items
          key={index}
          name={e.name}
          id={e.id}
          is_complete={e.is_complete}
        />
        ))}
      </div>
    )
  }
}

export default SingleList;

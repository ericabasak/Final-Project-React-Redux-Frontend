import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

class TodoItem extends Component {

  // initialize state from db
  // here we are using the constructor method to initialize
  // state from the parent component - props
  constructor(props) {
    super(props); 
      this.state = {
        name: props.name,
        is_complete: props.is_complete,
        id: props.id
    }
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
  // handleCheckboxChange = (e) => {
  //   console.log(e.target.checked);
  //   // if (this.state.is_complete) {
  //   //   this.setState({ is_complete: false })  
  //   // } else {
  //   //   this.setState({ is_complete: true })  
  //   // }{
  //   this.setState({ is_complete : !this.state.is_complete })
  // }

  // 

  checkboxHandler = (e) => {
    console.log("the the checkbox is being called")
    fetch(`http://localhost:3001/api/v1/items/${this.props.id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        list_id: this.props.id,
        is_complete: e.target.checked
      })
    })
    .then(response => response.json())
      .then(data => console.log(data))
        this.setState({ 
          is_complete : !this.state.is_complete
        });
  }

  // handler for onclick to delete item
  // fetch request to delete the inidivual item
  deleteHandler = () => {
    console.log("this button is being clicked")
    fetch(`http://localhost:3001/api/v1/items/${this.props.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
  }

  render() {

    return (
      <div style={this.getStyle()}>
          <Grid item xs={12}>
            <Checkbox 
              name="is_complete"
              type="checkbox"
              checked={this.state.is_complete}
              onChange={this.checkboxHandler}
            />
          </Grid>
          &nbsp; {this.props.name} {this.props.id}  &nbsp;
          <Grid container justify="flex-end">
            <Button onClick={this.deleteHandler}
              type="submit" 
              label="Delete">Delete</Button>
          </Grid>
      </div>
    )
  }
}

export default TodoItem;
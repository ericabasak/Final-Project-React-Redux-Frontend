import React, { Component } from 'react';
import { Button, Checkbox } from '@material-ui/core';
import { fetchDeleteTodoItem } from '../actions';
import { connect } from 'react-redux';

class Items extends Component {
  // // initialize state from db
  // // here we are using the constructor method to initialize
  // // state from the parent component - props
  constructor(props) {
    super(props); 
      this.state = {
        is_complete: props.is_complete
    }
  }

  checkboxHandler = (e) => {
    console.log("the the checkbox is being called")
    fetch(`http://localhost:3001/api/v1/items/${this.props.id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        is_complete: e.target.checked
      })
    })
    .then(response => response.json())
      .then(data => console.log(data));
        this.setState({ 
          is_complete : !this.state.is_complete
        });
  }

  // handler for onclick to delete item
  // fetch request to delete the inidivual item
  // fetchDeleteTodoItem = (token) => {
  //   console.log("this button is being clicked")
  //   fetch(`http://localhost:3001/api/v1/items/${token}`, {
  //     method: "DELETE",
  //     headers:
  //     {
  //       "Authorization": "Bearer " + localStorage.getItem("token")
  //     }
  //   })
  //   .then(response => response.json())
  // }

  deleteHandlerItem = (e) => {
    console.log("the delete is being clicked")
    e.preventDefault();
    // fetch(`http://localhost:3001/api/v1/items/${this.props.id}`, {
    //   method: "DELETE",
    //   headers:
    //   {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer " + localStorage.getItem("token")
    //   },
    // })
    //   .then(response => {
    //     // response.json()
    //     // this.props.removeTodo(this.props.id);
    //     this.r
    //   })
    this.props.fetchDeleteTodoItem(this.props.id, localStorage.getItem("token"));
  }
  
  render() {
    // console.log(this.props);

    return(
      <div>
        <Checkbox 
          name="is_complete"
          type="checkbox"
          color="default"
          checked={this.state.is_complete}
          onChange={this.checkboxHandler}
        />
          &nbsp; {this.props.name} {this.props.id}  &nbsp;
        <Button onClick={this.deleteHandlerItem}
          type="submit" 
          label="Delete">Delete</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    todos: state.todos,
    loading: state.loading,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeleteTodoItem: (id, token) => dispatch(fetchDeleteTodoItem(id, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);

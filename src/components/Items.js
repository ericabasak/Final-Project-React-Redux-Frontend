import React, { Component } from 'react';
import { Button, Checkbox } from '@material-ui/core';
import { deleteTodoItem, updateItemCheckbox } from '../actions';
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

  // put this into the redux action
  checkboxHandler = () => {
    console.log("the the checkbox is being called for an item")
    this.setState({is_complete: !this.state.is_complete}, () => {
      this.props.updateItemCheckbox(
        this.props.id, this.props.token, this.state.is_complete);
    });
  }


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
    this.props.deleteTodoItem(this.props.id, localStorage.getItem("token"));
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
        <span
          style={{ textDecoration: this.props.is_complete ? "line-through" : ""}}>
          {this.props.name}
        </span>
          {/* &nbsp; {this.props.name} {this.props.id}  &nbsp; */}
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
    isComplete: state.isComplete,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodoItem: (id, token) => dispatch(deleteTodoItem(id, token)),
    updateItemCheckbox: (id, token, is_complete) => dispatch(updateItemCheckbox(id, token, is_complete))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);

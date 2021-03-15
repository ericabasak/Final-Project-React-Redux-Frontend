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
        isComplete: props.isComplete
    }
  }

  checkboxHandler = () => {
    console.log("the the checkbox is being called for an item")
    this.setState({isComplete: !this.state.isComplete}, () => {
      this.props.updateItemCheckbox(
        this.props.id, 
        this.props.token, 
        this.state.isComplete
      );
    });
  }

  deleteHandlerItem = (e) => {
    console.log("the delete is being clicked")
    this.props.deleteTodoItem(this.props.id, localStorage.getItem("token"));
  }
  
  render() {
    console.log("this is for items")
    console.log(this.props);

    return(
      <div>
        <Checkbox 
          name="is_complete"
          type="checkbox"
          color="default"
          checked={this.state.isComplete}
          onChange={this.checkboxHandler}
        />
        <span
          style={{ textDecoration: this.state.isComplete ? "line-through" : ""}}>
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
    updateItemCheckbox: (id, token, isComplete) => dispatch(updateItemCheckbox(id, token, isComplete))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);

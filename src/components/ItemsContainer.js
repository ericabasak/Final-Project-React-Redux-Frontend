import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from './Items';
import { deleteTodoItem, updateItemCheckbox } from '../actions/index';


class ItemsContainer extends Component {
  // initialize state from db
  // here we are using the constructor method to initialize
  // state from the parent component - props
  // gets data , connecting to redux, get data to send to container(child)

  // <div>
  // &nbsp; {this.props.name} {this.props.id}  &nbsp;
  // </div>

  render() {
    console.log(this.props);

    const { 
      id,
      name,
      token,
      isComplete
    } = this.props

    return (
      <Items 
        id={id}
        name={name}
        token={token}
        isComplete={isComplete}
        deleteTodoItem={this.props.deleteTodoItem}
        updateItemCheckbox={this.props.updateItemCheckbox}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    // todos: state.todos,
    loading: state.loading,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodoItem: (id, token) => dispatch(deleteTodoItem(id, token)),
    updateItemCheckbox: (id, token, isComplete) => dispatch(updateItemCheckbox(id, token, isComplete))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);


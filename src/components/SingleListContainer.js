import React, { Component } from 'react';
import { getTodoItems, updateListStatus, addTodoItemToList } from '../actions/index';
import { connect } from 'react-redux';
import SingleList from './SingleList';
// import { List } from '@material-ui/core';

class SingleListContainer extends Component {
  // retrieve all items from the backend
  componentDidMount() {
    console.log(this.props.id);
    this.props.getTodoItems(
      this.props.id, 
      this.props.token
    );
  }
  
  listTodo = (name) => {
    const newItem = { name, is_complete: false}
    this.setState({ 
      name: [...this.state.name, newItem] 
    });
  }

  render() {
   console.log(this.props);

   const filteredItems = this.props.todos.filter(item => item.list_id === this.props.id)

   return (
     <SingleList 
        name={this.props.name}
        id={this.props.id}
        isComplete={this.props.is_complete}
        token={this.props.token}
        addTodoItemToList={this.props.addTodoItemToList}
        updateListStatus={this.props.updateListStatus}
        todos={filteredItems}
     />
   )
  }
}

const mapStateToProps = state => {
  return { 
    todos: state.todoItems,
    loading: state.loading,
    isComplete: state.isComplete,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodoItems: (listId, token) => dispatch(getTodoItems(listId, token)),
    updateListStatus: (id, is_complete) => dispatch(updateListStatus(id, is_complete)),
    addTodoItemToList: (id, name, token) =>dispatch(addTodoItemToList(id, name, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleListContainer);

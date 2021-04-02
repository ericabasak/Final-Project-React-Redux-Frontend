import React, { Component } from 'react';
import { getTodoItems, updateListStatus, addTodoItemToList } from '../actions/index';
import { connect } from 'react-redux';
import SingleList from './SingleList';

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
    const newItem = { 
      name, 
      isComplete: false
    }
    this.setState({ 
      name: [
        ...this.state.name, 
        newItem
      ] 
    });
  }

  render() {
    console.log(this.props);

    const filteredItems = this.props.todos.filter(item => item.list_id === this.props.id)

   return (
     <SingleList
        name={this.props.name}
        id={this.props.id}
        isComplete={this.props.isComplete}
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
    token: state.token
  };
};


// mapDispatchToProps() function receives dispatch function 
// as a parameter and returns you callback props as plain object 
// that you pass to your react component

// mapDispatchToProps() is used to dispatch an action to store.
// In react-redux, components cannot access the store directly. The 
// only way is to use connect().

const mapDispatchToProps = (dispatch) => {
  return {
    getTodoItems: (listId, token) => dispatch(getTodoItems(listId, token)),
    updateListStatus: (id, isComplete) => dispatch(updateListStatus(id, isComplete)),
    addTodoItemToList: (id, name, token) =>dispatch(addTodoItemToList(id, name, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleListContainer);

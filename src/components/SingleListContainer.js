import React, { Component } from 'react';
import { getTodoItems, updateListStatus, addTodoItemToList } from '../actions/index';
import { connect } from 'react-redux';
import SingleList from './SingleList';

// loading all todos for a a list
class SingleListContainer extends Component {
  // retrieve all items from the backend
  componentDidMount() {
    // console.log(this.props.id);
    this.props.getTodoItems(
      // list id 
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
    const { 
      name, 
      id, 
      isComplete, 
      token 
    } = this.props

    const filteredItems = this.props.todos.filter(
      item => item.list_id === this.props.id)
    console.log(filteredItems);

   return (
     <SingleList
        name={name}
        id={id}
        isComplete={isComplete}
        token={token}
        addTodoItemToList={this.props.addTodoItemToList}
        updateListStatus={this.props.updateListStatus}
        todos={filteredItems}
     />
   )
  }
}

// keys and objects in mstp
// these will be props passed down to singleListContainer with the first render.
// the first time you render the component it will have the return value of mstp in it already.
// mstp happens before render for singlelistcontainer.
// connect is actually the file your exporting NOT singlelistcontainer.

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

// connect component is the one actually wrapping the SingleListContainer which is the class defined in this component.
// connect has two arguments - mstp's & mdtp's
// connected component is the one actually be exported, NOT singleListContainer.
// SingleListContainer is a child component of the connected component.
export default connect(mapStateToProps, mapDispatchToProps)(SingleListContainer);

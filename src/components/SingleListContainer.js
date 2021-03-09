import React, { Component } from 'react';
import { getTodoItems, updateListStatus, fetchTodoHandleSubmit } from '../actions/index';
import { connect } from 'react-redux';
import SingleList from './SingleList';

class SingleListContainer extends Component {
  // state = {
  //   todoItems: [],
  //   name: "",
  //   is_complete: false
  // }

  // retrieve all items from the backend
  componentDidMount() {
    console.log(this.props.id);
    this.props.getTodoItems(this.props.id, this.props.token);
  }



  onChange = (e) => {
    // console.log(e.target.value);
    this.setState({ name: e.target.value });
  }

// handler for when an item or todo is created within a list
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchTodoHandleSubmit(
      this.props.id, 
      this.state.name, 
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
    // console.log(this.state)
    // filter todoitems over lists with list id
    const items = this.props.todoItems.filter(x => {
      // console.log(x);
      return x.list_id === this.props.id
    });
    // console.log(items)
    return ( 
      <SingleList 
        items={items} 
        name={this.props.name}
        handleSubmit={this.handleSubmit}
        id={this.props.id}
        is_complete={this.props.is_complete}
        onChange={this.onChange}
        updateListStatus={this.props.updateListStatus}
        checkboxHandlerList={this.checkboxHandlerList} 
      />
    )  
  }
}

const mapStateToProps = state => {
  return { 
    todoItems: state.todoItems,
    loading: state.loading,
    isComplete: state.isComplete,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodoItems: (listId, token) => dispatch(getTodoItems(listId, token)),
    updateListStatus: (id, is_complete) => dispatch(updateListStatus(id, is_complete)),
    fetchTodoHandleSubmit: (id, name, token) =>dispatch(fetchTodoHandleSubmit(id, name, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleListContainer);

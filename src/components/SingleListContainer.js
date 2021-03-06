import React, { Component } from 'react';
import { fetchTodoItems, fetchIsComplete, fetchTodoHandleSubmit } from '../actions/index';
import { connect } from 'react-redux';
import SingleList from './SingleList';

class SingleListContainer extends Component {
  state = {
    todoItems: [],
    name: "",
    is_complete: false
  }

  // retrieve all items from the backend
  componentDidMount() {
    console.log(this.props.id);
    this.props.fetchTodoItems(this.props.id, this.props.token);
  }

  onChange = (e) => {
    // console.log(e.target.value);
    this.setState({ name: e.target.value });
  }


// handler for when an item or todo is created within a list
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("this todo handle is being submited");
    this.props.fetchTodoHandleSubmit(this.props.id, this.state.name, this.props.token);
  }

  listTodo = (name) => {
    const newItem = {
      name,
      is_complete: false
    }
    this.setState({ 
      name: [
        ...this.state.name, 
        newItem
      ] 
    });
  }

  // get this to work and then convert to redux
  checkboxHandlerList = (e) => {
    console.log("the the checkbox is being called for list")
    fetch(`http://localhost:3001/api/v1/lists/${this.props.id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: this.props.name,
        id: this.props.id,
        is_complete: e.target.checked
      })
    })
    .then(response => response.json())
      .then(data => console.log(data))
        this.setState({ 
          is_complete : e.target.checked
        });
  }

  // handleCheckbox = (e) => { 
  //   console.log("this box is clicked")
  //   // console.log(e.target.checked)
  //   this.setState({
  //   is_complete: e.target.checked
  //   });
  // }


  render() {
    // console.log(this.state)
    // filter toditems over lists with list id
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
        is_complete={this.state.is_complete}
        onChange={this.onChange}
        value={this.state.name}
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
    fetchTodoItems: (listId, token) => dispatch(fetchTodoItems(listId, token)),
    fetchIsComplete: (token) => dispatch(fetchIsComplete(token)),
    fetchTodoHandleSubmit: (id, name, token) =>dispatch(fetchTodoHandleSubmit(id, name, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleListContainer);

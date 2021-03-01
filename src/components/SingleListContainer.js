import React, { Component } from 'react';
import { fetchTodoItems, fetchIsComplete } from '../actions/index';
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
    this.setState({ name: e.target.value });
  }

  // create a item associated to a list
  handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/items", {
      method: "POST",
      headers:
      {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: this.state.name,
        list_id: this.props.id,
        is_complete: false
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
    this.listTodo(this.state.name);
    this.setState({
      name: "",
      is_complete: false
    });
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

  checkboxHandlerList = (e) => {
    console.log("the the checkbox is being called")
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
        checkboxHandlerList={this.checkboxHandlerList}/>)  
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
    fetchIsComplete: (token) => dispatch(fetchIsComplete(token))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleListContainer);

import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { fetchTodoItems, fetchIsComplete } from '../actions/index';
import { connect } from 'react-redux';

class SingleList extends Component {

  state = {
    items: [],
    name: "",
    is_complete: false
  }

  // console.log("list items is being called")
  // retrieve all items from the backend
  // console.log(this.props);
  componentDidMount() {
    this.props.fetchDataTodoItems(this.props.id);
    this.props.listCheckboxHandler(this.props.id);
    // this.props.listCheckboxHandler(this.props.id);
    // let result = fetch(`http://localhost:3001/api/v1/lists/${this.props.id}`,
    //   {
    //     method: "GET",
    //     headers:
    //     {
    //       "Authorization": "Bearer " + localStorage.getItem("token")
    //     },
    //   })
    // result.then(r => r.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({ items: data })
    //   })
  }

  onChange = (e) => {
    // console.log(e.target.value);
    this.setState({ name: e.target.value });
  }

  // create a item associated to a list
  handleSubmit = (e) => {
    console.log("inside handleSubmit")
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
    this.setState({ name: [...this.state.name, newItem] });
  }

  // list is complete checkbox handler
    // listCheckboxHandler = (id) => { 
    // console.log("is the listcheckboxhandler being called???")
    // fetch(`http://localhost:3001/api/v1/lists/${this.props.id}`, {
    //   method: "PATCH",
    //   headers:
    //   {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer " + localStorage.getItem("token")
    //   },
    //   body: JSON.stringify({
    //     list: {
    //       name: this.state.name,
    //       is_complete: this.target.checked
    //     }
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   this.setState({ 
    //     is_complete: !this.state.is_complete 
    //   })
    // }


  render() {
    // console.log(this.props)
    // console.log(this.state.lists)
    return (
      <div >
        <h2>
          <Checkbox
            name="is_complete"
            type="checkbox"
            onChange={this.state.listCheckboxHandler}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
         &nbsp;
          {this.props.name} {this.props.id} &nbsp;
        </h2>
        <h4> Items </h4>
        <div>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex' }}>
            <TextField
              label="Add todo item"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            <br></br>
            <br></br>
            <Button type="submit" label="Submit">Enter</Button>
          </form>
        </div>
        {this.state.items.map((e, index) => (<TodoItem
          key={index}
          name={e.name}
          id={e.id}
          is_complete={e.is_complete} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    todoItems: state.todoItems,
    loading: state.loading,
    isComplete: state.isComplete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchDataTodoItems: (id) => dispatch(fetchTodoItems(id)),
      listCheckboxHandler: (id) => dispatch(fetchIsComplete(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleList);

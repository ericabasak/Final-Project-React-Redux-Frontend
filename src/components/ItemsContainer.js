import React, { Component } from 'react';
import { fetchDeleteTodoItem } from '../actions/index';
import { connect } from 'react-redux';
import Items from './Items';


class ItemsContainer extends Component {
  // initialize state from db
  // here we are using the constructor method to initialize
  // state from the parent component - props
  constructor(props) {
    super(props); 
      this.state = {
        name: props.name,
        is_complete: props.is_complete,
        id: props.id
    }
  }

  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
    }
  }

  checkboxHandler = (e) => {
    console.log("the the checkbox is being called")
    fetch(`http://localhost:3001/api/v1/items/${this.props.id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: this.state.name,
        list_id: this.props.id,
        is_complete: e.target.checked
      })
    })
    .then(response => response.json())
      .then(data => console.log(data))
        this.setState({ 
          is_complete : !this.state.is_complete
        });
  }

  // handler for onclick to delete item
  // fetch request to delete the inidivual item
  fetchDeleteTodoItem = (token) => {
    console.log("this button is being clicked")
    fetch(`http://localhost:3001/api/v1/items/${token}`, {
      method: "DELETE",
      headers:
      {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then(response => response.json())
  }

  render() {
    return (
      <div style={this.getStyle()} >
          &nbsp; {this.props.name} {this.props.id}  &nbsp;
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    todos: state.todos,
    loading: state.loading,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeleteTodoItem: (token) => dispatch(fetchDeleteTodoItem(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
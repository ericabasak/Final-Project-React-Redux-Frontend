import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListForm } from '../actions/index';
import { Button, TextField } from '@material-ui/core';

class ListForm extends Component {

  state = {
    name: "",
    is_complete: false,
    title: ""
  }

  // update the state by rerendering
  onChangeList = (e) => {
    this.setState({ 
      title: e.target.value 
    });
  }

  // convert token for redux, there is no more local storage
  // finish converting to redux store
  onSubmitList = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/lists", {
      method: "POST",
      headers:
      {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        title: this.state.title
      })
    }).then(response => response.json())
    .then(response => console.log(response));
    this.todoForm(this.state.title);
    this.setState({ title: "" });
  }

  // add form for todo item
  todoForm = (title) => {
    const newTodo = {
      title,
      is_complete: false
    }
    this.setState({ 
      title: [...this.state.title, newTodo]
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmitList} style={{ display: 'flex' }}>
          <TextField
            label="Create List"
            type="text"
            name="create list"
            fullWidth
            style={{ flex: '30', padding: '20px' }}
            value={this.state.title}
            onChange={this.onChangeList}
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <Button type="submit" label="Submit">Submit</Button>
        </form>
      </>
    );
  };
}


const mapStateToProps = state => {
  return { 
    listForm: state.listForm,
    loading: state.loading,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListForm: (listFormId, token) => dispatch(getListForm(listFormId, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListForm);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListForm, addAList } from '../actions/index';
import { Button, TextField } from '@material-ui/core';

class ListForm extends Component {

  state = {
    name: "",
    isComplete: false,
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
  // onSubmitList
  // addAList = (e) => {
  //   e.preventDefault();
  //   fetch("http://localhost:3001/api/v1/lists", {
  //     method: "POST",
  //     headers:
  //     {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //       "Authorization": "Bearer " + localStorage.getItem("token")
  //     },
  //     body: JSON.stringify({
  //       title: this.state.title
  //     })
  //   }).then(response => response.json())
  //   .then(response => console.log(response));
  //   this.todoForm(this.state.title);
  //   this.setState({ 
  //     title: "" 
  //   });
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addAList(
      this.state.title, 
      this.props.token
      )
      this.setState({ 
        ...this.state, 
        title: "" 
      })
  }

  // add form for todo item
  todoForm = (title) => {
    const newTodo = {
      title,
      isComplete: false
    }
    this.setState({ 
      title: [...this.state.title, newTodo]
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} style={{ display: 'flex' }}>
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
    addAList: (title, token) => dispatch(addAList(title, token)),
    getListForm: (listFormId, token) => dispatch(getListForm(listFormId, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListForm);
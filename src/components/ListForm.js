import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListForm, addAList } from '../actions/index';
import { Grid, Button, TextField } from '@material-ui/core';

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
         <Grid
          container
          spacing={2}
          direction="column"
        >
          <Grid item xs={12}>
            <form onSubmit={this.handleSubmit} class="createListForm">
              <TextField
                label="Create List"
                type="text"
                name="create list"
                required
                fullWidth
                value={this.state.title}
                onChange={this.onChangeList}
              /><br/><br/>

              <Button type="submit" variant="contained" size="small" color="primary" label="Submit">Submit</Button>
            </form>
          </Grid>
        </Grid>
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
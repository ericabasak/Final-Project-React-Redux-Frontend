import React, { Component } from 'react';
import ItemsContainer from './ItemsContainer';
import { Grid, Button, Checkbox, TextField } from '@material-ui/core';

class SingleList extends Component {
  // ask yourself these questions about state:
  // do i need state in this component?
  // where should the state be? i.e.which component should the state be in?
  // are there any other components that need this state?

  state = {
    name: "",
    isComplete: this.props.isComplete,
    hideFinishedTodo: false
  }

  updateListStatus = (e) => {
    console.log("the the checkbox is being called for list")
    this.setState({ isComplete: !this.state.isComplete }, () =>
      this.props.updateListStatus(
        this.props.id,
        this.state.isComplete
      )
    )
  }

  // handler for when an item or todo is created within a list
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodoItemToList(
      this.props.id,
      this.state.name,
      this.props.token
    )
    this.setState({
      ...this.state,
      name: ""
    })
  }

  onChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  // handler for hiding finished todos
  hideFinishedTodoHandler = () => {
    console.log("the checkbox is being clicked which hides completed todos");
    this.setState({
      hideFinishedTodo: !this.state.hideFinishedTodo
    })
  }

  render() {
    console.log("this is for singlelist");
    console.log(this.props);
    console.log(this.props.todos);
    
    // filter through completed todos
    const filterTodo = this.props.todos.filter(todo => todo.is_complete === false)
    
    return (
      <Grid
        container
        spacing={2}
        direction="column"
        className="debug"
      >

      {/* checkbox to hide completed todos */}
      <>
        <form>
          <input
            type="checkbox"
            name="hideCompletedTodo"
            checked={this.state.hideFinishedTodo}
            onChange={this.hideFinishedTodoHandler}
          />
          &nbsp;
          <label>Hide finished todo</label>
        </form>
      </>

        <Grid item xs={10}>
          <h4>
            <Checkbox
              name="isComplete"
              type="checkbox"
              color="default"
              checked={this.state.isComplete}
              onChange={this.updateListStatus}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <span style={{ textDecoration: this.state.isComplete ? "line-through" : "" }}>
              {this.props.name}
            </span>
          </h4>
        </Grid>
        <Grid item xs={2} />

        <Grid item xs={12}>
          <form onSubmit={this.handleSubmit}>
            <Grid container>
              <Grid item xs={8}>
                <TextField
                  label="Add todo item"
                  type="text"
                  name="name"
                  fullWidth
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Button color="primary" variant="contained" size="small"
                  type="submit" label="Submit">Enter</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={12} className="singleListContainer" >

        {!this.state.hideFinishedTodo && this.props.todos.map((e) => {
            return (<ItemsContainer
            key={e.id}
            name={e.name}
            id={e.id}
            isComplete={e.is_complete}
          />
          )}
          )}

          {this.state.hideFinishedTodo && filterTodo.map((e) => {
            return (<ItemsContainer
            key={e.id}
            name={e.name}
            id={e.id}
            isComplete={e.is_complete}
          />
          )}
          )}
          
        </Grid>
      </Grid>
    )
  }
}

export default SingleList;

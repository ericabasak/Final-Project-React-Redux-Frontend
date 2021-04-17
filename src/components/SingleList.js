import React, { Component } from 'react';
import ItemsContainer from './ItemsContainer';
import { Grid, Button, Checkbox, TextField } from '@material-ui/core';

class SingleList extends Component {

  state = {
    name: "",
    isComplete: this.props.isComplete,
    // hideCompletedTask: false,
    // hideButtonText: "Hide"
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

  // onClick for clicking a button to hide completed items from a list
  // onClick is an event
  onClick = () => {
    this.setState({
      hideFinishedTodo: !this.state.hideFinishedTodo
    })
    // if (this.state.hideCompletedTask) {
    //   this.setState({hideButtonText: "Hide", hideCompletedTask: false});
    // } else {
    //   this.setState({hideButtonText: "Unhide", hideCompletedTask: true});
    // }

    // this.setState({
    //   hideCompletedTask: !this.state.hideCompletedTask,
    // })
  }

  render() {
    console.log("this is for singlelist");
    console.log(this.props);
    console.log(this.props.todos);

    const { hideFinishedTodo } = this.state;

    const filterTodo = this.props.todos.filter(todo => todo.is_complete === false);
    console.log(filterTodo);

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
                name="taskCompleted"
                type="checkbox"
                checked={this.state.hideFinishedTodo}
                onChange={this.onClick}
              />
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

        <Grid item xs={12} className="singleListContainer">

          {/* react event handlers are written in curly braces */}
        {/* <button onClick={this.onClick} type="toggle" label="Toggle">Hide or unhide</button> */}
              

        {/* hideCompletedTask = true,  hideCompletedTask = false */}
          {/* {!hideCompletedTask && <h1>hide</h1>}
          {hideCompletedTask && <h1>unhide</h1>} */}
          {!hideFinishedTodo && this.props.todos.map((e, index) => {
            return (<ItemsContainer
            key={index}
            name={e.name}
            id={e.id}
            isComplete={e.is_complete}
          />
          )}
          )}
          
          {hideFinishedTodo && filterTodo.map((e, index) => {
            return (<ItemsContainer
            key={index}
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

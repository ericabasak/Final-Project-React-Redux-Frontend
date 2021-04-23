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
    hideCompletedTask: false
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

  // onClick a checkbox to hide completed todos from a list
  hideCompletedTodoHandler = () => {
    console.log("this checkbox is hiding completed todos");
      this.setState({
        hideCompletedTask: !this.state.hideCompletedTask
      })
  }
  

  // search bar form to search todos
  // make sure to add event as parameter
  // searchBarHandler = (e) => {
  //   console.log("some text is being typed");
  //   this.setState({
  //     searchBarText: e.target.value
  //   })
  // }



  render() {
    console.log("this is for singlelist");
    console.log(this.props);
    console.log(this.props.todos);

    // const { hideFinishedTodo } = this.state;

    // let filteredTodos = undefined;
    // if (hideFinishedTodo) {
    //   filteredTodos = this.props.todos.filter(todo => todo.is_complete === false);
    // } else {
    //   filteredTodos = this.props.todos;
    // }

    // const filteredTodos = this.state.hideFinishedTodo ? 
    // this.props.todos.filter(todo => todo.is_complete === false) 
    // : this.props.todos;

    // const filterTodo = this.props.todos.filter(todo => todo.name.includes(this.state.searchBarText));
    const filterTodos = this.props.todos.filter(todo => todo.is_complete === false);

    return (
      <Grid
        container
        spacing={2}
        direction="column"
        className="debug"
      >

       {/* this is code for creating a search bar to query todos */}
       {/* <>
        <form>
          <textarea
              type="text"
              placeholder="Seach todos here..."
              onChange={this.searchBarHandler} 
              >
          </textarea>
        </form>
          <p>{this.state.searchBarText}</p>
        </> */}

        {/* checkbox to hide completed todos */}
        <>
          <form>
            <input
              type="checkbox"
              name="hideTodoCheckbox"
              onClick={this.hideCompletedTodoHandler}
            />
            &nbsp;
            <label>Hide completed todo</label>
          </form>
        </>
        
        {/* <div> */}
          {/* <button onClick={this.hideTodoHandler} type="toggle" label="Toggle">Hide or unhide</button>
          <button onClick={this.hideTodoHandler}>toggle</button> */}
          {/* {this.state.hideCompletedTodo ? <div>hide or unhide</div> : null } */}
          {/* <div style={{ display: (this.state.hideCompletedTodo ? "block" : "none") }}>Hidden</div> */}
        {/* </div> */}

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

          {/* react event handlers are written in curly braces */}
          {/* hideCompletedTask = true,  hideCompletedTask = false */}
          {/* {!hideCompletedTask && <h1>hide</h1>}
          {hideCompletedTask && <h1>unhide</h1>} */}
          {!this.state.hideCompletedTask && this.props.todos.map((e, index) => {
            return (<ItemsContainer
            key={index}
            name={e.name}
            id={e.id}
            isComplete={e.is_complete}
          />
          )}
          )}
          

          {this.state.hideCompletedTask && filterTodos.map((e, index) => {
            return (<ItemsContainer
            key={index}
            name={e.name}
            id={e.id}
            isComplete={e.is_complete}
          />
          )}
          )}


         

         
          
         

          {/* {!hideFinishedTodo && this.props.todos.map((e, index) => {
            return (<ItemsContainer
            key={index}
            name={e.name}
            id={e.id}
            isComplete={e.is_complete}
            />
            )}
          )} */}

          {/* {filteredTodos.map((e, index) => {
            return (<ItemsContainer
              key={index}
              name={e.name}
              id={e.id}
              isComplete={e.is_complete}
            />
            )
          }
          )} */}

        </Grid>
      </Grid>
    )
  }
}

export default SingleList;

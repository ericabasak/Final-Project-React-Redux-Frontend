import React, { Component } from 'react';
import ItemsContainer from './ItemsContainer';
import { Grid, Button, Checkbox, TextField } from '@material-ui/core';

class SingleList extends Component {

  state = {
    name: "",
    isComplete: this.props.isComplete
  }

  // in the parameter, why is e there and not is_complete?
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

  render() {
    console.log("this is for singlelist")
    console.log(this.props);

    return (
      <Grid
        container
        spacing={2}
        direction="column"
        class="debug"
      >
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

        <Grid item xs={12} class="singleListContainer">
          {this.props.todos.map((e, index) =>
          (<ItemsContainer
            key={index}
            name={e.name}
            id={e.id}
            isComplete={e.isComplete}
          />
          ))}
        </Grid>
      </Grid>
    )
  }
}

export default SingleList;

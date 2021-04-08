import React, { Component } from 'react';
import { Button, Checkbox } from '@material-ui/core';
import { Grid } from '@material-ui/core';

class Items extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isComplete: this.props.isComplete
    }
  }

  checkboxHandler = (e) => {
    console.log("the the checkbox is being called for an item")
    this.setState({ isComplete: !this.state.isComplete }, () => {
      this.props.updateItemCheckbox(
        this.props.id,
        this.props.token,
        this.state.isComplete
      );
    });
  }

  deleteHandlerItem = (e) => {
    console.log("the delete is being clicked");
    this.state.isComplete = false;
    this.props.deleteTodoItem(
      this.props.id,
      this.props.token
    );
  }

  render() {
    console.log("this is for items")
    console.log(this.props);
    console.log(this.state)

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        className="todoItem"
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={8}>
              <Checkbox
                name="isComplete"
                type="checkbox"
                color="default"
                checked={this.state.isComplete}
                onChange={this.checkboxHandler}
              />
              <span
                style={{ textDecoration: this.state.isComplete ? "line-through" : "" }}>
                {this.props.name}
              </span>
            </Grid>
            <Grid item xs={4}>
              <Button onClick={this.deleteHandlerItem}
                type="submit"
                color="secondary"
                size="small"
                label="Delete">Delete</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default Items;
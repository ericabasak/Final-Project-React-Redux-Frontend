import React, { Component } from 'react';
import Items from './Items';
import { Button, Checkbox, TextField } from '@material-ui/core';

class SingleList extends Component {
  state = {
    is_complete: this.props.is_complete
  }

  updateListStatus = (e) => {
    console.log("the the checkbox is being called for list")
    this.setState({ is_complete: !this.state.is_complete}, () =>
    this.props.updateListStatus(this.props.id, this.state.is_complete) 
    )
  }

  render() {
    return (
      <div>
        <h2>
          <Checkbox
            name="is_complete"
            type="checkbox"
            color="default"
            checked={this.state.is_complete}
            onChange={this.updateListStatus}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <span style={{ textDecoration: this.state.is_complete ? "line-through" : "" }}>
            {this.props.name}
          </span>
        </h2>
        <div>
          <form onSubmit={this.props.handleSubmit} style={{ display: 'flex' }}>
            <TextField
              label="Add todo item"
              type="text"
              name="name"
              value={this.props.value}
              onChange={this.props.onChange}
            />
            <br></br>
            <br></br>
            <Button type="submit" label="Submit">Enter</Button>
          </form>
        </div>

        {this.props.items.map((e, index) => 
        (<Items
          key={index}
          name={e.name}
          id={e.id}
          is_complete={e.is_complete}
        />
        ))}
      </div>
    )
  }
}

export default SingleList;

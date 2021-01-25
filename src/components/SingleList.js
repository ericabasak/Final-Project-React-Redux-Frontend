import React, { Component } from 'react';
import Items from './Items';
import { Button, Checkbox, TextField } from '@material-ui/core';

class SingleList extends Component {

  render() {
    return (
      <div>
            <h2>
              <Checkbox
                name="is_complete"
                type="checkbox"
                color="default"
                onChange={this.props.checkboxHandlerList}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <div style={{textDecoration: this.props.is_complete ? "line-through" : "" }}>
                {this.props.name} 
                {/* {this.props.id} */}
              </div>
            </h2>
            <h4> Items </h4>
            <div>
              <form onSubmit={this.props.handleSubmit} style={{ display: 'flex' }}>
                <TextField
                  label="Add todo item"
                  type="text"
                  name="name"
                  value={this.props.onSubmitname}
                  onChange={this.props.onChange}
                />
                <br></br>
                <br></br>
                <Button type="submit" label="Submit">Enter</Button>
              </form>
            </div>
            
                  {this.props.items.map((e, index) => (<Items
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

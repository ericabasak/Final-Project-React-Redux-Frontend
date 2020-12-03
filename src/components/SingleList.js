import React, { Component } from 'react';
import Items from './Items';
import { Button, Checkbox, TextField, Grid, Paper, Box } from '@material-ui/core';
import { fetchTodoItems, fetchIsComplete } from '../actions/index';
import { connect } from 'react-redux';

class SingleList extends Component {

  state = {
    todoItems: [],
    name: "",
    is_complete: false
  }

  // retrieve all items from the backend
  componentDidMount() {
    this.props.fetchDataTodoItems(this.props.id);
  }

  onChange = (e) => {
    this.setState({ name: e.target.value });
  }

  // create a item associated to a list
  handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/items", {
      method: "POST",
      headers:
      {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: this.state.name,
        list_id: this.props.id,
        is_complete: false
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
    this.listTodo(this.state.name);
    this.setState({
      name: "",
      is_complete: false
    });
  }

  listTodo = (name) => {
    const newItem = {
      name,
      is_complete: false
    }
    this.setState({ 
      name: [
        ...this.state.name, 
        newItem
      ] 
    });
  }

  handleCheckbox = (e) => { 
    console.log("this box is clicked")
    // console.log(e.target.checked)
    this.setState({
    is_complete: e.target.checked
    });
  }
  

  render() {
    console.log(this.state)

    // filter toditems over lists with list id
    const items = this.props.todoItems.filter(x => {
      console.log(x);
      return x.list_id === this.props.id
    });
    console.log(items)

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Paper>
          <Box>
            <h2>
              <Checkbox
                name="is_complete"
                type="checkbox"
                color="default"
                onChange={this.handleCheckbox}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <div style={{textDecoration: this.state.is_complete ? "line-through" : "" }}>
                {this.props.name} {this.props.id}
              </div>
            </h2>
            <h4> Items </h4>
            <div>
              <form onSubmit={this.handleSubmit} style={{ display: 'flex' }}>
                <TextField
                  label="Add todo item"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <br></br>
                <br></br>
                <Button type="submit" label="Submit">Enter</Button>
              </form>
            </div>
            
                  {items.map((e, index) => (<Items
                    key={index}
                    name={e.name}
                    id={e.id}
                    is_complete={e.is_complete} 
                    />
                  ))}
         
          </Box>
        </Paper>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return { 
    todoItems: state.todoItems,
    loading: state.loading,
    isComplete: state.isComplete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchDataTodoItems: (id) => dispatch(fetchTodoItems(id)),
      listCheckboxHandler: (id) => dispatch(fetchIsComplete(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleList);

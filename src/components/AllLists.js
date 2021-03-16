import React, { Component } from 'react';
import SingleListContainer from './SingleListContainer';
import { connect } from 'react-redux';
import { getLists } from '../actions/index';
import { Grid } from '@material-ui/core';

class AllLists extends Component {

  state = {
    todos: "",
    isComplete: false
  }

  componentDidMount() {
    this.props.getLists(this.props.token)
  }

  // make a fetch call to is_complete
  // making an update to item
  isCompleteHandler = (e) => {
    console.log("the the checkbox is being called for an item")
    fetch(`http://localhost:3001/api/v1/items/${this.props.id}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: this.props.id,
        isComplete: e.target.checked
      })
    })
      .then(response => {
        return response.json()
      })
      .then(r => {
        let oldTodos = this.state.todos;
        let oldTodoIndex = oldTodos.findIndex(e => e.id === r.id)
        oldTodos[oldTodoIndex] = r
        this.setState({ todos: oldTodos })
      })
  }

  isCompleteItemHandler = (e) => {
    console.log("the checkbox for the item is being clicked");
    e.preventDefault();
    this.props.isCompleteHandler(
      this.props.id
    )
  }

  render() {
    if (this.props.loading) {
      return (<div>Loading...</div>);
    }

    console.log(this.props.lists);

    return (
      <Grid
        container
        spacing={2}
        direction="column"
      >
        <Grid item xs={4} className="title">
          <h4>All Todos</h4>
        </Grid>
        <Grid item xs={12}>
          {this.props.lists && this.props.lists.map((e, index) =>
            <SingleListContainer
              key={index}
              name={e.title}
              isComplete={e.is_complete}
              id={e.id}
            />
          )}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    lists: state.lists,
    loading: state.loading,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLists: (token) => dispatch(getLists(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllLists);
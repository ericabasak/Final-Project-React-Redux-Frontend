import React, { Component } from 'react';
import SingleListContainer from './SingleListContainer';
import { connect } from 'react-redux';
import { fetchLists } from '../actions/index';

class AllLists extends Component {
  
  state = {
    lists: [],
    todos: ""
  }

  componentDidMount() {
    this.props.fetchLists(this.props.token)
  }

  // make a fetch call to is_complete
  // making an update to item
  isCompleteHandler = (e) => {
    const id = e.target.value;
    const url = `http://localhost:3001/api/v1/items/${id}`;
    fetch(url, {
      method: "PATCH",
      headers:
      {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: e.target.value,
        is_complete: e.target.checked
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
  
  render() {
    if (this.props.loading) {
      return (<div>Loading...</div>);
    }

    console.log(this.props.lists);
    return(
      <div>
        <h3>All Todos</h3>
        {this.props.lists && this.props.lists.map((e, index) => <SingleListContainer 
          key={index} 
          name={e.title} 
          id={e.id} /> 
        )}
      </div>
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
      fetchLists: (token) => dispatch(fetchLists(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllLists);
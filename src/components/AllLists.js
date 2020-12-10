import React, { Component } from 'react';
import SingleList from './SingleList';
import { connect } from 'react-redux';
import { fetchLists } from '../actions/index';

class AllLists extends Component {
  
  state = {
    lists: [],
    todos: ""
  }

  componentDidMount() {
    this.get_lists();
  }

  get_lists = () => {
    this.props.fetchData();
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
        {this.props.lists && this.props.lists.map((e, index) => <SingleList 
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
    loading: state.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: () => dispatch(fetchLists())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllLists);
import React, { Component } from 'react';
import SingleListContainer from './SingleListContainer';
import { connect } from 'react-redux';
import { getLists } from '../actions/index';
import { Grid } from '@material-ui/core';

class AllLists extends Component {

  state = {
    todos: "",
    isComplete: false,
    searchText: ""
  }

  componentDidMount() {
    this.props.getLists(this.props.token)
  }

  render() {
    if (this.props.loading) {
      return (<div>Loading...</div>);
    }

    console.log(this.props.lists);

    const { lists } = this.props
    
    const filterList = lists.filter((list) => list.title.includes(this.state.searchText))

    return (
      <Grid
        container
        spacing={2}
        direction="column"
      >
      {/* practice for the final assessment live coding session */}
     
      <>
        <form>
          <textarea
          onChange={(e) => this.setState({searchText: e.target.value})}>
          </textarea>
        </form>
        <span>{this.state.text}</span>
      </>
      
        <Grid item xs={4} className="title">
          <h4>All Todos</h4>
        </Grid>
        <Grid item xs={12}>
          { filterList && filterList.map((e, index) =>
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
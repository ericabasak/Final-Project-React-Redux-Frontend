import React, { Component } from 'react';

class SingleList extends Component {

  state = {
    lists: []
  }

  componentDidMount() {

    console.log("list items is being called")

    fetch('http://localhost:3001/api/v1/lists', {
      method: "GET",
      header: 
      {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({ lists: data })
    })
  }

  render() {
    console.log(this.props.name)
    console.log(this.state.lists)
  
    return(
      <div>
       <h2> List - {this.props.name}</h2>
       <h4> Items </h4>
       {/* fetch items for this list */}
       {this.state.lists.map(e => <li> {e.title} </li>)}
      </div>
    );
  }
}

export default SingleList;
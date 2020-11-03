import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';

class SingleList extends Component {

  state = {
    items: [],
    name: "",
    is_complete: false
  }

  // console.log("list items is being called")
  // retrieve all items from the backend
  // console.log(this.props);
  componentDidMount() {
    let result = fetch(`http://localhost:3001/api/v1/lists/${this.props.id}`, 
    {method: "GET"})
    result.then(r => r.json())
    .then(data => {
      console.log(data);
      this.setState({ items: data })
    })
  }

  onChange = (e) => {
    // console.log(e.target.value);
    this.setState({ name: e.target.value });
  }

  // create a item associated to a list
  handleSubmit = (e) => {
    console.log("inside handleSubmit")
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/items", {
      method: "POST",
      headers:
      {
        "Accept": "application/json",
        "Content-Type": "application/json"
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
      id: uuidv4(),
      name,
      is_complete: false
    }
    this.setState({ name: [...this.state.name, newItem] });
  }

  listHandleCheckboxChange = () => {
    this.setState({ is_complete: !this.state.is_complete })
  }

  // list is complete checkbox handler
  listCheckboxHandler = (e) => {
    console.log("is the listcheckboxhandler being called???")
    fetch(`http://localhost:3001/api/v1/lists/${this.props.id}`, {
      method: "PATCH",
      header: 
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        list: {
          name: this.state.name,
          is_complete: e.target.checked
          }
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }
  
  render() {
    // console.log(this.props)
    // console.log(this.state.lists)
  
    return(
      <div>
       <h2> 
         
         <input onClick={this.listCheckboxHandler}
          name="is_complete"
          type="checkbox"
          checked={this.state.is_complete}
          onChange={this.listHandleCheckboxChange}
         />
         
         &nbsp;

         List &nbsp; - &nbsp; {this.props.name} {this.props.id} &nbsp; 
         
        </h2>
       <h4> Items </h4>
        <div>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex' }}>
            <label>
              Add a to do:
              <input
                type="text"
                name="name"
                style={{ flex: '10', padding: '10px' }}
                placeholder="enter to do here"
                value={this.state.name}
                onChange={this.onChange}
              />
            </label>
            <br></br>
            <input
              type="submit"
              value="submit"
              className="btn"
              style={{flex: '1'}}
            />
          </form>
        </div>
          {this.state.items.map((e, index) => (<TodoItem 
            key={index} 
            name={e.name} 
            id={e.id}
            is_complete={e.is_complete} />
          ))}
      </div>
    )
  }
}


export default SingleList;
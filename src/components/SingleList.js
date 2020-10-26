import React, { Component } from 'react';

class SingleList extends Component {

  state = {
    items: [],
    name: ""
  }

  componentDidMount() {
    // console.log("list items is being called")
    // retrieve all items from the backend
    console.log(this.props);
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

  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   fetch("http://localhost:3001/api/vi/items", {
  //     header: "POST",
  //     method: 
  //     {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       name: this.state.name,
  //       is_complete: false
  //     })
  //   }).then(response => response.json())
  //   .then(data => console.log(data));

  //   this.props.singleList(this.props.name);
  //   this.setState({
  //     name: "",
  //     is_complete: false
  //   });
  // }

  onSubmit = (e) => {
    e.preventDefault();

    // console.log(this.state)
    // console.log(this.state.singleList)

    this.props.singleList(this.state.name);
    this.setState({ name: "" });
  }


  render() {
    // console.log(this.props)
    // console.log(this.state.lists)
  
    return(
      <div>
       <h2> List - {this.props.name}</h2>
       <h4> Items </h4>

        <div>
          <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
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

       {this.state.items.map((e, index) => <li key={index}> {e.name} </li>)}
            
      </div>
    );
  }
}

export default SingleList;
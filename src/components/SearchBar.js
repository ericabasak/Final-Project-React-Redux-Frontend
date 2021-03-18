import React, { Component } from 'react';
import SearchField from 'react-search-field';


class SearchBar extends Component {
  
  state = {
    searchText: "",
    searchResults: []
  }


  onChange(e){
    console.log("the search bar is being used")
    this.setState({
      searchText: e.target.value
    });
  }

  render() {
    return (
      <div>
        <SearchField
          classNames="test-class"
          placeholder="Search..."
          onChange={this.onChange}
          searchText="search item"
        />  
      </div>
    )
  }
}

export default SearchBar;
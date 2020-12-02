import React, { Component } from 'react';
import ListForm from './ListForm';
import AllLists from './AllLists';

class MainComponent extends Component {

  render() {
    return (
      <div>
        <ListForm />
        <AllLists />
      </div>
    )
  }
}

export default MainComponent;

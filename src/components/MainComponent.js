import React, { Component } from 'react';
import ListForm from './ListForm';
import AllLists from './AllLists';
import { connect } from 'react-redux';

class MainComponent extends Component {

  render() {
    console.log(this.props);

    if (!this.props.user.username) {
      // redirect to login
      this.props.history.push("/userloginform");
    }

    return (
      <div>
        <ListForm />
        <AllLists />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    user: state.user,
  };
};
 
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);


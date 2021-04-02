import React, { Component } from 'react';
import ListForm from './ListForm';
import AllLists from './AllLists';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class MainComponent extends Component {
  
  render() {
    // console.log(this.props);
    if (!this.props.user.username) {
      // redirect to login
      // this.props.history.push("/userloginform");
      return <Redirect to="/userloginform" />
    }

    return (
      <div>
        <ListForm token={this.props.token} />
        <AllLists />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    user: state.user,
    token: state.token
  };
};
 
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);



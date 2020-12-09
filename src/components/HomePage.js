import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/index';
// import { Typography, Button } from '@material-ui/core'

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: '100vh',
//     backgroundImage: `url(image4.jpg)`,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     postion: 'static'
//   }
// }));

class HomePage extends Component {

  state = {
    username: "",
    email: ""
  }

  componentDidMount() {
    this.getCurrentUser();
  }


  // understand this inside and out
  // know basics of react
  // know state 
  getCurrentUser = () => {
    fetch('http://localhost:3001/api/v1/get_current_user', {
      method: 'GET',
      headers: 
      {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.user) {
      this.setState({
        username: data.user.username,
        email: data.user.email
      })
      }
    })
  }

  render() {
    return (
      <div style={{ textAlign: "center", padding: "90px" }}>
        <h2>Organize your life with TodoApp</h2>
        {this.state.username &&
          <h4>Welcome, {this.state.username}</h4>
        }

        {!this.state.username &&
          <h5>You are not currently logged in</h5>}
          {/* <Typography>
            <Button onClick={() => this.props.history.push("/userloginform")}>Login</Button>
            &nbsp;
            or
            &nbsp;
            <Button onClick={() => this.props.history.push("/usersignupform")}>Sign up</Button> 
          </Typography> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    loading: state.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => dispatch(fetchCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@material-ui/core';
import { connect } from 'react-redux';

// class Nav extends Component {
function Nav(props) {
  // DO THIS --
  // auth token passed in every function and store in redux instead of local storage
  // redux for state
  // render() {
    return (
      <div>
        <AppBar 
          postion="static"
            style={{
              postion: "static",
              backgroundColor: "#bcaaa4", 
              color: "#484030",
              boxShadow: "0px 0px 0px 0px"
            }}>
          <Toolbar>
            <IconButton edge="start" aria-label="menu">
              </IconButton>
                <Typography variant="h2" padding="20px">
                  Todo App
                </Typography> 
                &nbsp;
                <Box color="primary" padding={2} position="right">
                  <Link to="/homepage">Home</Link>
                </Box>
                &nbsp;

                {props.token && <Box color="primary" padding={2} position="right">
                  <Link to="/">Lists</Link>
                  </Box>}
          </Toolbar>
        </AppBar>
      </div>      
    );
  // }
}

const mapStatetoProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStatetoProps, mapDispatchToProps)(Nav);
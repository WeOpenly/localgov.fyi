import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import UserList from './UserList';
import UserDetail from './UserDetail';

const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
});

class OneIndex extends Component {
  constructor(props) {
    super(props);
  }



  render() {
  
    const { classes } = this.props;

    return (
        <Router>
            <UserList path="/users" />
            <UserDetail path="/users/:userId" />
    </Router>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.admOneUserReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(OneIndex));
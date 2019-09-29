import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  subscribeForUsers,
  unsubscribeForUsers,
  setUserDetail
} from "./actions";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";



const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  progress: {
    margin: theme.spacing(2)
  },
  table: {
    minWidth: 650
  },
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  }
});

 
class UserList extends Component {
  constructor(props) {
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick(rowData) {
      const userId = rowData.uid;
      const {dispatch} = this.props;
   
      dispatch(setUserDetail(rowData));
      navigate(`/dashboard/one/user/${userId}`, {uid: userId});
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(subscribeForUsers());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(unsubscribeForUsers());
  }

  render() {
    const { fetching, items, failure } = this.props;
    const { classes } = this.props;


    if (fetching) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Selected Plan</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Payment Setup Done</TableCell>
                  <TableCell align="right">Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(row => (
                  <TableRow onClick={() => this.onRowClick(row)} key={row.uid}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.selectedPlan}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.paymentSetupDone}</TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.admOneUserReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(UserList));

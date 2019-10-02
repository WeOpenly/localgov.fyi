import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import {
  subscribeForSers, unsubscribeForSers
} from './serActions';

import {
  subscribePackageItems,
  unsubscribePackageItems,
  createPackageDetail
} from "./packActions";

const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  progress: {
    margin: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
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

class PackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false
    };
    this.onRowClick = this.onRowClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.newSerFieldEdit = this.newSerFieldEdit.bind(this);
    this.onNewSubmit = this.onNewSubmit.bind(this);
  }

  newSerFieldEdit(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onRowClick(rowData) {
    const pid = rowData.pid;
    const { dispatch } = this.props;

    navigate(`/dashboard/one/packages/${pid}`);
  }

  onAddClick() {
    this.setState({
      showAdd: !this.state.showAdd
    });
  }

  onNewSubmit() {
    const { dispatch } = this.props;

    dispatch(createPackageDetail(this.state.pid, this.state.name, {}, []));
    this.onAddClick();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(subscribePackageItems());
    dispatch(subscribeForSers());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(unsubscribePackageItems());
    dispatch(unsubscribeForSers());
  }

  render() {
    const { fetching, items, failure } = this.props;
    const { classes } = this.props;
    
    console.log(this.props);

    if (fetching) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={this.onAddClick}
            className={classes.button}
          >
            Add package
          </Button>
          <Dialog
            open={this.state.showAdd}
            onClose={this.onAddClick}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add New Package</DialogTitle>
            <DialogContent>
    
              <TextField
                autoFocus
                margin="dense"
                id="pack_id"
                name="pid"
                label="Package Id"
                type="text"
                onChange={this.newSerFieldEdit}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="pack_name"
                name="name"
                label="Package Name"
                onChange={this.newSerFieldEdit}
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onAddClick} color="primary">
                Cancel
              </Button>
              <Button onClick={this.onNewSubmit} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(row => (
                  <TableRow onClick={() => this.onRowClick(row)} key={row.pid}>
                    <TableCell component="th" scope="row">
                      {row.pid}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
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
    ...state.admOnePackReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(PackList));

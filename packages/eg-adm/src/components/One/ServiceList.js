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
  subscribeForSers,
  unsubscribeForSers,
  createSerDetail
} from "./serActions";

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

 
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showAdd: false,
    }
    this.onRowClick = this.onRowClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this)
    this.newSerFieldEdit = this.newSerFieldEdit.bind(this)
    this.onNewSubmit = this.onNewSubmit.bind(this)
  }

  newSerFieldEdit(e){
      this.setState({
         [e.target.name] : e.target.value
      })
  }

  onRowClick(rowData) {
      const sid = rowData.sid;
      const {dispatch} = this.props;

      navigate(`/dashboard/one/all_services/${sid}`);
  }

  onAddClick(){
    this.setState({
        showAdd: !this.state.showAdd,
    })
  }

  onNewSubmit(){
    const {dispatch} = this.props;

    dispatch(createSerDetail(this.state.sid, this.state.name, {},[]))
    this.onAddClick()
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(subscribeForSers());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(unsubscribeForSers());
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
          <Button
            variant="contained"
            onClick={this.onAddClick}
            className={classes.button}
          >
            Add service
          </Button>
          <Dialog
            open={this.state.showAdd}
            onClose={this.onAddClick}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add New Service</DialogTitle>
            <DialogContent>
              <DialogContentText>
               Follow convention like
               SER_[FIRST_4_OF_EACH_WORD]_[PACKAGE_TYPE]_[LOC]
               eg: SER_PROP_TAX_INDIV or SER_BUS_LIC_BUS_PHX
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="ser_id"
                name="sid"
                label="Service Id"
                type="text"
                onChange={this.newSerFieldEdit}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="ser_name"
                name="name"
                label="Service Name"
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
                  <TableRow onClick={() => this.onRowClick(row)} key={row.sid}>
                    <TableCell component="th" scope="row">
                      {row.sid}
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
    ...state.admOneSerReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(UserList));

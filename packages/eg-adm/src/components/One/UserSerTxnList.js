import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";
import Container from "@material-ui/core/Container";
import { RRule, RRuleSet, rrulestr } from "rrule";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// import {
//   subscribeForUsers,
//   unsubscribeForUsers,
//   setUserDetail
// } from "./actions";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import FormHelperText from "@material-ui/core/FormHelperText";

import Dropzone from "react-dropzone";

import Button from "@material-ui/core/Button";

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

import { uploadFile } from "./actions";
import {
  createTxn,
  subscribeTxnItems,
  unsubscribeTxneItems
} from "./txnActions";

const windowGlobal = typeof window !== "undefined" && window;


const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  progress: {
    margin: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
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


const Label = ({ error, children, htmlFor, ...props }) =>
  children ? (
    <div >
      <label className={styles.formLabel} htmlFor={htmlFor}>
        {children}
      </label>
    </div>
  ) : (
    ""
  );


class UserServiceTxnList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false,
      files: [],
      uploadinProgress: false
    };
    this.onNewSubmit = this.onNewSubmit.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.newSerFieldEdit = this.newSerFieldEdit.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  componentDidMount() {
    const { dispatch, uid } = this.props;
    dispatch(subscribeTxnItems(uid));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    
  }

  onNewSubmit() {
    const { txn_id, files, txn_for_date } = this.state;
    const { uid, serId, dispatch } = this.props;
    const txnData = {
      txn_id: txn_id,
      txn_files: files,
      txn_for_date: txn_for_date
    };
    console.log(txnData, 'onNewSubmit');
    dispatch(createTxn(uid, serId, txnData));
    this.setState({
      txn_id: null,
      txn_files: null,
      txn_for_date: null
    });
    this.onAddClick();
  }

  onDrop(acceptedFiles) {
    const { uid } = this.props;
    console.log("onDrop");
    let progStep = acceptedFiles.length;
    this.setState({
      uploadinProgress: true
    });
    console.log(acceptedFiles, uid);
    acceptedFiles.forEach((file, fileIdx) => {
      const updateStates = downloadUrl => {
        console.log(downloadUrl);
        const newarr = this.state.files.concat([downloadUrl]);
        const upDone = fileIdx === acceptedFiles.length - 1;

        this.setState({
          files: newarr,
          uploadinProgress: !upDone
        });
        progStep = progStep - 1;
      };

      if (windowGlobal) {
        uploadFile(uid, file, updateStates);
      }
    });
  }

  componentDidMount() {
    const d = new Date();
    const dateStr = d.toISOString();
    const { serId } = this.props;
    this.setState({
      txn_id: `${serId}-${dateStr}`
    });
  }

  newSerFieldEdit(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onRowClick(rowData) {
    const userId = rowData.uid;
    const { dispatch } = this.props;

    // dispatch(setUserDetail(rowData));
    // navigate(`/dashboard/one/user/${userId}`, { uid: userId });
  }

  onAddClick() {
    this.setState({
      showAdd: !this.state.showAdd
    });
  }

  //   componentDidMount() {
  //     const { dispatch } = this.props;
  //     dispatch(subscribeForUsers());
  //   }

  //   componentWillUnmount() {
  //     const { dispatch } = this.props;
  //     dispatch(unsubscribeForUsers());
  //   }

  render() {
    const { fetching, items, failure } = this.props;
    const { classes, serId } = this.props;

    if (fetching) {
      return <CircularProgress className={classes.progress} />;
    }
 

    let txnList = []
    let txnNextDatesList = [];
    if (items[serId] && items[serId].txns){
      txnList = items[serId].txns;
      let txnMeta = items[serId].metadata;
      if (txnMeta){

        const rrule = new RRule({
          freq: RRule[txnMeta["freq"]],
          interval: parseInt(txnMeta["every"]),
          dtstart: new Date(txnMeta["start"]),
          until: new Date(txnMeta["until"])
        });
        
     
  
        const txnNextDates = rrule.between(
          new Date(Date.now()),
          new Date(txnMeta["until"])
        );
        
        txnNextDatesList = txnNextDates.map((date, i) => (
          <MenuItem value={date}> {date.toISOString()}</MenuItem>
        ));
      }
    }

    let dispSelectedTxnDate = "";
    if (this.state.txn_for_date){
      dispSelectedTxnDate = new Date(this.state.txn_for_date).toUTCString();
    }
    console.log(dispSelectedTxnDate);
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={this.onAddClick}
            className={classes.button}
          >
            Add txn
          </Button>
          <Dialog
            maxWidth="md"
            open={this.state.showAdd}
            onClose={this.onAddClick}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add New Txn</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="txn_id"
                name="txn_id"
                value={this.state.txn_id}
                label="Txn Id"
                type="text"
                onChange={this.newSerFieldEdit}
                fullWidth
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="for-date">For Date</InputLabel>
                <Select
                  value={dispSelectedTxnDate}
                  name="txn_for_date"
                  id="txn_for_date"
                  onChange={this.newSerFieldEdit}
                  inputProps={{
                    name: "txn_for_date",
                    id: "for-date"
                  }}
                >
                  {txnNextDatesList}
                </Select>
              </FormControl>
              <Dropzone onDrop={this.onDrop} multiple>
                {({
                  getRootProps,
                  getInputProps,
                  isDragActive,
                  isDragReject,
                  rejectedFiles
                }) => (
                  <div {...getRootProps()}>
                    <Grid item xs={12}>
                      <div style={{ margin: "0 0 0 0" }}>Upload the file</div>

                      <div
                        style={{
                          display: "flex",
                          marginTop: "8px",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",

                          borderRadius: "10px",
                          cursor: "pointer"
                        }}
                      >
                        <div
                          className={styles.textGray}
                          style={{
                            margin: "16px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                          }}
                        >
                          <div>
                            <span
                              style={{
                                fontSize: "1.1rem"
                              }}
                            />
                          </div>
                          <div>
                            {!isDragActive &&
                              "Click here or drop a file to upload"}
                            {isDragReject && "File type not accepted, sorry!"}
                          </div>
                        </div>
                        <input {...getInputProps()} />
                      </div>
                    </Grid>
                  </div>
                )}
              </Dropzone>
              {this.state.files.length > 0 &&
                this.state.files.map((fileUrl, idx) => (
                  <div
                    key={`attachment-${idx}`}
                    style={{ margin: "4px 0", cursor: "pointer" }}
                  >
                    <a target="_blank" href={fileUrl}>
                      <span
                        className={`${styles.label} ${styles.labelSecondary}`}
                        style={{ background: "#fff" }}
                      >
                        {serId} {idx + 1}
                      </span>{" "}
                    </a>
                  </div>
                ))}
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
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Receipt File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {txnList.map(row => (
                  <TableRow onClick={() => this.onRowClick(row)} key={row.uid}>
                    <TableCell component="th" scope="row">
                      {row.txn_id}
                    </TableCell>
                    <TableCell align="right">{Date(row.addedAt)}</TableCell>
                    <TableCell align="right">{row.txn_files}</TableCell>
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
    ...state.admOneUserSerTxnReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(UserServiceTxnList));

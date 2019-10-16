import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormHelperText from "@material-ui/core/FormHelperText";
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

import {subscribeTxnItems} from './txnActions'

import UserSerTxnList from "./UserSerTxnList";


const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  progress: {
    margin: theme.spacing(2)
  },
  card: {
    marginTop: theme.spacing(2),
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  pos: {
    marginBottom: 12
  },
  button: {
    margin: theme.spacing(1)
  }
});

class UserServiceDetail extends Component {
  constructor(props) {
    super(props);
    var d1 = new Date();
    var d2 = new Date(
      d1.getUTCFullYear(),
      d1.getUTCMonth(),
      d1.getUTCDate(),
      d1.getUTCHours(),
      d1.getUTCMinutes(),
      d1.getUTCSeconds()
    );

    this.state = {
      every: 1,
      freq: null,
      start: d2,
      until: d2,
      comments: '',
      nextDue: '',
      expanded: false,
    };

    this.addFreqData = this.addFreqData.bind(this);
    this.changeFreq = this.changeFreq.bind(this);
    this.changeUntil = this.changeUntil.bind(this);
    this.changeEvery = this.changeEvery.bind(this);
    this.changeStart = this.changeStart.bind(this);
    this.changeComments = this.changeComments.bind(this);
    this.expand = this.expand.bind(this);
  }

  expand(){
    this.setState({
      expanded: !this.state.expanded
    })
  }

  componentDidMount(){
    const {uid, dispatch} = this.props;
    dispatch(subscribeTxnItems(uid));
  }

  changeComments(ev){
    this.setState({
      comments: ev.target.value,
    })
  }

  changeFreq(freq) {
    this.setState({
      freq: freq.target.value
    });
  }

  changeUntil(until) {

    this.setState({
      until: until
    });
  }

  changeEvery(ev) {

    this.setState({
      every: ev.target.value
    });
  }

  changeStart(start){
    this.setState({
      start: start
    });
  }

  addFreqData() {
    const {service} = this.props;
    const data = this.state;
    delete data['expanded'];
    this.props.onMetaSubmit(service.sid, data);
  }


  componentWillReceiveProps(nextProps){
    const { items, service } = this.props;
    if (items[service.sid] !== nextProps.items[service.sid]) {
     
      const { metadata } = nextProps.items[service.sid];
      const d1 = new Date(metadata.start);
      const d1start = new Date(
        d1.getUTCFullYear(),
        d1.getUTCMonth(),
        d1.getUTCDate(),
        d1.getUTCHours(),
        d1.getUTCMinutes(),
        d1.getUTCSeconds()
      );
      const d2 = new Date(metadata.until);
      const d2start = new Date(
        d2.getUTCFullYear(),
        d2.getUTCMonth(),
        d2.getUTCDate(),
        d2.getUTCHours(),
        d2.getUTCMinutes(),
        d2.getUTCSeconds()
      );

      this.setState({
        every: metadata.every,
        freq: metadata.freq,
        start: d1start,
        until: d2start,
        nextDue: new Date(metadata.nextDue).toDateString(),
        comments: metadata.comments
      });
    }
  }

  render() {
    const { service, classes, fetching, items, failed  } = this.props;

    // if (fetching) {
    //   return <CircularProgress className={classes.progress} />;
    // }


    const canSubmit =
      this.state.every &&
      this.state.freq &&
      this.state.start &&
      this.state.until &&
      this.state.comments;

    return (
      <ExpansionPanel expanded={this.state.expanded} onChange={this.expand}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{service.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {service.id}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {service.name} submission details
                  </Typography>
                  <Typography variant="body2" component="p">
                    <pre>{JSON.stringify(service.formData, null, 2)}</pre>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              {" "}
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {service.name} transaction meta data
                  </Typography>
                  {this.state.nextDue ? (<Typography variant="h6" component="h6">
                    {this.state.nextDue} next due
                  </Typography>) : null}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-between">
                      <TextField
                        id="standard-repeats"
                        label="repeats"
                        className={classes.textField}
                        value={this.state.every}
                        onChange={this.changeEvery}
                        margin="normal"
                      />

                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="freq-simple">every</InputLabel>
                        <Select
                          value={this.state.freq}
                          onChange={this.changeFreq}
                          inputProps={{
                            name: "freq",
                            id: "freq-simple"
                          }}
                        >
                          <MenuItem value={"DAILY"}>DAILY</MenuItem>
                          <MenuItem value={"WEEKLY"}>WEEKLY</MenuItem>
                          <MenuItem value={"MONTHLY"}>MONTHLY</MenuItem>
                          <MenuItem value={"YEARLY"}>YEARLY</MenuItem>
                        </Select>
                      </FormControl>

                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-start"
                        label="Starting Date"
                        value={this.state.start}
                        onChange={this.changeStart}
                        KeyboardButtonProps={{
                          "aria-label": "change start date"
                        }}
                      />

                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Until"
                        value={this.state.until}
                        onChange={this.changeUntil}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>

                  <Grid container justify="space-around">
                    <TextField
                      id="standard-multiline-flexible"
                      label="Comments"
                      multiline
                      rowsMax="4"
                      fullWidth
                      value={this.state.comments}
                      onChange={this.changeComments}
                      className={classes.textField}
                      margin="normal"
                    />
                  </Grid>
                </CardContent>

                <CardActions disableSpacing>
                  <Button
                    disabled={!canSubmit}
                    variant="outlined"
                    href="#contained-buttons"
                    onClick={this.addFreqData}
                  >
                    Submit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12}>
              {items ? (
                <UserSerTxnList serId={service.sid} uid={this.props.uid} />
              ) : null}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.admOneUserSerTxnReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(UserServiceDetail));

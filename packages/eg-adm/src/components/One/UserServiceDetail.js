import React, { Component, Fragment } from "react";

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

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

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

class ServiceDetail extends Component {
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
      until: null,
      comments: ''
    };

    this.addFreqData = this.addFreqData.bind(this);
    this.changeFreq = this.changeFreq.bind(this);
    this.changeUntil = this.changeUntil.bind(this);
    this.changeEvery = this.changeEvery.bind(this);
    this.changeStart = this.changeStart.bind(this);
    this.changeComments = this.changeComments.bind(this);
  }


  componentDidMount(){
    const { metadata } = this.props.service;
    if(metadata){
      this.setState({
        every: metadata.every,
        freq: metadata.freq,
        start: new Date(metadata.start.seconds),
        until: new Date(metadata.until.seconds),
        comments: metadata.comments
      })
    }
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
    console.log('until', until);
    this.setState({
      until: until
    });
  }

  changeEvery(every) {
    this.setState({
      every: every.target.value
    });
  }

  changeStart(start){
    console.log(start);
    this.setState({
      start: start
    });
  }

  addFreqData() {
    const {service} = this.props;
    this.props.onMetaSubmit(service.sid, this.state);
  }

  render() {
    const { service, classes } = this.props;
    const canSubmit =
      this.state.every &&
      this.state.freq &&
      this.state.start &&
      this.state.until &&
      this.state.comments;

    return (
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
            {service.name}
          </Typography>
          <Typography variant="body2" component="p">
            <pre>{JSON.stringify(service.formData, null, 2)}</pre>
          </Typography>

          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Set Transaction details
          </Typography>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
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
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Comments
          </Typography>
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
    );
  }
}

export default withStyles(styles)(ServiceDetail);

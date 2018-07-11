import React, { Component, Fragment } from 'react';
import Spinner from 'react-spinkit';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import MoodBad from '@material-ui/icons/MoodBad';

import withRoot from '../withRoot';
import {trackInput} from "./Search/tracking";

const styles = theme => ({
  wrapper: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 30,
    left: -230,
    height: 280,
    width: 332,
    zIndex: 10,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    borderTop : `6px solid ${theme.palette.primary["500"]}`,
  },
  bootstrapInput: {
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '300px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
  bootstrapInputComment:{
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '300px',
    height: '100px',
    'wordBreak': 'break-word',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
  },
  afterSubmit: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    color: theme.palette.primary['500'],
  },
  icon: {
    color: theme.palette.primary['500'],
    fontSize: 32,
    marginBottom: theme.spacing.unit * 2,
  },
});

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: '',
      comment: '',
      submitting: false,
      success: false,
      failure: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    const { trackFeedback} = this.props;
    
    let currentLoc = '';
    if (window.location && window.location.pathname){
        currentLoc = window.location.pathname
    }
    e.preventDefault();

    this.setState({ submitting: true });
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encode({
        "form-name": "feedback-form",
        "path": currentLoc,
        "feedback-comment" : this.state.comment,
        "email": this.state.email,
      })
    }).then(() => this.setState({
      submitting: false,
      success: true,
    })).catch(error => this.setState({
      submitting: false,
      failure: true,
    }));

    trackFeedback();
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleReset() {
    this.setState({
      submitting: false,
      success: false,
      failure: false,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      open,
      comment,
      email,
      submitting,
      success,
      failure,
    } = this.state;
    

    return (
      <div className={classes.wrapper}>
        <Typography onClick={this.handleClick} style={{cursor: 'pointer'}}> Send feedback</Typography>
        {open && <Paper className={classes.paper}>
          {(!success && !failure && !submitting) && <Fragment>
            <Typography variant="title" component="h1">
              Share your feedback
            </Typography>
            <form
              name="feedback-form"
              method="post"
              action="/"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={this.handleSubmit}
            >
              <input type="hidden" name="form-name" value="feedback-form" />
              <p hidden>
                <label>
                  Don’t fill this out:{" "}
                  <input name="bot-field" onChange={this.handleChange} />
                </label>
              </p>
              <p hidden>
                <label>
                  Don’t fill this out:{" "}
                  <input name="path" value=""/>
                </label>
              </p>
              <label>
                <textarea
                  name="feedback-comment"
                  type="text"
                  placeholder="Your comments"
                  value={comment}
                  onChange={this.handleChange}
                  rows={4}
                  className={classes.bootstrapInput}
                />
              </label>
              <label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={this.handleChange}
                  className={classes.bootstrapInput}
                />
              </label>
              <Typography variant="caption">*We won't send you spam</Typography>
              <Button size="small" variant="outlined" type="submit" className={classes.button}>
                Submit
              </Button>
              <Button size="small" onClick={this.handleClose} className={classes.button}>Cancel</Button>
            </form>
          </Fragment>}
          {submitting && <div className={classes.afterSubmit}>
            <Spinner className={classes.spinner}/>
          </div>}
          {success && <div className={classes.afterSubmit}>
            <SvgIcon className={classes.icon}>
              <path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/>
              <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </SvgIcon>
            <Typography variant="body1" component="h1">Thanks for your feedback!</Typography>
            <Button size="small" variant="outlined" onClick={this.handleClose} className={classes.button}>Close</Button>
          </div>}
          {failure && <div className={classes.afterSubmit}>
            <MoodBad className={classes.icon}/>
            <Typography variant="body1" >Something went wrong. Please try again.</Typography>
            <Button size="small" variant="outlined" onClick={this.handleReset} className={classes.button}>Back</Button>
          </div>}
        </Paper>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trackFeedback: () => {
      dispatch(trackInput('feedback_form', ''));
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnFeedback = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(Feedback)));

export default ConnFeedback;

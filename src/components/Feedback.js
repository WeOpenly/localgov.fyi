import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import MoodBad from '@material-ui/icons/MoodBad';
import CircularProgress from '@material-ui/core/CircularProgress';

import {trackInput} from "./common/tracking";

const styles = theme => ({
  feedback_wrapper: {
    position: 'relative',
  },
feedback_paper : {
    position: 'absolute',
    top: 30,
    left: -230,
    height: 280,
    width: 332,
    zIndex: 10,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    borderTop : `6px solid ${theme.palette.primary["500"]}`,
  },
feedback_bootstrapInput : {
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing(1),
    width: '100%',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
feedback_bootstrapInputComment : {
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing(1),
    width: '100%',
    height: '100px',
    'wordBreak': 'break-word',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
feedback_button : {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
feedback_afterSubmit : {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
feedback_spinner : {
    color: theme.palette.primary['500'],
  },
feedback_icon : {
    color: theme.palette.primary['500'],
    fontSize: 32,
    marginBottom: theme.spacing(2),
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
      feedbackComment: '',
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
        "form-name": "feedback",
        "path": currentLoc,
        "feedbackComment": this.state.feedbackComment,
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
      feedbackComment,
      email,
      submitting,
      success,
      failure,
    } = this.state;
    

    return (
      <div className={classes.feedback_wrapper}>
        <Typography onClick={this.handleClick} style={{cursor: 'pointer'}}> Send feedback</Typography>
        {open && <Paper className={classes.feedback_paper}>
          {(!success && !failure && !submitting) && <Fragment>
            <Typography varant="h6" component="h1">
              Share your feedback
            </Typography>
            <form
              name="feedback"
              method="post"
              action="/"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={this.handleSubmit}
            >
              <input type="hidden" name="form-name" value="feedback" />
              <p hidden>
                <label>
                  Don’t fill this out:{" "}
                  <input name="bot-field" onChange={this.handleChange} />
                </label>
              </p>
              <p hidden>
                <label>
                  Don’t fill this out:{" "}
                  <input name="path" type="text" value=""/>
                </label>
              </p>
              <label>
                <textarea
                  name="feedbackComment"
                  type="text"
                  placeholder="Your comments"
                  value={feedbackComment}
                  onChange={this.handleChange}
                  rows={4}
                  className={classes.feedback_bootstrapInput}
                />
              </label>
              <label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={this.handleChange}
                  className={classes.feedback_bootstrapInput}
                />
              </label>
              <Typography variant="caption">*We won't send you spam</Typography>
              <Button size="small" variant="outlined" type="submit" className={classes.feedback_button}>
                Submit
              </Button>
              <Button size="small" onClick={this.handleClose} className={classes.feedback_button}>Cancel</Button>
            </form>
          </Fragment>}
          {submitting && <div className={classes.feedback_afterSubmit}>
            <CircularProgress size={18} />
          </div>}
          {success && <div className={classes.feedback_afterSubmit}>
            <SvgIcon className={classes.feedback_icon}>
              <path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/>
              <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </SvgIcon>
            <Typography variant="body1" component="h1">Thanks for your feedback!</Typography>
            <Button size="small" variant="outlined" onClick={this.handleClose} className={classes.feedback_button}>Close</Button>
          </div>}
          {failure && <div className={classes.feedback_afterSubmit}>
            <MoodBad className={classes.feedback_icon}/>
            <Typography variant="body1" >Something went wrong. Please try again.</Typography>
            <Button size="small" variant="outlined" onClick={this.handleReset} className={classes.feedback_button}>Back</Button>
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
)(withStyles(styles)(Feedback));

export default ConnFeedback;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import MoodBad from '@material-ui/icons/MoodBad';
import Spinner from 'react-spinkit';

import withRoot from '../withRoot';
import { trackClick, trackInput } from "./Search/tracking";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit
  },
  media: {
    minWidth: "100px",
    minHeight: "100px",
    backgroundPosition: "center",
    borderRadius: "50%",
    boxShadow: `0 0 2px 1px ${theme.palette.primary["50"]}`
  },
  mediaContainer: {
    paddingTop: theme.spacing.unit * 2,
    borderRadius: 3,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 0 0 0`,
    border: `1px solid ${theme.palette.primary['50']}`,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginBottom: theme.spacing.unit,
  },
  paper: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    // borderTop : `6px solid ${theme.palette.primary["500"]}`,
    backgroundColor: theme.palette.primary['500'],
  },
  title: {
    color: theme.palette.common.white,
  },
  satisfiedDialog: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: 300,
  },
  bootstrapInput: {
    borderRadius: 3,
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '300px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
  bootstrapInputComment:{
    borderRadius: 3,
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '300px',
    height: '100px',
    'wordBreak': 'break-word',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
  dialogButton: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    backgroundColor: theme.palette.common.white,
  },
  dialogButton2: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    color: theme.palette.common.white,
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
  bodyText: {
    color: theme.palette.common.white,
  },
});

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class ServiceDeliveryLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectClicked: false,
      feedbackOpen: false,
      showSatisfied: true,
      satisfied: null,
      email: '',
      feedbackComment: '',
      submitting: false,
      success: false,
      failure: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleGood = this.handleGood.bind(this);
    this.handleBad = this.handleBad.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleClick(name, url, index) {
    const {trackClick} = this.props;
    const windowGlobal = typeof window !== 'undefined' && window
    trackClick('external', 'service_delivery_link', url, name, index);
    this.setState({
      redirectClicked: true,
    }, () => {
      setTimeout(() => windowGlobal.open(url) , 1000); 
      setTimeout(() => {
        this.setState({ redirectClicked: false, feedbackOpen: true, })
      }, 2000);
    });
  }

  handleGood() {
    const { trackFeedback} = this.props;
    let currentLoc = '';
    if (window.location && window.location.pathname) {
      currentLoc = window.location.pathname
    }
    this.setState({
      feedbackOpen: false,
      showSatisfied: false,
      satisfied: true,
      submitting: true,
    });

    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encode({
        "form-name": "feedback",
        "path": currentLoc,
        "satisfied": this.state.satisfied,
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

  handleBad() {
    this.setState({
      showSatisfied: false,
      satisfied: false,
    });
  }

  handleClose() {
    this.setState({ feedbackOpen: false });
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
        "satisfied": this.state.satisfied,
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

  handleReset() {
    this.setState({
      submitting: false,
      success: false,
      failure: false,
    });
  }

  render() {
    const {classes, serDelLinks, org_name, service_name} = this.props;
    const {
      feedbackOpen,
      showSatisfied,
      feedbackComment,
      email,
      submitting,
      success,
      failure,
    } = this.state;
    if (!serDelLinks) {
      return null;
    }

    if (serDelLinks.length === 0) {
      return null;
    }

    const serButtons = serDelLinks.map((link, idx) => {
      return (
        <Button
          key={link.link_name}
          onClick={() => this.handleClick(link.link_name, link.url, idx)}
          variant="raised"
          color="primary"
          className={classes.button}>
          {this.state.redirectClicked ? (<Spinner name="ball-beat" color="white" />)  : `${link.link_name}` }
        </Button>
      );
    });

    return (
      <Fragment>
        {serButtons}
        {this.state.redirectClicked
          ? (
            <Typography variant="caption" gutterBottom>
              <i>Redirecting to </i> {org_name}'s {service_name} page
            </Typography>
          )
          : null}
        <Dialog
          open={feedbackOpen}
          onClose={this.handleClose}
        >
          <Paper className={classes.paper}>
            {showSatisfied && <div className={classes.satisfiedDialog}>
              <Typography variant="display1" component="h1" className={classes.title}>
                How was your experience with Localgov?
              </Typography>
              <Button
                onClick={this.handleGood}
                variant="raised"
                type="submit"
                className={classes.dialogButton}
              >
                Good so far!
              </Button>
              <Button
                onClick={this.handleBad}
                variant="raised"
                type="submit"
                className={classes.dialogButton}
              >
                It could have been better.
              </Button>
            </div>}
            {(!showSatisfied && !success && !failure && !submitting) && <Fragment>
              <Typography variant="display1" component="h1" className={classes.title}>
                How are we doing?
              </Typography>
              <form
                name="feedback"
                method="post"
                action="/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
                className={classes.form}
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
                <Button size="small" variant="raised" type="submit" className={classes.dialogButton}>
                  Submit
                </Button>
                <Button size="small" onClick={this.handleClose} className={classes.dialogButton2}>Cancel</Button>
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
              <Typography variant="body1" className={classes.bodyText}>Thanks for your feedback!</Typography>
              <Button size="small" onClick={this.handleClose} className={classes.dialogButton}>Close</Button>
            </div>}
            {failure && <div className={classes.afterSubmit}>
              <MoodBad className={classes.icon}/>
              <Typography variant="body1" className={classes.bodyText}>Something went wrong. Please try again.</Typography>
              <Button size="small" onClick={this.handleReset} className={classes.dialogButton}>Back</Button>
            </div>}
          </Paper>
        </Dialog>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trackClick: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex));
    },
    trackFeedback: () => {
      dispatch(trackInput('feedback_form', ''));
    },
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnServiceDeliveryLink = connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(ServiceDeliveryLink)));

export default ConnServiceDeliveryLink;
import React, { Component, Fragment } from 'react';
import Spinner from 'react-spinkit';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import MoodBad from '@material-ui/icons/MoodBad';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';

import withRoot from '../withRoot';
import {trackInput} from "./Search/tracking";
import { toggleNotifyDialog } from './Search/actions.js';


const styles = theme => ({
  bootstrapInput: {
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '100%',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
  bootstrapInputComment:{
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '100%',
    height: '100px',
    'wordBreak': 'break-word',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
buttonContainer : {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
  },
  afterSubmit: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.unit* 4,
  },
formWrapper:{
  marginTop: theme.spacing.unit * 2,
  marginLeft: theme.spacing.unit * 4,
marginRight: theme.spacing.unit * 4,
  marginBottom: theme.spacing.unit * 5,
},
  spinner: {
    color: theme.palette.primary['500'],
  },
  sepDiv:{
    textAlign: 'center',
    paddingTop: theme.spacing.unit*2,
    paddingBottom: theme.spacing.unit*2,
  },
  sepSpan:{
    
  },
  feedbackText:{
    margin: theme.spacing.unit*2,
  },
  icon: {
    color: theme.palette.primary['500'],
    fontSize: 32,
    marginBottom: theme.spacing.unit,
  },
});

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class ServiceNotifyDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      submitting: false,
      success: false,
      failure: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleReset = this.handleReset.bind(this);
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
        "form-name": "serviceNotify",
        "path": currentLoc,
        "ser_name":  this.props.ser_name,
        "org_id": this.props.org_id,
        "phone": this.state.phone,
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
    this.props.closeNotifyDialog();
  }

  handleReset() {
    this.setState({
      submitting: false,
      success: false,
      failure: false,
    });
  }

  render() {
    const { classes, ser_name, org_id } = this.props;
    const {showNotifyDialog} = this.props.search;

    const {
      phone,
      email,
      submitting,
      success,
      failure,
    } = this.state;
    
    return (
      <Dialog open={showNotifyDialog} onClose = {this.handleClose} aria-labelledby = "service-notify-dialog-title"> 
        {(!success && !failure && !submitting) &&  (<DialogTitle id="service-notify-dialog-title">
        
         <Typography variant="display2" component="h1">
           Get notfied about {ser_name}
          </Typography>
      </DialogTitle>)}

        {(!success && !failure && !submitting) && <div className={classes.formWrapper}>
         
          <form
            name="serviceNotify"
            method="post"
            action="/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            <input type="hidden" name="form-name" value="serviceNotify" />
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="path" type="text" value="" />
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="org_id" type="text" value="" />
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="ser_name" type="text" value="" />
              </label>
            </p>
            <label>
              <input
                name="phone"
                type="tel"
                placeholder="your phone number"
                value={phone}
                onChange={this.handleChange}
                className={classes.bootstrapInput}
              />
            </label>
            <div className={classes.sepDiv}><span className={classes.sepSpan}
            >
              <Typography variant="caption" component="h1">
OR
              </Typography></span></div>
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
            <div className={classes.buttonContainer}> 
              <Button size="small" variant="outlined" type="submit" className={classes.button}>
                Notify me
              </Button>
              <Button size="small" onClick={this.handleClose} className={classes.button}>Cancel</Button>
            </div>
         
          </form>
        </div>}
        {submitting && <div className={classes.afterSubmit}>
          <Spinner className={classes.spinner} />
        </div>}
        {success && <div className={classes.afterSubmit}>
          <SvgIcon className={classes.icon}>
            <path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z" />
            <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
          </SvgIcon>
          <Typography className={classes.feedbackText} variant="body1" component="h1">Thank you, we will notify you!</Typography>
          <Button size="small" variant="outlined" onClick={this.handleClose} className={classes.button}>Close</Button>
        </div>}
        {failure && <div className={classes.afterSubmit}>
          <MoodBad className={classes.icon} />
          <Typography className={classes.feedbackText} variant="body1" >Something went wrong. Please try again.</Typography>
          <br/>
          <Button size="small" variant="outlined" onClick={this.handleReset} className={classes.button}>Back</Button>
        </div>}
    </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trackFeedback: () => {
      dispatch(trackInput('service_notify_form', ''));
    },
    closeNotifyDialog: () => {
      dispatch(toggleNotifyDialog(false));
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

const ConnServiceNotifyDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(ServiceNotifyDialog)));

export default ConnServiceNotifyDialog;

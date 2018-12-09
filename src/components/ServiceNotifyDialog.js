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
import Done from '@material-ui/icons/Done';
import AlarmOn from '@material-ui/icons/AlarmOn';
import List from '@material-ui/icons/List';
import AutoRenew from '@material-ui/icons/AutoRenew';

import withRoot from '../withRoot';
import {trackInput} from "./common/tracking";
import { toggleNotifyDialog } from './Search/actions';


const styles = theme => ({
service_notify_dialog_bootstrapInput : {
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit *3,
    width: '100%',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
  listItem: {
    display: 'flex',
    margin: theme.spacing.unit * 2,
  },
service_notify_dialog_bootstrapInputComment : {
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit*2,
    width: '100%',
    height: '100px',
    'wordBreak': 'break-word',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
service_notify_dialog_title:{
  width: '420px',
  textAlign: 'center'
},
service_notify_dialog_buttonContainer : {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
  },
service_notify_dialog_afterSubmit : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.unit* 4,
  },
service_notify_dialog_formWrapper : {
  marginTop: theme.spacing.unit * 2,
  marginLeft: theme.spacing.unit * 4,
marginRight: theme.spacing.unit * 4,
  marginBottom: theme.spacing.unit * 5,
},
service_notify_dialog_spinner : {
    color: theme.palette.primary['500'],
  },
service_notify_service_name:{
  paddingLeft: 4,
  paddingRight: 4,
  textTransform: 'lowercase',
  fontWeight: 400,
},
service_notify_icon:{
  marginRight: theme.spacing.unit *2,
},
service_notify_dialog_sepDiv : {
    textAlign: 'center',
    paddingTop: theme.spacing.unit*2,
    paddingBottom: theme.spacing.unit*2,
  },
  sepSpan:{
    
  },
service_notify_dialog_feedbackText : {
    margin: theme.spacing.unit*2,
  },
service_notify_dialog_icon : {
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
      email,
      submitting,
      success,
      failure,
    } = this.state;
    
    return (
      <Dialog open={showNotifyDialog} className={classes.service_notify_dialog_dialog} onClose = {this.handleClose} aria-labelledby="service-notify-dialog-title"> 
        {(!success && !failure && !submitting) && (<DialogTitle id="service-notify-dialog-title" className={classes.service_notify_dialog_title} >
        
       
      </DialogTitle>)}

        {(!success && !failure && !submitting) && <div className={classes.service_notify_dialog_formWrapper}>
          <Typography style={{paddingBottom: 16}} variant="subheading" align='center' component="h1">
            Get notified from LocalGov
          </Typography>

            <div className={classes.listItem}>
            <AlarmOn className={classes.service_notify_icon} /><Typography variant="body1" component="span">When you're next due to </Typography> <span className={classes.service_notify_service_name}>{ser_name} </span>
            </div>
            <div className={classes.listItem}>
            <List className={classes.service_notify_icon} /><Typography variant="body1">If there are any additional updates about this service</Typography>
            </div>
            <div className={classes.listItem}>
            <AutoRenew className={classes.service_notify_icon} /><Typography variant="body1">When similar services are added to localgov.fyi </Typography>
            </div>
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
                required
                name="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={this.handleChange}
                className={classes.service_notify_dialog_bootstrapInput}
              />
            </label>

            <Typography align="center" style={{'paddingTop': 
            8}} variant="caption">We promise to not spam you!</Typography>
            <div className={classes.service_notify_dialog_buttonContainer}> 

              <Button size="small" variant="outlined" type="submit" className={classes.service_notify_dialog_button}>
                Keep me updated
              </Button>
              <Button size="small" onClick={this.handleClose} className={classes.service_notify_dialog_button}>Cancel</Button>

            </div>
         
          </form>
        </div>}
        {submitting && <div className={classes.service_notify_dialog_afterSubmit}>
          <Spinner className={classes.service_notify_dialog_spinner} />
        </div>}
        {success && <div className={classes.service_notify_dialog_afterSubmit}>
          <SvgIcon className={classes.service_notify_dialog_icon}>
            <path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z" />
            <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
          </SvgIcon>
          <Typography className={classes.service_notify_dialog_feedbackText} variant="body1" component="h1">Thank you, we will notify you!</Typography>
          <Button size="small" variant="outlined" onClick={this.handleClose} className={classes.service_notify_dialog_button}>Close</Button>
        </div>}
        {failure && <div className={classes.service_notify_dialog_afterSubmit}>
          <MoodBad className={classes.service_notify_dialog_icon} />
          <Typography className={classes.service_notify_dialog_feedbackText} variant="body1" >Something went wrong. Please try again.</Typography>
          <br/>
          <Button size="small" variant="outlined" onClick={this.handleReset} className={classes.service_notify_dialog_button}>Back</Button>
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
)(withStyles(styles)(ServiceNotifyDialog));

export default ConnServiceNotifyDialog;

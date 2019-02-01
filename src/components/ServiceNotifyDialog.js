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
import AutoRenew from '@material-ui/icons/Autorenew';

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
  }



  render() {
 
    return null
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



export default ServiceNotifyDialog;

import React, {Component, Fragment} from 'react';
import Spinner from 'react-spinkit';
import {connect} from "react-redux";

import Link from 'gatsby-link';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import MoodBad from '@material-ui/icons/MoodBad';

import withRoot from '../withRoot';
import {trackInput} from "../components/common/tracking";

const styles = theme => ({
  wrapper: {
display : 'flex',
flexDirection : 'column',
alignItems : 'center',
margin : theme.spacing.unit * 12,
padding : theme.spacing.unit * 4,
border : `1px solid ${theme.palette.primary['200']}`,
  },
  bootstrapInput: {
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '100%',
    transition: theme
      .transitions
      .create(['border-color', 'box-shadow'])
  },
  bootstrapInputComment: {
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '100%',
    height: '100px',
    'wordBreak': 'break-word',
    transition: theme
      .transitions
      .create(['border-color', 'box-shadow'])
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  afterSubmit: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    color: theme.palette.primary['500']
  },
  icon: {
    color: theme.palette.primary['500'],
    fontSize: 48,
    margin: theme.spacing.unit * 6
  },
header : {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.common.white,
  color: theme.palette.primary['700'],
  boxShadow: `0 0 0 0 ${theme.palette.common.white}`,
  borderBottom: `1px solid ${theme.palette.primary['50']}`
},
link : {
  textDecoration: 'none'
},
title : {
  padding: theme.spacing.unit * 2
},

heading : {
  marginBottom: theme.spacing.unit * 5
},
card : {
  height: 'auto',
  boxShadow: '0 0 0 0',
  paddingTop: theme.spacing.unit * 2,
  paddingLeft: theme.spacing.unit * 2,
  paddingRight: theme.spacing.unit * 2,
  paddingBottom: theme.spacing.unit * 3,
  border: `1px solid ${theme.palette.primary['200']}`
},
listItem : {
  display: 'flex',
  margin: theme.spacing.unit *2
},
icon : {
  marginRight: theme.spacing.unit
},
cardActions : {
  marginBottom: theme.spacing.unit * 2
},
buttonWrapper : {
  width: '100%',
  paddingLeft: theme.spacing.unit,
  paddingRight: theme.spacing.unit
},
gov : {
  padding: theme.spacing.unit*2,
}
});

const encode = (data) => {
  return Object
    .keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class ClainReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      agency: '',
      submitting: false,
      success: false,
      failure: false
    };
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.handleClose = this
      .handleClose
      .bind(this);
    this.handleReset = this
      .handleReset
      .bind(this);
  }


  handleChange(e) {
    console.log("here");
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    const {trackFeedback} = this.props;

    let currentLoc = '';
    if (window.location && window.location.pathname) {
      currentLoc = window.location.pathname
    }
    e.preventDefault();

    this.setState({submitting: true});
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encode({"form-name": "claim-request", "path": currentLoc, "agency": this.state.agency, "email": this.state.email, "name": this.state.name})
    }).then(() => this.setState({submitting: false, success: true})).catch(error => this.setState({submitting: false, failure: true}));

    trackFeedback();
  }

  handleClose() {
    this.setState({open: false});
  }

  handleReset() {
    this.setState({submitting: false, success: false, failure: false});
  }

  render() {
    const {classes} = this.props;
    const {
      name,
      email,
      agency,
      submitting,
      success,
      failure
    } = this.state;

    return (
      <Fragment>
        <AppBar className={classes.header}>
          <Link to="/" className={classes.link}>
            <Typography variant="display1" color="inherit" className={classes.title}>
              Localgov.fyi
            </Typography>
          </Link>
          <Typography variant="headline" color="primary">
           |
          </Typography>
          <Typography variant="headline" className={classes.gov} color="primary">
           Government Agencies
          </Typography>
        </AppBar>
        <div className={classes.wrapper}>
          <Typography variant="display1" className={classes.heading}>
            Claim your LocalGov Page
          </Typography>
          {(!success && !failure && !submitting) && <Fragment>
            <form
              name="claim-request"
              method="post"
              action="/"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={this.handleSubmit}>
              <input type="hidden" name="form-name" value="claim-request"/>
              <p hidden>
                <label>
                  Don’t fill this out:{" "}
                  <input name="bot-field" onChange={this.handleChange}/>
                </label>
              </p>
              <p hidden>
                <label>
                  Don’t fill this out:{" "}
                  <input name="path" type="text" value=""/>
                </label>
              </p>
              <label>
                 <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={this.handleChange}
                  className={classes.bootstrapInput}/>
              </label>
            
              <label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={this.handleChange}
                  className={classes.bootstrapInput}/>
              </label>
                <label>
                 <input
                  name="agency"
                  type="text"
                  placeholder="Agency name"
                  value={agency}
                  onChange={this.handleChange}
                  className={classes.bootstrapInput}/>
              </label>

              <Button
                size="small"
                variant="outlined"
                type="submit"
                className={classes.button}>
                Submit
              </Button>
              <Button size="small" onClick={this.handleClose} className={classes.button}>Cancel</Button>
            </form>
          </Fragment>
        }
        {
          submitting && <div className={classes.afterSubmit}>
            <Spinner className={classes.spinner}/>
          </div>
        }
        {
          success && <div className={classes.afterSubmit}>
              <SvgIcon className={classes.icon}>
                <path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/>
                <path
                  d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </SvgIcon>
              <Typography variant="title" component="h1">Thanks, we will reach out to you soon</Typography>
            <Link to="/" className={classes.link}>
            <Typography variant="caption" color="inherit" className={classes.title}>
              Back to Localgov.fyi
            </Typography>
          </Link>
            </div>
        }
        {
          failure && <div className={classes.afterSubmit}>
            <MoodBad className={classes.icon}/>
            <Typography variant="body1">Something went wrong. Please try again.</Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={this.handleReset}
              className={classes.button}>Back</Button>
          </div>
        }
        </div>
</Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trackFeedback: () => {
      dispatch(trackInput('claim_form', ''));
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnClainReq = connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(ClainReq)));

export default ConnClainReq;

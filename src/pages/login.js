import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, submit} from 'redux-form';
import Link from 'gatsby-link';
import {isMobileOnly} from 'react-device-detect';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoginForm from '../components/Account/LoginForm';
import {toggleAccountForm, handleLoginRequest, handleRegisterRequest, setEmailVertificationRequired} from '../components/Account/actions';
import withRoot from '../withRoot';
// import { register } from '../../actions/authentication';

const styles = theme => ({
  "@global": {
    html: {
      WebkitFontSmoothing: "antialiased", // Antialiasing.
      MozOsxFontSmoothing: "grayscale", // Antialiasing.
      height: "100%",
      overflow: 'hidden'
    },
    body: {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      overflowWrap: "break-word",
      overflowY: "scroll",
      overflowX: "hidden"
    },
    "body>div": {
      display: "block",
      height: "100%"
    },
    "body>div>div": {
      display: "block",
      height: "100%"
    }
  },
  login_accountContainer: {
    height: '100%'
  },
  login_accountRight: {
    height: '100%',
    display: 'flex',
    padding: theme.spacing.unit*4,
    boxShadow: `0 1px 2px 0 ${theme.palette.primary['100']}`,
  },
  login_accountLeft: {
    height: '100%',
    color: '#fff',
   padding : theme.spacing.unit * 8,
    backgroundImage: `linear-gradient(to left bottom, #6f47ff, #5d38f2, #4829e4, #3017d7, #0000ca)`
  },
  login_accountLeft_mob:{
     color: '#fff',
     backgroundImage: `linear-gradient(to left bottom, #6f47ff, #5d38f2, #4829e4, #3017d7, #0000ca)`
  },
  login_loginFormContainer: {
    alignSelf: 'center'
  },
  login_loginAccountCreate:{
    paddingBottom: theme.spacing.unit,
  },
login_accountText : {
  alignSelf: 'center'
},
login_loginFormContainer : {
  alignSelf: 'center'
},
login_loginFormContainer_mob:{
        textAlign: 'center',
        padding: theme.spacing.unit*2,
},
login_accountTextHeadline : {
  color: '#fff',
  paddingBottom: theme.spacing.unit * 2
},
login_accountBenefits : {
  paddingTop: theme.spacing.unit*2,
  paddingBottom: theme.spacing.unit*2,
},
login_benefit_head : {
  color: '#fff'
},
login_benefit_sub : {
  color: '#f1f1f1'
},
login_loginAccountCreate : {
  paddingBottom: theme.spacing.unit
}
});

class LoginIn extends Component {
  constructor(props) {
    super(props);
    
  }

  handleLoginRequest = (values) => {
    return handleLoginRequest(values)
  }

  render() {
    const {classes} = this.props;
    const title = (
      <Fragment>
        <Typography variant="headline" color="default">
          Login to your account
        </Typography>

         <Typography className={classes.login_loginAccountCreate} variant="caption" color="default">
                <Link to="/signup/">
                  <span>Create an account instead</span>
                </Link>
              </Typography>
      </Fragment>
    )

    const noMobileLogin = (
      <Fragment>
        <Grid container className={classes.login_accountContainer} spacing={0}>
          <Grid item xs={8}>
            <Grid container className={classes.login_accountLeft_mob}>
                <div className={classes.login_accountText}>
                                {/* <div className={classes.login_accountTextHeader}>
                                    <Typography variant="display1" className={classes.login_accountTextHeadline}>
                                        Localgov.fyi
                                    </Typography>
                                </div> */}
                                <div className={classes.login_accountBenefits}>
                                    <Typography variant="display1" className={classes.login_benefit_head}>
                                        Find all your gov services
                                    </Typography>
                                    <Typography variant="body1" className={classes.login_benefit_sub}>
                                        We do the work of putting all your gov services online with just a couple of
                                        clicks
                                    </Typography>
                                </div>
                                 <div className={classes.login_accountBenefits}>
                                    <Typography variant="display1" className={classes.login_benefit_head}>
                                       Get notified at the right time
                                    </Typography>
                                    <Typography variant="body1" className={classes.login_benefit_sub}>
                                      We will send you a reminder when it is time for a service
                                    </Typography>
                                </div>
                            </div>
            </Grid>
          </Grid>
          <Grid item xs={4} className={classes.login_accountRight}>
            <div className={classes.login_loginFormContainer}>
              <LoginForm titleComponent={title} onSubmit={this.handleLoginRequest}/>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    )
    const mobileLogin = (<Fragment>
                <Grid container className={classes.login_accountContainer} spacing={0}>
                    <Grid item xs={12} className={classes.login_accountLeft_mob} align="center">
            
                                <Typography variant="display1" style={{padding: 48, color:'#fff'}}>
                                    Localgov.fyi
                                </Typography>
                         
                
                                <Typography variant="headline" style={{color:'#fff'}} >
                                    Find all your gov services
                                </Typography>
                                <Typography variant="caption"  style={{padding: 16, color:'#fff'}}>
                                    We do the work of putting all your gov services online with just a couple of
                                    clicks
                                </Typography>
                    
                            
                                <Typography variant="headline" style={{color:'#fff'}} >
                                    Get notified at the right time
                                </Typography>
                                <Typography variant="caption" style={{padding: 16, color:'#fff'}}>
                                    We will send you a reminder when it is time for a service
                                </Typography>
        
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.login_loginFormContainer_mob}>
                         <LoginForm titleComponent={title} onSubmit={this.handleLoginRequest}/>
                        </div>
                    </Grid>
                </Grid>
            </Fragment>);
     return (isMobileOnly ? mobileLogin : noMobileLogin)
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...state,
    ...ownProps
  }
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(LoginIn)));

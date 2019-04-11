import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {navigate} from '@reach/router';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import Feedback from '../components/Feedback';
import withRoot from '../withRoot';


const styles = theme => ({
  container: {
  },
  header: {
    color: theme.palette.primary['700'],
    background: theme.palette.common.white,
    boxShadow: `0 0 10px 5px ${theme.palette.primary["A200"]}`,
  },
  headerMobile: {
    width: 'auto',
    color: theme.palette.primary['700'],
    background: theme.palette.common.white,
    boxShadow: `0 0 10px 5px ${theme.palette.primary["A200"]}`,
    marginLeft: theme.spacing.unit * -2,
    marginRight: theme.spacing.unit * -2,
  },
  logo:{
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: theme.spacing.unit * 2,
  },
  title: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 6,
  },
  headline: {
    marginBottom: theme.spacing.unit * 3,
  },
  body: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Privacy extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar position="static" className={!isMobileOnly ? classes.header : classes.headerMobile}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={3} style={{'cursor': 'pointer'}} onClick={() => navigate('/') }>
              <Typography variant="display1" color="inherit" component="h1" className={classes.logo}>
                evergov
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} className={classes.right}>
              {/* <Feedback /> */}
            </Grid>
          </Grid>
        </AppBar>
        <Grid container className={classes.container}>
          <Grid item md={1}/>
          <Grid item md={10}>
            <Typography align="left" variant="headline" className={classes.title}>
              Privacy Policy
            </Typography>
          </Grid>
          <Grid item md={1}/>
          <Grid item md={1}/>
          <Grid item md={10}>
            <Typography variant="subheading" className={classes.headline}>What, how, and why:</Typography>
            <Typography className={classes.body} gutterbottom>
              We track user interactions such as, searches, suggestion clicks, page views, and external link clicks, browser fingerprint, type of browser, type of device, and ip address.
            </Typography>
            <Typography className={classes.body} gutterbottom>
              We use these data points to understand anonymized user interactions with multiple components. This data helps us to understand searches that didn’t perform well, and to fine tune the user experience on a regular basis.
            </Typography>
            <Typography className={classes.body} gutterbottom>
              All of the data we track is for internal purposes only, and we plan to keep it so.
            </Typography>
          </Grid>
          <Grid item md={1}/>
        </Grid>
      </Fragment>
    );
  }
}

Privacy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Privacy));

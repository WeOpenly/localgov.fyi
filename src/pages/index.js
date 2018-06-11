import React from 'react';
import PropTypes from 'prop-types';

import {navigateTo} from 'gatsby-link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import Search from '../components/Search/index';

const styles = theme => ({
  "@global": {
    html: {
      background: theme.palette.common.white,
      WebkitFontSmoothing: "antialiased", // Antialiasing.
      MozOsxFontSmoothing: "grayscale", // Antialiasing.
      height: "100%"
    },
    body: {
      margin: 0,
      padding: 0,
      height: "100vh",
      width: "100%",
      overflowWrap: "break-word",
      overflowY: "scroll",
      overflowX: "hidden"
    },
    "body>div": {
      display: "block",
      height: "100%",
    },
    "body>div>div": {
      display: "block",
      height: "100%",
    }
  },
  floatingButton: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  searchBoxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  landingSearchHeader: {
    marginTop: theme.spacing.unit * 12,
    display: "flex",
    alignItems: "end",
    justifyContent: "left",
    color: theme.palette.primary["700"]
  },
  appHeaderText: {
    color: theme.palette.primary["900"]
  },
  appSubHeaderText: {
    marginBottom: theme.spacing.unit * 3
  },
  appNameHeader: {
    display: "flex",
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 1,
    flexWrap: "wrap"
  },
  root: {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  footer: {
    width: "100%",
    textAlign: "fixed",
    position: "absolute",
    padding: theme.spacing.unit * 1,
    background: theme.palette.primary["A300"],
    bottom: 0
  },
});

//  if search/ or otherwise, have box in the layout unless it is index.html
// if index > do not have it in the layout
// all ways get from the url

class Index extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0} className={classes.landingSearch}>
          <Grid item xs={1} sm={2} md={3} />
          <Grid item xs={6} sm={6} md={5} className={classes.appNameHeader}>
            <Typography align="center" variant="display1" component="span" className={classes.appHeaderText}>
              Localgov.fyi
            </Typography>
            &nbsp;
          </Grid>
          <Grid item xs={4} sm={2} md={1} className={classes.langSelectHeader}>

          </Grid>
          <Grid item xs={1} sm={2} md={3} />
          <Grid item xs={1} sm={2} md={3} />
          <Grid item xs={10} sm={8} md={6}>
            <Typography align="left" variant="body2" component="p" className={classes.appSubHeaderText}>
              Search for local government organizations, members, and services
            </Typography>
          </Grid>
          <Grid item xs={1} sm={2} md={3} />
          <Grid item xs={1} sm={2} md={3} />
          <Grid item xs={10} sm={10} md={6} className={classes.searchBoxContainer}>
            <Search />
          </Grid>
          <Grid item xs={1} sm={2} md={3} />
        </Grid>
        <div>
        </div>
        <div className={classes.footer}>
          <span onClick={() => navigateTo('/about')}>
            <Typography variant="caption" align="center" color="primary">
              About
            </Typography>
          </span>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));

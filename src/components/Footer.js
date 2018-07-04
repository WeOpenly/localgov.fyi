import React, { Component } from 'react';
import Link from 'gatsby-link';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withRoot from '../withRoot';

const styles = theme => ({
  footer: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  copyright: {
    marginRight: theme.spacing.unit,
  },
  copyrightMobile: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing.unit,
  },
  item: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing.unit,
  },
  privacy: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing.unit,
  },
  link: {
    textDecoration: 'none',
  },
  a: {
    color: 'rgba(30, 30, 50,0.87)',
  },
});


class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={0} md={1} />
        <Grid item xs={11} md={10}>
          <footer className={classes.footer}>
            <Grid container className={classes.container}>
              <Grid item xs={12} md={6} className={isMobileOnly ? classes.copyrightMobile : classes.copyright}>
                  <Typography>
                    Made by <a href="https://weopenly.com" className={classes.a}>Openly</a>
                  </Typography>
              </Grid>
              <Grid item xs={12} md={2} className={classes.item}>
              </Grid>
              <Grid item xs={12} md={1} className={classes.item}>
                <Link to="/terms/" className={classes.link}>
                  <Typography>Terms</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} md={1} className={classes.privacy}>
                <Link to="/privacy/" className={classes.link}>
                  <Typography>Privacy</Typography>
                </Link>
              </Grid>
            </Grid>
          </footer>
        </Grid>
        <Grid item xs={0} md={1} />
      </Grid>
    );
  }
}

export default withRoot(withStyles(styles)(Footer));

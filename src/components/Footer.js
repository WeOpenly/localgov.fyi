import React, { Component } from 'react';
import Link from 'gatsby-link';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import withRoot from '../withRoot';

const styles = theme => ({
  footerWrapper: {
    marginTop: theme.spacing.unit * 8,
  },
  dividerWrapper: {
  },
  dividerWrapperMobile: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
  footer: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
  container: {
    // display: 'flex',
    // justifyContent: 'space-evenly',
  },
  containerMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  copyright: {
    display: 'flex',
    // marginRight: theme.spacing.unit,
  },
  item: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing.unit,
  },
  privacy: {
    display: 'flex',
    justifyContent: 'flex-end',
    // marginRight: theme.spacing.unit,
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    marginLeft: theme.spacing.unit * 10,
  },
  linkMobile: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  a: {
    // color: 'rgba(30, 30, 50,0.87)',
    color: theme.palette.primary['500'],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});


class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item  md={1} />
        <Grid item xs={12} md={10} className={classes.footerWrapper}>
          <div className={!isMobileOnly ? classes.dividerWrapper : classes.dividerWrapperMobile}><Divider /></div>
          <footer className={classes.footer}>
            {!isMobileOnly
            ? <Grid container className={classes.container}>
              <Grid item xs={12} md={6} className={classes.copyright}>
                <Typography>
                  Crafted by <a href="https://weopenly.com/?src=localgov.fyi" className={classes.a}>Openly</a>
                </Typography>
                <Link to="/about/" className={classes.link}>
                  <Typography color="primary">About</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} md={6} className={classes.privacy}>
                <Link to="/terms/" className={classes.link}>
                  <Typography color="primary">Terms</Typography>
                </Link>
                <Link to="/privacy/" className={classes.link}>
                  <Typography color="primary">Privacy</Typography>
                </Link>
              </Grid>
            </Grid>
            : <Grid container className={classes.containerMobile}>
              <Grid item xs={12}>
                <Link to="/about/" className={classes.linkMobile}>
                  <Typography color="primary">About</Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link to="/terms/" className={classes.linkMobile}>
                  <Typography color="primary">Terms</Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link to="/privacy/" className={classes.linkMobile}>
                  <Typography color="primary">Privacy</Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Crafted by <a href="https://weopenly.com/?src=localgov.fyi" className={classes.a}>Openly</a>
                </Typography>
              </Grid>
            </Grid>}
          </footer>
        </Grid>
        <Grid item  md={1} />
      </Grid>
    );
  }
}

export default withRoot(withStyles(styles)(Footer));

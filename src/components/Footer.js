import React, { Component } from 'react';
import Link from 'gatsby-link';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import withRoot from '../withRoot';

const styles = theme => ({
  footer_footerWrapper: {
    marginTop: theme.spacing.unit * 8,
  },
footer_dividerWrapper : {
  },
footer_dividerWrapperMobile : {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
footer_footer : {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
footer_container : {
    // display: 'flex',
    // justifyContent: 'space-evenly',
  },
footer_containerMobile : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
footer_copyright : {
    display: 'flex',
    // marginRight: theme.spacing.unit,
  },
footer_item : {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing.unit,
  },
footer_privacy : {
    display: 'flex',
    justifyContent: 'flex-end',
    // marginRight: theme.spacing.unit,
  },
footer_link : {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    marginLeft: theme.spacing.unit * 10,
  },
footer_linkMobile : {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
footer_a : {
    // color: 'rgba(30, 30, 50,0.87)',
    color: theme.palette.primary['500'],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  footer_grid: {

  },
});


class Footer extends Component {
  render() {
    const { classes } = this.props;
    const { page } = this.props;
    
    return (
      <Grid container className={`${page}-footer`}>
        <Grid className={classes.footer_grid} item  md={1} />
        <Grid  className={classes.footer_grid} item xs={12} md={10} className={classes.footer_footerWrapper}>
          <div  className={classes.footer_grid} className={!isMobileOnly ? classes.footer_dividerWrapper : classes.footer_dividerWrapperMobile}><Divider /></div>
          <footer className={classes.footer_footer}>
            {!isMobileOnly
            ? <Grid  className={classes.footer_grid} container className={classes.footer_container}>
              <Grid  className={classes.footer_grid} item xs={12} md={6} className={classes.footer_copyright}>
                <Typography>
                    Crafted by <a href="http://twitter.com/myevergov" className={classes.footer_a}>Evergov</a>
                </Typography>
                <Link to="/about/" className={classes.footer_link}>
                  <Typography color="primary">About</Typography>
                </Link>
              </Grid>
              <Grid  className={classes.footer_grid} item xs={12} md={6} className={classes.footer_privacy}>
                <Link to="/terms/" className={classes.footer_link}>
                  <Typography color="primary">Terms</Typography>
                </Link>
                <Link to="/privacy/" className={classes.footer_link}>
                  <Typography color="primary">Privacy</Typography>
                </Link>
              </Grid>
            </Grid>
            : <Grid  className={classes.footer_grid} container className={classes.footer_containerMobile}>
              <Grid item xs={12}>
                <Link to="/about/" className={classes.footer_linkMobile}>
                  <Typography color="primary">About</Typography>
                </Link>
              </Grid>
              <Grid  className={classes.footer_grid} item xs={12}>
                <Link to="/terms/" className={classes.footer_linkMobile}>
                  <Typography color="primary">Terms</Typography>
                </Link>
              </Grid>
              <Grid  className={classes.footer_grid} item xs={12}>
                <Link to="/privacy/" className={classes.footer_linkMobile}>
                  <Typography color="primary">Privacy</Typography>
                </Link>
              </Grid>
              <Grid  className={classes.footer_grid} item xs={12}>
                <Typography>
                    Crafted by <a href="https://twitter.com/myevergov" className={classes.footer_a}>Evergov</a>
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

export default withStyles(styles)(Footer);

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
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    paddingTop: theme.spacing.unit *2,
    paddingBottom: theme.spacing.unit * 2,
  },

footer_link : {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
footer_linkMobile : {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  footer_left_items:{
    display: 'flex',
    flex: '50%',
    justifyContent: 'space-evenly'
  },
  footer_right_items:{
    display: 'flex',
    flex: '50%',
    justifyContent: 'space-evenly'
  },
footer_a : {
    padding: theme.spacing.unit,
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
          <footer className={classes.footer_footer}>
              <div className={classes.footer_left_items}>
                  <Typography>
                    <a href="https://twitter.com/myevergov" className={classes.footer_a}>Twitter </a>
                  </Typography>
                  <Typography>
                    <a href="https://evergov.zendesk.com/hc/en-us" className={classes.footer_a}>Support</a>
                  </Typography>
                  <Link to="/locations/" className={classes.footer_linkMobile}>
                    <Typography color="primary">All Locations</Typography>
                  </Link>
              </div>
              <div className={classes.footer_right_items}>
              <Link to="/about/" className={classes.footer_link}>
                <Typography color="primary">About</Typography>
              </Link>
              <Link to="/terms/" className={classes.footer_link}>
                <Typography color="primary">Terms</Typography>
              </Link>
              <Link to="/privacy/" className={classes.footer_link}>
                <Typography color="primary">Privacy</Typography>
              </Link>
              </div>
          </footer>
    );
  }
}

export default withStyles(styles)(Footer);

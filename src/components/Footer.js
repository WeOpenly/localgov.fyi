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
footer_footer_dark:{
      display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
    padding: theme.spacing.unit *2,

    marginTop: theme.spacing.unit *7
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
  footer_a_dark:{
     padding: theme.spacing.unit,
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
footer_link_dark:{
  textDecoration: 'none',
  color: '#fff',
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
    const { page, dark } = this.props;
    
    return (
          <footer className={dark ? classes.footer_footer_dark : classes.footer_footer}>
              <div className={classes.footer_left_items}>
                  <Typography>
                    <a href="https://twitter.com/myevergov" className={dark ? classes.footer_a_dark : classes.footer_a}>Twitter </a>
                  </Typography>
                  <Typography>
                    <a href="https://evergov.zendesk.com/hc/en-us" className={dark ? classes.footer_a_dark : classes.footer_a}>Support</a>
                  </Typography>
                  <Link to="/locations/" style={{'paddingTop': 2}} className={dark ? classes.footer_link_dark : classes.footer_linkMobile}>
                      All Locations
                  </Link>
              </div>
              <div className={classes.footer_right_items}>
              <Link to="/about/" className={dark ? classes.footer_link_dark : classes.footer_link}>
                About
              </Link>
              <Link to="/terms/" className={dark ? classes.footer_link_dark : classes.footer_link}>
                Terms
              </Link>
              <Link to="/privacy/" className={dark ? classes.footer_link_dark : classes.footer_link}>
                Privacy
              </Link>
              </div>
          </footer>
    );
  }
}

export default withStyles(styles)(Footer);

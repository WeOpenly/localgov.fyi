import React, { Component } from 'react';
import Link from 'gatsby-link';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FooterNew from  './FooterNew'


const styles = theme => ({
  footer_footerWrapper: {
    marginTop: theme.spacing(8),
  },
footer_dividerWrapper : {
  },
footer_dividerWrapperMobile : {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
footer_footer : {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
footer_footer_dark:{
      display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
    padding: theme.spacing(2),

    marginTop: theme.spacing(7)
},
footer_link : {
  color: '#5627ff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
footer_linkMobile : {
color : '#5627ff',
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
  color: '#5627ff',
    padding: theme.spacing(1),
    color: theme.palette.primary['500'],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  footer_a_dark:{
     padding: theme.spacing(1),
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
    

    return (<FooterNew />);

  }
}

export default withStyles(styles)(Footer);

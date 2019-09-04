import React from 'react';
import Link from 'gatsby-link';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
   unclaimed_root: {
    position: 'absolute',
    top: 28,
    left: 24,
    zIndex: 10,
    width: 300,
    padding: theme.spacing.unit * 2,
  },
  unclaimed_rootMobile : {
    position: 'absolute',
    top: 28,
    left: -200,
    zIndex: 10,
    width: 300,
    padding: theme.spacing.unit * 2,
  },
unclaimed_heading : {
    marginBottom: theme.spacing.unit,
  },
  unclaimed_link: {
    color: theme.palette.primary['500'],
    textDecoration: 'none',
  },
});

const UnclaimedHover = ({ classes }) => {
  return null
};

export default withStyles(styles)(UnclaimedHover);

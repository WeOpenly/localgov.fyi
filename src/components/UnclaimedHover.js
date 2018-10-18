import React from 'react';
import Link from 'gatsby-link';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
  return (
<Paper className = {
  isMobileOnly
    ? classes.unclaimed_rootMobile
    : classes.unclaimed_root
} >
< Typography variant = "body1" color = "default" className = {
[classes.unclaimed_heading, classes.unclaimed_bold]
} >
        This government agency has not claimed their profile.
      </Typography>
      <Typography variant="caption" color="default">
        <Link to="/claim/" className={classes.unclaimed_link}>Claim this page</Link> <span className={classes.unclaimed_bold}>for free</span> to manage services, post updates, respond to queries, and engage with your local community.
      </Typography>
    </Paper>
  );
};

export default withStyles(styles)(UnclaimedHover);

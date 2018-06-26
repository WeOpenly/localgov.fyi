import React, { Component } from 'react';
import Link from 'gatsby-link';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import withRoot from '../withRoot';

const styles = theme => ({
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 12,
  },
  link: {
    textDecoration: 'none',
    marginLeft: theme.spacing.unit * 2,
  },
});

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <Link to="/about/" className={classes.link}>
          <Typography>About</Typography>
        </Link>
        <Link to="/terms/" className={classes.link}>
          <Typography>Terms</Typography>
        </Link>
        <Link to="/privacy/" className={classes.link}>
          <Typography>Privacy Policy</Typography>
        </Link>
      </footer>
    );
  }
}

export default withRoot(withStyles(styles)(Footer));

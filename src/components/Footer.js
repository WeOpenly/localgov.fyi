import React, { Component } from 'react';
import Link from 'gatsby-link';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Feedback from './Feedback';
import withRoot from '../withRoot';

const styles = theme => ({
  footer: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  copyright: {
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
    marginLeft: '3rem',
    marginRight: theme.spacing.unit,
  },
  link: {
    textDecoration: 'none',
  },
});

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={0} md={1} />
        <Grid item xs={10} md={10}>
          <footer className={classes.footer}>
            <Grid container className={classes.container}>
              <Grid item md={6} className={classes.copyright}>
                <Typography>Copyright © 2018 Openly Technologies, Inc.</Typography>
              </Grid>
              <Grid item xs={12} md={2} className={classes.item}>
                <Feedback />
              </Grid>
              <Grid item xs={12} md={1} className={classes.item}>
                <Link to="/about/" className={classes.link}>
                  <Typography>About</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} md={1} className={classes.item}>
                <Link to="/terms/" className={classes.link}>
                  <Typography>Terms</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} md={1} className={classes.privacy}>
                <Link to="/privacy/" className={classes.link}>
                  <Typography>Privacy Policy</Typography>
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

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withRoot from '../withRoot';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Privacy extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item md={1}/>
        <Grid item md={10}>
          <Typography align="left" variant="headline">
            Privacy Policy
          </Typography>
        </Grid>
        <Grid item md={1}/>
        <Grid item md={1}/>
        <Grid item md={10}>
          {[1,2,3,4,5].map(item => (
            <div>
            <Typography variant="subheading">{`${item}. Subheading`}</Typography>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
            </div>
          ))}
        </Grid>
        <Grid item md={1}/>
      </Grid>
    );
  }
}

Privacy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Privacy));

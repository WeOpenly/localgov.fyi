import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Helmet from "react-helmet";
import Grid from '@material-ui/core/Grid';
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import withRoot from '../withRoot';

const styles = theme => ({
  aboutContent: {
    paddingTop: theme.spacing.unit * 16
  },
  aboutContentLeft: {
    height : '100vh',
    display : 'flex',
    alignItems : 'center'
  },
  aboutContentRight: {
    background: theme.palette.primary['400'],
    height: '100vh',
    display: 'flex',
    alignItems: 'center'
  },
  getInTouchEmail: {
    color: '#fff'
  }
});

class Index extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={8} className={classes.aboutContentLeft}>
          <Grid container spacing={0}>
            <Grid item xs={1}/>
            <Grid item xs={11} className={classes.aboutContentHeader}>
              <Helmet>
                <title>{`Openly | Localgov.fyi`}
                </title>
                <meta
                  name="description"
                  content={`Openly, organizing world's governance information`}/>
              </Helmet>
              <Typography align={isMobileOnly ? `center` : `left`} variant="display1" component="p">
                Who we are
              </Typography>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={10} className={classes.aboutContentHeader}>
              <Typography align={isMobileOnly ? `center` : `left`} variant="body1" component="p">
                {`We are a team of 4 with full of fire, when fire fires the fire, fire fires you, We're not fire, we're the truth.`}
              </Typography>
            </Grid>
            <Grid item xs={1}/>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.aboutContentRight}>
          <Grid item xs={12} sm={11} className={classes.getInTouch}>
          <Typography
            align={isMobileOnly? `center`: `right`}
            variant="caption"
            component="h1"
            className={classes.getInTouchEmail}
            gutterBottom>
            leave email here
          </Typography>
          <Typography
            align={isMobileOnly ? `center` : `right`}
            variant="title"
            component="h1"
            className={classes.getInTouchEmail}
            gutterBottom>
            Get in touch
          </Typography>
          <Grid item sm={1} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Index));

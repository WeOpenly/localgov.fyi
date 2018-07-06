import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Helmet from "react-helmet";
import Grid from '@material-ui/core/Grid';
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import withRoot from '../withRoot';

import {trackView} from "../components/Search/tracking";

const styles = theme => ({
  getInTouchEmail: {
    color: '#fff'
  },
  about:{

  }
});

class About extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(trackView('about', null, null, null));
  }

  render() {
    const {classes} = this.props;

    return (
          <Grid container spacing={0} className={classes.about}>
        <Helmet>
          <title>{`Openly | Localgov.fyi`}
          </title>
          <meta
            name="description"
            content={`Openly, organizing world's governance information`} />
        </Helmet>
            <Grid item xs={1}/>
            <Grid item xs={10} className={classes.aboutContentHeader}>
                 <Typography align={isMobileOnly ? `center` : `left`} variant="display1" component="p">
                Who we are
              </Typography>
              <Typography align={isMobileOnly ? `center` : `left`} variant="body1" component="p">
                {`We are a team of 4 with full of fire, when fire fires the fire, fire fires you, We're not fire, we're the truth.`}
              </Typography>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(About));

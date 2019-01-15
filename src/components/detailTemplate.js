import React from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {isMobileOnly} from 'react-device-detect';
import Share from "./Share";
import HeaderWithSearch from './HeaderWithSearch';
import Footer from './Footer';
import withRoot from '../withRoot';

const styles = theme => ({
  default_template_root: {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  default_template_main: {
    width: '100%',
    minHeight: '100vh',
    paddingBottom: 70,
  },
default_template_mainMobile : {
    width: '100%',
    minHeight: '100vh',
    paddingBottom: 114,
  },
default_template_footer : {
    width: '100%',
    alignSelf: 'flex-end',
    marginTop: -70,
  },
default_template_footerMobile : {
    width: '100%',
    alignSelf: 'flex-end',
    marginTop: -114,
  },
});

class DetailTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.default_template_root}>
        <div className={isMobileOnly ? classes.default_template_mainMobile : classes.default_template_main}>
          <HeaderWithSearch location={this.props.location} />
          <Grid container spacing={0}>
            <Grid item xs={1} />
            <Grid item xs={10}>
              {this.props.children}
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DetailTemplate);

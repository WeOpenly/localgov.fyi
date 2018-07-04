import React from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {isMobileOnly} from 'react-device-detect';
import Share from "../components/Share";
import HeaderWithSearch from '../components/HeaderWithSearch';
import Footer from '../components/Footer';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  main: {
    width: '100%',
    minHeight: '100vh',
    paddingBottom: 70,
  },
  mainMobile: {
    width: '100%',
    minHeight: '100vh',
    paddingBottom: 158,
  },
  footer: {
    width: '100%',
    alignSelf: 'flex-end',
    marginTop: -70,
  },
  footerMobile: {
    width: '100%',
    alignSelf: 'flex-end',
    marginTop: -158,
  },
});

class DetailTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={isMobileOnly ? classes.mainMobile : classes.main}>
          <HeaderWithSearch />
          <Grid container spacing={0}>
            <Grid item xs={1} />
            <Grid item xs={10}>
              {this.props.children()}
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </div>
        <div className={isMobileOnly ? classes.footerMobile : classes.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(DetailTemplate));

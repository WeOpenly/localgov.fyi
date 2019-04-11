import React from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {isMobileOnly} from 'react-device-detect';
import Share from "./Share";
import SearchNav from './Nav/Search';
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
        height: "100%",
  },
default_template_mainMobile : {
    width: '100%',
height : "100%",
    paddingBottom: 114,
  },
  detail_template_footer : {
    borderTop: `1px solid #dcdcdc`,
    width: '100%',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  marginTop: theme.spacing.unit * 4,
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
          <SearchNav />
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

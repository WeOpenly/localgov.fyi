import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'gatsby-link';
import Helmet from "react-helmet";
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';

import withRoot from '../withRoot';
import HeaderWithSearch from '../components/HeaderWithSearch';
import { trackView } from "../components/common/tracking";

const styles = theme => ({
  header: {
    background: theme.palette.common.white,
    color: theme.palette.primary['700'],
    boxShadow: `0 0 0 0 ${theme.palette.common.white}`,
    borderBottom: `1px solid ${theme.palette.primary['50']}`
  },
  link: {
    textDecoration: 'none',
  },
  title:{
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
  },
  section1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    marginLeft: theme.spacing.unit * -2,
    marginRight: theme.spacing.unit * -2,
    // paddingTop: theme.spacing.unit * 20,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary['500'],
  },
  headline: {
    fontSize: '2.75rem',
    lineHeight: '3.5rem',
    color: theme.palette.common.white,
  },
  section2: {
    height: '100vh',
    marginLeft: theme.spacing.unit * -2,
    marginRight: theme.spacing.unit * -2,
    paddingTop: theme.spacing.unit * 30,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    background: '#fafafa',
  },
  section2Center: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.unit * 8,
    paddingRight: theme.spacing.unit * 8,
  },
  searchIcon: {
    fontSize: 128,
    marginTop: -theme.spacing.unit,
    marginRight: theme.spacing.unit * 4,
  },
  section3: {
    height: '100vh',
    marginBottom: -151,
    paddingTop: theme.spacing.unit * 30,
  },
  section3Content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  section3Text: {
    width: 400,
  },
  subheading: {
    color: theme.palette.primary['500'],
  },
  bodyText: {
    marginTop: theme.spacing.unit * 2,
    fontWeight: 400,
    lineHeight: '1.75rem',
  },
  mailTo: {
    color: theme.palette.primary['500'],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
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
      <Fragment>
        <Helmet>
          <title>{`Openly | Localgov.fyi`}
          </title>
          <meta
            name="description"
            content={`Openly, organizing world's governance information`} />
        </Helmet>
        <HeaderWithSearch />
        <div className={classes.section1}>
          <Grid container>
            <Grid item md={1} />
            <Grid item md={10}>
              <Typography
                variant="display1"
                align="center"
                className={classes.headline}
              >
                We are on a mission
              </Typography>
              <Typography
                variant="display1"
                align="center"
                className={classes.headline}
              >
                to make every government
              </Typography>
              <Typography
                variant="display1"
                align="center"
                className={classes.headline}
                gutterBottom
              >
                service accessible online.
              </Typography>
            </Grid>
            <Grid item md={1} />
          </Grid>
        </div>
        <div className={classes.section2}>
          <Grid container>
            <Grid item md={3} />
            <Grid item md={6} className={classes.section2Center}>
              <Search className={classes.searchIcon}/>
              <div>
                <Typography variant="display2" className={classes.subheading}>
                  Find your government services instantly.
                </Typography>
                <Typography variant="subheading" className={classes.bodyText}>
                  Be it individuals or businesses, we are making sense of all the government services out there and serving them on a silver platter for all.
                </Typography>
              </div>
            </Grid>
            <Grid item md={3} />
          </Grid>
        </div>
        <div className={classes.section3}>
          <Grid container>
            <Grid item md={1} />
            <Grid item md={10} className={classes.section3Content}>
              <div className={classes.section3Text}>
                <Typography variant="display2" className={classes.subheading}>
                  We are at the beginning of a long journey.
                </Typography>
                <Typography variant="subheading" className={classes.bodyText}>
                  We are a small team with a big vision to make government services delightful. We are adding more services and locations everday.
                </Typography>
                <Typography variant="subheading" className={classes.bodyText}>
                  If you haven't found anything you are looking for and want us to add them, drop us a line {<a href="mailto:team@weopenly.com" className={classes.mailTo}>here.</a>}
                </Typography>
              </div>
            </Grid>
            <Grid item md={1} />
          </Grid>
        </div>
      </Fragment>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(About)));

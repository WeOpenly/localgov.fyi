import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'gatsby-link';
import Helmet from "react-helmet";
import { isMobileOnly } from 'react-device-detect';
import Nav from '../components/Nav/Common';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import AboutIl from '../svgIcons/AboutIl.js';

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
  about_desc:{
    marginTop: theme.spacing.unit * 10,
    maxWidth: '500px',
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'center',
  },
  about_desc_mob:{
    display: 'flex',
    marginTop: theme.spacing.unit * 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.unit*2
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
  },
  mailTo: {
    color: theme.palette.primary['500'],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  about_section_1:{
    display: 'flex',
    justifyContent: 'center',
  }
  
});

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileOnly: false,
    };
    
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(trackView('about', null, null, null));
    this.setState({ isMobileOnly: isMobileOnly });
    // const script = document.createElement("script");

    // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBr4RixcEvuxgGr9EwNeiHCqUITczxvvuc&libraries=places&callback=initIndex";
    // script.async = true;
    // script.defer = true;
    // document.head.appendChild(script);
    // this.props.fetchAreaGuess();
  }

  render() {
    const {classes} = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{`About | evergov`}</title>
          <meta
            name="description"
            content={`All your government servicesin a single place`}
          />
        </Helmet>
        <Nav />
        <div className={classes.about_section_1}>
          {!this.state.isMobileOnly ? (
            <div className={classes.about_ill}>
              <AboutIl />
            </div>
          ) : null}
          <div
            className={
              this.state.isMobileOnly
                ? classes.about_desc_mob
                : classes.about_desc
            }
          >
            <Typography variant="display1" align="left">
              We are on a mission to make every government service
              accessible online.
            </Typography>

            <Typography
              variant="caption"
              align="left"
              className={classes.bodyText}
            >
              Be it individuals or businesses, we are making sense of all
              the government services out there and serving them on a silver
              platter for all.
            </Typography>
            <Typography
              variant="body1"
              align="left"
              className={classes.bodyText}
            >
              We are a small team with a big vision to make government
              services delightful. We are adding more services and locations
              everday. If you haven't found anything you are looking for and
              want us to add them, drop us a line{" "}
              {
                <a
                  href="mailto:team@weopenly.com"
                  className={classes.mailTo}
                >
                  here.
                </a>
              }
            </Typography>
          </div>
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

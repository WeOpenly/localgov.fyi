import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";


import Helmet from "react-helmet";
import {isMobileOnly} from 'react-device-detect';

import {withStyles} from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';



import IndexHero from '../components/IndexPage/Hero';

import Footer from '../components/Footer';
import { fetchAreaGuess } from "../components/IndexPage/actions";

import {trackView, trackClick} from "../components/common/tracking";
import AreaSuggestedServices from '../components/IndexPage/AreaSuggestedservices.js';
import OtherLocations from '../components/IndexPage/OtherLocations.js';


const styles = theme => ({
  "@global": {
    html: {
      WebkitFontSmoothing: "antialiased", // Antialiasing.
      MozOsxFontSmoothing: "grayscale", // Antialiasing.
      height: "100%"
    },
    body: {
      margin: 0,
      padding: 0,
      height: "100%",
      width: "100%",
      background: "#fff",
      overflowWrap: "break-word",
      overflowY: "scroll",
      overflowX: "hidden"
    },
    "body>div": {
      display: "block",
      height: "100%"
    },
    "body>div>div": {
      display: "block",
      height: "100%"
    }
  },
  index_section2: {},
  index_footer: {
    borderTop: `1px solid #${theme.palette}`,
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(4),
  },
  index_hero_suggestions_loading:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '480px'
  }
});

const SuggestBoxLoader = props => (<div style={{ display: 'flex', justifyContent: 'center' }}>
  <CircularProgress size={24} />
  </div>);


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    }
  }


  componentDidMount() {
    const {dispatch} = this.props;

    if (this.props.location.pathname === '/') {
      dispatch(trackView('index', null, null, null));
    }
    dispatch(fetchAreaGuess())
    this.setState({
      isMobile: isMobileOnly
    })
  }


  render() {
    const { classes, appReady } = this.props;

    return (

      <Fragment>

        <Helmet
          defaultTitle={`Evergov: Find All Government Services in a Single Place`}
          titleTemplate={`%s | evergov`}
        >
          <meta name="og:type" content="website" />
          <meta
            name="description"
            content={`Search and get notfied when you're due for local government services like payments of utility bill, property tax, parking citation & renewing business licence`}
          />
          <meta
            property="og:site_name"
            content={`Find All Government Services in a Single Place`}
          />

          <link
            rel="canonical"
            href={`https://evergov.com${this.props.location.pathname}`}
          />
          <meta
            property="og:url"
            content={`https://evergov.com${this.props.location.pathname}`}
          />
          <html lang="en" />
        </Helmet>

        <Grid container className={classes.index_hero}>
          {appReady ? (
            <Fragment>
              <Grid item xs={12}>
                <IndexHero location={this.props.location} />
              </Grid>
              <Grid item xs={12}>
                <AreaSuggestedServices />
              </Grid>
            </Fragment>
          ) : (
            <Grid
              item
              xs={12}
              className={classes.index_hero_suggestions_loading}
            >
              <SuggestBoxLoader />
            </Grid>
          )}
          <Grid item xs={12}>
            <OtherLocations />
          </Grid>
        </Grid>
        <div className={classes.index_footer}>
          <Footer page={this.props.location.pathname} />
        </div>

      </Fragment>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = function (state, ownProps) {
  return {
    ...state.indexPage,
    ...ownProps
  };
};

const ConnIndex = connect(mapStateToProps)(withStyles(styles, {name: 'index-styles'})(Index));

export default ConnIndex;

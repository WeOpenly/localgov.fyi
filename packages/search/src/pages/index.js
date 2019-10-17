import React, {Fragment} from 'react';
import {connect} from "react-redux";


import Helmet from "react-helmet";

import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withRoot from '../withRoot';

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
    borderTop: `1px solid #dcdcdc`,
    paddingTop: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4
  },
  index_hero_suggestions_loading:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '480px'
  }
});




class Index extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const {dispatch} = this.props;

    if (this.props.location.pathname === '/') {
      dispatch(trackView('index', null, null, null));
    }
    dispatch(fetchAreaGuess())
  }


  render() {
    const { classes, appReady } = this.props;

    return (
      <Fragment>
        <Helmet
          defaultTitle={`papergov: Find All Government Services in a Single Place`}
          titleTemplate={`%s | papergov`}
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
            href={`https://papergov.com${this.props.location.pathname}`}
          />
          <meta
            property="og:url"
            content={`https://papergov.com${this.props.location.pathname}`}
          />
          <html lang="en" />
        </Helmet>

        <Grid container className={classes.index_hero}>
          <Grid item xs={12}>
            <IndexHero isMobile={this.props.isMobile} appReady={appReady} location={this.props.location} />
          </Grid>
          <Grid item xs={12}>
            <AreaSuggestedServices isMobile={this.props.isMobile} appReady={appReady} />
          </Grid>        
          <Grid item xs={12}>
            <OtherLocations isMobile={this.props.isMobile}  />
          </Grid>
        </Grid>
        <div className={classes.index_footer}>
          <Footer isMobile={this.props.isMobile}  page={this.props.location.pathname} />
        </div>
      </Fragment>
    );
  }
}




const mapStateToProps = function (state, ownProps) {
  return {
    ...state.indexPage,
    ...ownProps
  };
};

const ConnIndex = connect(mapStateToProps)(withRoot(withStyles(styles, {name: 'index-styles'})(Index)));

export default ConnIndex;

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
import FooterNew from '../components/FooterNew';

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";



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
          defaultTitle={`Papergov: Find All Government Services in a Single Place`}
          titleTemplate={`%s | Papergov`}
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
        <div
          className={`${styles.container}`}
          style={{ background: "#f8f9fc" }}
        >
          <div className={`${styles.columns} `}>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{
                padding: "1.5rem"
              }}
            >
              <IndexHero
                isMobile={this.props.isMobile}
                appReady={appReady}
                location={this.props.location}
              />
            </div>

            <div
              className={`${styles.column} ${styles.col12}`}
              style={{
                background: "#fff",
                borderRadius: "0.8rem",
                boxShadow: "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)"
              }}
            >
              <AreaSuggestedServices
                isMobile={this.props.isMobile}
                appReady={appReady}
              />
            </div>

            <div className={`${styles.column} ${styles.col12}`}>
              <OtherLocations isMobile={this.props.isMobile} />
            </div>
          </div>
          <FooterNew />
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

const ConnIndex = connect(mapStateToProps)(Index);

export default ConnIndex;

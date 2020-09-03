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
import AllStates from '../components/IndexPage/AllStates.js';
import FooterNew from '../components/FooterNew';

import CoronaBanner from "../components/Banner/Corona";
import MediaNetAd from "../components/MediaNetAd";

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
          defaultTitle={`Papergov: Discover & Act on All Government Services Online`}
          titleTemplate={`%s | Papergov`}
        >
          <meta name="og:type" content="website" />
          <meta
            name="description"
            content={`Papergov is the leading place to discover and act on all local government services online. Be it dealing with parking tickets, property taxes, utility bills, business licenses etc., or accessing critical services like registering to vote, apply for unemployment - we got you covered! Search for services from more than 1500+ locations & more!`}
          />
          <meta
            property="og:site_name"
            content={`Discover & Act on all Government Services Online`}
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
            
            <div className={`${styles.column} ${styles.col12}`}>
              <AllStates isMobile={this.props.isMobile} />
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

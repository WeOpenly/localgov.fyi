import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";


import Helmet from "react-helmet";
import {isMobileOnly} from 'react-device-detect';

import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RelatedServiceTemplates from '../components/RelatedServiceTemplates'

import withRoot from '../withRoot';

import IndexHero from '../components/IndexPage/Hero';

import Footer from '../components/Footer';

import {trackView, trackClick} from "../components/common/tracking";
import AreaSuggestedServices from '../components/IndexPage/AreaSuggestedServices';
import OtherLocations from '../components/IndexPage/OtherLocations';

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
      background: '#fff',
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
  index_section2: {
  },
  index_footer: {
    borderTop: `1px solid #dcdcdc`,
    paddingTop: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4
  },
});



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

    this.setState({
      isMobile: isMobileOnly
    })
  }


  render() {
    const {classes} = this.props;

    return (
        <Fragment>
          <Helmet
          defaultTitle = {`Evergov: Find All Government Services in a Single Place`}
            titleTemplate={`%s | evergov`}>
            <meta name="og:type" content="website"/>
            <meta property="og:site_name" content={`Find All Government Services in a Single Place`}/>

            <link
              rel="canonical"
              href={`https://evergov.com${this.props.location.pathname}`}/>
            <meta
              property="og:url"
              content={`https://evergov.com${this.props.location.pathname}`}/>
            <html lang="en"/>
          </Helmet>

          <Grid container className={classes.index_hero}>
            <Grid item xs={12}>
              <IndexHero location={this.props.location} />
            </Grid>
            <Grid item xs={12}>
              <AreaSuggestedServices />
            </Grid>
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
    ...state,
    ...ownProps
  };
};

const ConnIndex = connect(mapStateToProps)(withRoot(withStyles(styles, {name: 'index-styles'})(Index)));

export default ConnIndex;

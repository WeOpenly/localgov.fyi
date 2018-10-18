import React, { Fragment } from "react";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import { isMobileOnly } from 'react-device-detect';
import Share from "../components/Share";
import HeaderWithSearch from '../components/HeaderWithSearch';
import Footer from '../components/Footer';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    background: theme.palette.common.white,
  },
  main: {
    width: '100%',
    // minHeight: '100vh',
    paddingBottom: 70,
  },
  mainMobile: {
    width: '100%',
    // minHeight: '100vh',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: 114,
  },
  footer: {
    width: '100%',
    alignSelf: 'flex-end',
    // marginTop: 70,
  },
  footerMobile: {
    width: '100%',
    alignSelf: 'flex-end',
    // marginTop: -114,
  },
});

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {classes} = this.props;
    let isIndexOrSearch = false;

    if (this.props.location && (this.props.location.pathname === '' || this.props.location.pathname === '/' ||this.props.location.pathname.includes('search') || this.props.location.pathname.includes('about') || this.props.location.pathname.includes('privacy'))) {
      isIndexOrSearch = true;
    }

    // const footerClass = classNames({
    //   'stickyFooterIndex': isIndexOrSearch,
    //   'stickyFooter': !isIndexOrSearch
    // });

    return (
      <div className={classes.root}>
        <div className={isMobileOnly ? classes.mainMobile : classes.main}>
          {this.props.children}
        </div>
        <div className={isMobileOnly ? classes.footerMobile : classes.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
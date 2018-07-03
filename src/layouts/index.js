import React, { Fragment } from "react";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Share from "../components/Share";
import HeaderWithSearch from '../components/HeaderWithSearch';
import Footer from '../components/Footer';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
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

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isMobile = (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    const {classes} = this.props;
    let isIndexOrSearch = false;
    console.log(this.props.location.pathname);
    if (this.props.location && (this.props.location.pathname === '' || this.props.location.pathname === '/' ||this.props.location.pathname.includes('search') || this.props.location.pathname.includes('about') || this.props.location.pathname.includes('privacy'))) {
      isIndexOrSearch = true;
    }

    // const footerClass = classNames({
    //   'stickyFooterIndex': isIndexOrSearch,
    //   'stickyFooter': !isIndexOrSearch
    // });

    return (
      <div className={classes.root}>
        <div className={isMobile ? classes.mainMobile : classes.main}>
          {this.props.children()}
        </div>
        <div className={isMobile ? classes.footerMobile : classes.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
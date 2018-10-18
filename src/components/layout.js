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
  layout_root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    background: theme.palette.common.white,
  },
  layout_main: {
    width: '100%',
    // minHeight: '100vh',
    paddingBottom: 70,
  },
  layout_mainMobile: {
    width: '100%',
    // minHeight: '100vh',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: 114,
  },
  layout_footer: {
    width: '100%',
    alignSelf: 'flex-end',
    // marginTop: 70,
  },
  layout_footerMobile: {
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
      <div className={classes.layout_root}>
        <div className={isMobileOnly ? classes.layout_mainMobile : classes.layout_main}>
          {this.props.children}
        </div>
        <div className={isMobileOnly ? classes.layout_footerMobile : classes.layout_footer}>
          <Footer page={this.props.location.pathname} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Index);
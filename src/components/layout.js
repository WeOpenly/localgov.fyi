import React, { Fragment } from "react";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {graphql} from "gatsby"
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
    paddingBottom: theme.spacing.unit*7,
  },
  layout_mainMobile: {
    width: '100%',
    // minHeight: '100vh',
  },
  layout_footer: {
    background: '#fafafa',
    width: '100%',
    marginTop: theme.spacing.unit * 4,
    // marginTop: 70,
  },
  layout_footerMobile: {
    width: '100%',
    background: '#fafafa',
    marginTop: theme.spacing.unit * 2,
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
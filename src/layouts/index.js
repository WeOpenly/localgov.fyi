import React, { Fragment } from "react";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Share from "../components/Share";
import HeaderWithSearch from '../components/HeaderWithSearch';
import Footer from '../components/Footer';
import withRoot from '../withRoot';

const styles = theme => ({
  stickyFooterIndex : {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      zIndex: 1
    },
  stickyFooter:{

  }
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

    const footerClass = classNames({
      'stickyFooterIndex': isIndexOrSearch,
      'stickyFooter': !isIndexOrSearch
    });

    return (
      <div>
            {this
              .props
              .children()}
        <div className={classes[footerClass]}>
            <Footer/>
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
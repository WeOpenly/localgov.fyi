import React from "react";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

import Share from "../components/Share";
import HeaderWithSearch from '../components/HeaderWithSearch';
import Footer from '../components/Footer';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    // width: "100%",
    // height: "100%",
    // margin: 0,
    // padding: 0
  },
  stickyFooter: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1
  }
});

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>

            {this
              .props
              .children()}
 
        <div className={classes.stickyFooter}>
          <div>
            <Footer/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
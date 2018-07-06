import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withRoot from '../withRoot';
import { trackClick } from "./Search/tracking";

const styles = theme => ({
  media: {
    minWidth: "100px",
    minHeight: "100px",
    backgroundPosition: "center",
    borderRadius: "50%",
    boxShadow: `0 0 2px 1px ${theme.palette.primary["50"]}`
  },
  mediaContainer: {
    paddingTop: 12,
    borderRadius: 3,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 0 2px 1px ${theme.palette.primary["50"]}`
  }
});

class ServiceDeliveryLink extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(name, url, index) {
    const { trackClick } = this.props;
    const windowGlobal = typeof window !== 'undefined' && window
    trackClick('external', 'service_delivery_link', url, name, index);
    windowGlobal.open(url);
  }

  render() {
    const { classes, serDelLinks } = this.props;
    if (!serDelLinks) {
      return null;
    }

    if (serDelLinks.length === 0) {
      return null;
    }
    
    const serButtons = serDelLinks.map((link, idx) => {
      return (
        <Button
          key={link.link_name}
          onClick={() => this.onClick(link.link_name, link.url, idx)}
          variant="raised"
          color="primary"
          className={classes.button}
        >
          {link.link_name}
        </Button>
      );
    });

    return (
      <Grid container spacing={8}>
        <Grid item xs={12} sm={12} md={12}>
          <Card className={classes.mediaContainer}>
            <CardContent>{serButtons}</CardContent>
          </Card>
          <br />
        </Grid>
      </Grid>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    trackClick: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex));
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnServiceDeliveryLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(ServiceDeliveryLink)));

export default ConnServiceDeliveryLink;
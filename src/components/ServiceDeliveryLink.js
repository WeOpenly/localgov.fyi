import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withRoot from '../withRoot';
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
  }

  render() {
    const { classes, serDelLinks } = this.props;
    if (!serDelLinks) {
      return null;
    }

    if (serDelLinks.length === 0) {
      return null;
    }
    const windowGlobal = typeof window !== 'undefined' && window
    const serButtons = serDelLinks.map((link, idx) => {
      return (
        <Button
          key={link.link_name}
          onClick={() => windowGlobal.open(link.url)}
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

export default withRoot(withStyles(styles)(ServiceDeliveryLink));

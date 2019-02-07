import React, { Component, Fragment } from 'react';
import Link from 'gatsby-link';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import withRoot from '../withRoot';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';
import {trackView, trackClick} from "../components/common/tracking";

const styles = theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.common.white,
    color: theme.palette.primary['700'],
    boxShadow: `0 0 0 0 ${theme.palette.common.white}`,
    borderBottom: `1px solid ${theme.palette.primary['50']}`
  },
  link: {
    textDecoration: 'none',
  },
  title:{
    padding: theme.spacing.unit * 2,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 12,
    margin: theme.spacing.unit * 2,
  },
  heading: {
    marginBottom: theme.spacing.unit * 5,
  },
  card: {
    height: 'auto',
boxShadow : '0 0 0 0',
paddingTop : theme.spacing.unit * 2,
paddingLeft : theme.spacing.unit * 2,
paddingRight : theme.spacing.unit * 2,
paddingBottom : theme.spacing.unit * 3,
border : `1px solid ${theme.palette.primary['200']}`,
  },
  listItem: {
    display: 'flex',
    margin: theme.spacing.unit *2,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  cardActions: {
    marginBottom: theme.spacing.unit * 2,
  },
  buttonWrapper: {
    width: '100%',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  button: {
    width: '100%',
    background : `${theme.palette.primary['500']}`,
  },
gov:{
  padding: theme.spacing.unit*2
}
});

class Claim extends Component {
  constructor(props) {
      super(props);
  }


  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar className={classes.header}>
          <Link to="/" className={classes.link}>
            <Typography variant="display1" color="inherit" className={classes.title}>
              evergov
            </Typography>
          </Link>
          <Typography variant="headline" color="primary">
           |
          </Typography>
          <Typography variant="headline" className={classes.gov} color="primary">
           Government Agencies
          </Typography>
        </AppBar>
        <div className={classes.wrapper}>
          <Typography variant="display1" className={classes.heading}>
            Claim your evergov Page
          </Typography>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="subheading">
                By creating a free account and claiming your page, you can:
              </Typography>
              <div className={classes.listItem}>
                <Done className={classes.icon} /><Typography variant="body1">Own your agency page</Typography>
              </div>
              <div className={classes.listItem}>
                <Done className={classes.icon} /><Typography variant="body1">Update your agency information</Typography>
              </div>
              <div className={classes.listItem}>
                <Done className={classes.icon} /><Typography variant="body1">Manage all service offerings</Typography>
              </div>
              <div className={classes.listItem}>
                <Done className={classes.icon} /><Typography variant="body1">Respond to queries</Typography>
              </div>
              <div className={classes.listItem}>
                <Done className={classes.icon} /><Typography variant="body1">Post real-time service updates</Typography>
              </div>
              <div className={classes.listItem}>
                <Done className={classes.icon} /><Typography variant="body1">Access our Community tools</Typography>
              </div>
              <div className={classes.listItem}>
                <Done className={classes.icon} /><Typography variant="body1">Use claimed page for your website</Typography>
              </div>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Link to="/claim-request" className={[classes.link, classes.buttonWrapper]}>
                <Button variant="contained" color="primary" className={classes.button}>Claim my agency page</Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trackView: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackView('claim', null, null, null));
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnClaim = connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Claim)));

export default ConnClaim;


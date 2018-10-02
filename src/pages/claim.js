import React, { Component, Fragment } from 'react';
import Link from 'gatsby-link';

import { withStyles } from '@material-ui/core/styles';

import withRoot from '../withRoot';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';

const styles = theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    height: '100vh',
    paddingTop: theme.spacing.unit * 12,
  },
  heading: {
    marginBottom: theme.spacing.unit * 3,
  },
  card: {
    height: 'auto',
    boxShadow: '0 0 0 0',
    border: `1px solid ${theme.palette.primary['50']}`,
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
  },
});

class Claim extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar className={classes.header}>
          <Link to="/" className={classes.link}>
            <Typography variant="display1" color="inherit" className={classes.title}>
              Localgov.fyi
            </Typography>
          </Link>
          <Typography variant="body1" color="textPrimary">
            for Government Agencies
          </Typography>
        </AppBar>
        <div className={classes.wrapper}>
          <Typography variant="display1" className={classes.heading}>
            Claim your LocalGov Page
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
              <Link to="/signup" className={[classes.link, classes.buttonWrapper]}>
                <Button variant="raised" color="primary" className={classes.button}>Claim my agency page</Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      </Fragment>
    );
  }
}

export default withRoot(withStyles(styles)(Claim));

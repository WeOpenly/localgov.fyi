import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AccountBalance from '@material-ui/icons/AccountBalance';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Rowing from '@material-ui/icons/Rowing';
import Assignment from '@material-ui/icons/Assignment';
import Report from '@material-ui/icons/Report';
import Home from '@material-ui/icons/Home';
import Folder from '@material-ui/icons/Folder';
import HowToVote from '@material-ui/icons/HowToVote';

import withRoot from '../withRoot';

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
  card: {
    height: 148,
  },
  cardContent: {
    display: 'flex',
    'flexDirection': 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: theme.palette.primary['500'],
    fontSize: 64,
  },
});

const ServiceGrid = ({ classes, services }) => {
  const icons = {
    Apply: <Assignment className={classes.icon} />,
    Pay: <AttachMoney className={classes.icon} />,
    Recreational: <Rowing className={classes.icon} />,
    Register: <HowToVote className={classes.icon} />,
    Report: <Report className={classes.icon} />,
  };
  return (
    <Grid container spacing={16}>
      {services.map((service, index) => {
        return (
          <Fragment>
            {(index === 0 || index === 4) && <Grid item xs={false} md={2} />}
            <Grid item xs={6} md={2}>
              <Link to={`/service/${service.id}/`} className={classes.link}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    {service.head.split(' ').map(word => {
                      return icons[word];
                    })[0] || <AccountBalance className={classes.icon} />}
                    <Typography variant="body1">{service.head}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            {(index === 3 || index === 7) && <Grid item xs={false} md={2} />}
          </Fragment>
        );
      })}
      {/*<Grid item xs={0} md={2} />
      <Grid item xs={6} md={2}>
        <Card>
          <CardContent className={classes.cardContent}>
            <AccountBalance className={classes.icon} />
            <Typography variant="body1">Business Licenses</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={2}>
        <Card>
          <CardContent className={classes.cardContent}>
            <AttachMoney className={classes.icon} />
            <Typography variant="body1">Utility Bill</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={2}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Rowing className={classes.icon} />
            <Typography variant="body1">Recreational Activities</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={2}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Assignment className={classes.icon} />
            <Typography variant="body1">Parking Citation</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={0} md={2} />
      <Grid item xs={0} md={2} />
      <Grid item xs={6} md={2}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Report className={classes.icon} />
            <Typography variant="body1">Police Report</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={2}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Home className={classes.icon} />
            <Typography variant="body1">Property Taxes</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={2}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Folder className={classes.icon} />
            <Typography variant="body1">Public Records</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={2}>
        <Card>
          <CardContent className={classes.cardContent}>
            <HowToVote className={classes.icon} />
            <Typography variant="body1">Voter Registration</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={0} md={2} />*/}
    </Grid>
  );
};

export default withRoot(withStyles(styles)(ServiceGrid));

import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import withRoot from '../withRoot';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
    boxShadow: '0 0 0 0',
    border: `1px solid ${theme.palette.primary['50']}`,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  seeAll: {
    cursor: 'pointer',
  },
});

const OtherServices = ({ classes, services }) => {
  return (
    <Fragment>
      {services.map(service => (
        <Card key={service.id} className={classes.card}>
          <CardContent>
            <Typography>
              {service.name}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button color="primary">More details</Button>
            <Button color="primary">{service.deliveryLink.name}</Button>
          </CardActions>
        </Card>
      ))}
      <Typography className={classes.seeAll}>See all services</Typography>
    </Fragment>
  );
};

export default withRoot(withStyles(styles)(OtherServices));

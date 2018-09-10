import React, { Fragment } from 'react';
import Link from 'gatsby-link';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import withRoot from '../withRoot';

const styles = theme => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit,
  },
  card: {
    marginBottom: theme.spacing.unit * 2,
    boxShadow: '0 0 0 0',
    border: `1px solid ${theme.palette.primary['50']}`,
  },
  cardContent: {
    marginBottom: theme.spacing.unit * -2,
  },
  cardTitle: {
    fontWeight: 600,
  },
  caption: {
    height: 40,
    overflowY: 'hidden',
    color: 'rgba(30, 30, 50, 0.75)'
  },
  serviceLink: {
    textDecoration: 'none',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  linkWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  link: {
    color: theme.palette.primary['500'],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  linkText: {
    color: theme.palette.primary['500'],
  },
  raw: {
    marginTop: -13.920,
  },
});

const RawHTML = ({ children, classes }) => (
  <div
    className={classes.raw}
    dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, " ") }}
  />
);

const OtherServices = ({ classes, services, orgID, orgName }) => {
  return (
    <Fragment>
      <div className={classes.headerWrapper}>
        <Typography variant="subheading">Additional services</Typography>
      </div>
      {services.map(service => (
        <Card key={service.id} className={classes.card}>
          <Link to={`/service/${service.id}`} className={classes.serviceLink}>
            <CardContent className={classes.cardContent}>
              <Typography variant="body1" className={classes.cardTitle}>
                {service.service_name}
              </Typography>
              <Typography variant="caption" className={classes.caption}>
                <RawHTML classes={classes}>{service.service_description}</RawHTML>
              </Typography>
            </CardContent>
          </Link>
          {!!service.service_del_links.length && <CardActions className={classes.cardActions}>
            <Button color="primary">{service.service_del_links[0].link_name}</Button>
          </CardActions>}
        </Card>
      ))}
      <div className={classes.linkWrapper}>
        <Link to={`/organization/${orgID}`} className={classes.link}>
          <Typography variant="caption" className={classes.linkText}>See all services from {orgName}</Typography>
        </Link>
      </div>
    </Fragment>
  );
};

export default withRoot(withStyles(styles)(OtherServices));

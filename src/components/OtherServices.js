import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SearchResult from './SearchResult';

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
    marginTop: theme.spacing.unit *1,
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
    overflow: 'hidden',
    'textOverflow': 'ellipsis',
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
      {services.map( (service, idx) => (
          <SearchResult
                  resultType='service'
                  id={service.id}
                  listIndex={idx}
                  toLink={`/service/${service.id}`}
                  title={service.service_name}
                  description={service.service_description}
                  deliveryLink={service.service_del_links && service.service_del_links[0] ? service.service_del_links[0] : null}
                />
      ))}
      <div className={classes.linkWrapper}>
        <Link to={`/organization/${orgID}`} className={classes.link}>
          <Typography variant="caption" className={classes.linkText}>See all services from {orgName}</Typography>
        </Link>
      </div>
    </Fragment>
  );
};

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

const ConnOtherServices = connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(OtherServices)));

export default ConnOtherServices;

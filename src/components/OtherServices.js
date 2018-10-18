import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ServiceCard from './ServiceCard';

import withRoot from '../withRoot';

const styles = theme => ({
  other_ser_headerWrapper: {
    display: 'flex',
    justifyContent: 'left',
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit
  },
  other_ser_card: {
    marginBottom: theme.spacing.unit * 2,
    boxShadow: '0 0 0 0',
    border: `1px solid ${theme.palette.primary['50']}`,
  },
other_ser_cardContent : {
    marginBottom: theme.spacing.unit * -2,
  },
other_ser_cardTitle : {
    fontWeight: 600,
  },
other_ser_caption : {
    height: 40,
    overflowY: 'hidden',
    color: 'rgba(30, 30, 50, 0.75)'
  },
other_ser_serviceLink : {
    textDecoration: 'none',
  },
other_ser_cardActions : {
    display: 'flex',
    justifyContent: 'flex-end',
  },
other_ser_linkWrapper : {
    margin: theme.spacing.unit *2,
    display: 'flex',
    justifyContent: 'left',
    width: '100%',
  },
other_ser_link : {
    color: theme.palette.primary['500'],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
other_ser_linkText : {
    color: theme.palette.primary['500'],
  },
other_ser_raw : {
    overflow: 'hidden',
    'textOverflow': 'ellipsis',
  },
});


class OtherServices extends React.Component {
  render() {
    const { classes } = this.props;
    const {services, orgID, orgName} = this.props;

    const sers = services.map((service, idx) => <ServiceCard
              key={`service-card-other-${service.id}`}
          resultType='service'
          id={service.id}
          listIndex={`${service.id}-${idx}`}
          toLink={`/service/${service.id}`}
          title={service.service_name}
          description={service.service_description}
          deliveryLink={service.service_del_links && service.service_del_links[0]
          ? service.service_del_links[0]
          : null}/>);
      
    return (
  <Fragment>
      <div className={classes.other_ser_headerWrapper}>
        <Typography variant="subheading">Additional services</Typography>
      </div>
      <div>
      {sers}
      </div>
      <div className={classes.other_ser_linkWrapper}>
        <Link to={`/organization/${orgID}`} className={classes.other_ser_link}>
          <Typography variant="caption" className={classes.other_ser_linkText}>See all services from {orgName}</Typography>
        </Link>
      </div>
    </Fragment>
    );
  }
}


export default withStyles(styles)(OtherServices);
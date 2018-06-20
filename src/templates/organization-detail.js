import * as PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ContactDetails from '../components/ContactDetails';
import HorizontalListItem from '../components/HorizontalListItem';
import HorizontalList from '../components/HorizontalList';
import MemberListItem from '../components/MemberListItem';
import SearchResult from '../components/SearchResult';

import withRoot from '../withRoot';

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '98%',
    margin: 2,
  },
  cardMedia: {
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: "50%",
    margin: theme.spacing.unit * 2,
    boxShadow: '0px 0px 2px 1px lightGray',
  },
});
class OrganizationDetail extends React.Component {


  render() {
    const {id, services, members, contact_details, name} = this.props.pathContext.data;

    const eventParams = {
      event_type: 'overview_query',
      type: 'organization',
      org_id: id,
    }

    // fire & forget
    const payloadParams = Object
      .keys(eventParams)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(eventParams[k])}`)
      .join('&');

    let contactDetailComponent = null;
    let memberListComp = null;
    let serviceListComp = null;

    if (contact_details){
      contactDetailComponent = <ContactDetails info={contact_details}/>
    }

    if (members.length > 0) {
      memberListComp = (
        <Grid container spacing={8}>
              <Typography variant="subheading" component="h4" gutterBottom>
                    Contact Details
          </Typography>
          <Grid item xs={12} sm={12}>
            <br/>
            <HorizontalList list={members} component={MemberListItem}/>
          </Grid>
        </Grid>
      )
    }

    if (services.length > 0) {
      const serCards = services.map((ser, index) => {
        return <SearchResult key={ser.id} toLink={`/service/${ser.id}`} title={ser.service_name}/>;
      });

      serviceListComp = <Grid container spacing={8}>
        <Grid item xs={12} sm={12}>
          <Typography variant="subheading" component="h4" gutterBottom>
              Services offered by {name}
          </Typography>

        </Grid>
        <Grid item xs={12} sm={12}>
          {serCards}
        </Grid>
      </Grid>;
    }

    return (
      <Grid container spacing={16}>
        <Helmet>
        <title>{`${name} info, contact details and services | Localgov.fyi`} </title>
          <meta name="description" content={`${name} info, contact details and services`} />
        </Helmet>
        <Grid container spacing={16} item xs={12} sm={12} md={6}>
          <Grid item xs={12} sm={12}>
            <br />
              {serviceListComp}
          </Grid>
        </Grid>
        <Grid container spacing={16} item xs={12} sm={12} md={6}>
          <Grid item xs={12} sm={12}>
            <br />
         {contactDetailComponent}
            <img src={`https://d3qlx9ss0mi45s.cloudfront.net/localgov.fyi/track.png?${payloadParams}`} alt={"localgov-track"} /> 
          </Grid>
          <Grid item xs={12} sm={12}>
            <br />
            {memberListComp}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
export default withRoot(withStyles(styles)(OrganizationDetail));


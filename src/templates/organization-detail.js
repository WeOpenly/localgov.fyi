import * as PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet";
import { connect } from "react-redux";
import Link  from 'gatsby-link';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ContactDetails from '../components/ContactDetails';

// import MemberListItem from '../components/MemberListItem';
import SearchResult from '../components/SearchResult';
import withRoot from '../withRoot';

import {trackView} from "../components/Search/tracking";

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

const JsonLd = ({ data }) =>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />;


class OrganizationDetail extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { id, name } = this.props.pathContext.data;
    dispatch(trackView('entity_detail', 'organization', id, name));
  }

  render() {
    const {id, services, members, contact_details, name} = this.props.pathContext.data;
    const {classes} = this.props;
    let contactDetailComponent = null;
    let memberListComp = null;


    if (contact_details){
      contactDetailComponent = <ContactDetails info={contact_details}/>
    }

    let contactSchema = {};

    let cd = []
    if (contact_details){
      cd = contact_details
    }
      cd.forEach((detail) => {
        let type = detail.contact_type;
        if (type === 'ADDRESS') {
          contactSchema['address'] = detail.contact_value;
        } else if (type === 'PHONE') {
          contactSchema['phone'] = detail.contact_value;
        }
      })

    // if (members.length > 0) {
    //   memberListComp = (
    //     <Grid container spacing={8}>
    //           <Typography variant="subheading" component="h4" gutterBottom>
    //                 Contact Details
    //       </Typography>
    //       <Grid item xs={12} sm={12}>
    //         <br/>
    //         <HorizontalList list={members} component={MemberListItem}/>
    //       </Grid>
    //     </Grid>
    //   )
    // }
    
    let allServiceList = [];
    if (services.length > 0) {
      services.map((detailsAtLevel, index) => {
      const servicesAtLevel = detailsAtLevel.services || [];

        const serCards = servicesAtLevel.map((ser, idx) => {
        return <SearchResult key={ser.id} resultType='service' id={ser.id} listIndex={idx} toLink={`/service/${ser.id}`} title={ser.service_name} />;
        });
        
      let name = null
      let id = null
      let serviceListComp = null;
      console.log(detailsAtLevel);
      if ('org' in detailsAtLevel){
         name = detailsAtLevel.org.name;
         id = detailsAtLevel.org.id;
        serviceListComp = <Grid container spacing={8}>
          <Grid item xs={12} sm={12}>
            {(index === 0) ? (<Typography variant="subheading" component="h4" gutterBottom>
              Services offered by {name}
            </Typography>) : (<Typography variant="subheading" component="h4" gutterBottom>
              Services offered by <Link to={`/organization/${id}/`} className={classes.link}> {name} </Link>
            </Typography>)}
          </Grid>
          <Grid item xs={12} sm={12}>
            {serCards}
          </Grid>
        </Grid>;
      }
        allServiceList.push(serviceListComp);
      });

    }

    const jsonLd = {
      "@context": "http://schema.org",
      "@id" : `https://localgov.fyi/organization/${id}/`,
      "@type": "GovernmentOrganization",
      name: `${name}`,
      ...contactSchema
    }

    return (
      <Grid container spacing={16}>
        <Helmet>
        <title>{`${name} info, contact details and services | Localgov.fyi`} </title>

< meta name = "description" content = {
            `${name} info, county / city hall contact details, utilities, and services`
} />
          <meta property="og:title" content={`${name}`} />
          <meta property="og:url" content={`https://localgov.fyi/organization/${id}/`} />
          <meta property="og:description" content={`${name} info, contact details and services`} />
          <link rel="canonical" href={`https://localgov.fyi/organization/${id}/`}  />
        
          <JsonLd data={jsonLd} />
        </Helmet>
        <Grid container spacing={16} item xs={12} sm={12} md={6}>
          <Grid item xs={12} sm={12}>
            <br />
            {allServiceList}
          </Grid>
        </Grid>
        <Grid container spacing={16} item xs={12} sm={12} md={6}>
          <Grid item xs={12} sm={12}>
            <br />
         {contactDetailComponent}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(OrganizationDetail)));


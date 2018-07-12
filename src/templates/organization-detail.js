import * as PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet";
import { connect } from "react-redux";

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

class OrganizationDetail extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { id, name } = this.props.pathContext.data;
    dispatch(trackView('entity_detail', 'organization', id, name));
  }

  render() {
    const {id, services, members, contact_details, name} = this.props.pathContext.data;

    let contactDetailComponent = null;
    let memberListComp = null;
    let serviceListComp = null;

    if (contact_details){
      contactDetailComponent = <ContactDetails info={contact_details}/>
    }

    let contactSchema = {};


      contact_details.forEach((detail) => {
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

    if (services.length > 0) {
      const serCards = services.map((ser, index) => {
        return <SearchResult key={ser.id} resultType='service' id={ser.id} listIndex={index} toLink={`/service/${ser.id}`} title={ser.service_name}/>;
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
    const jsonLd = {
      "@context": "http://schema.org",
      "@type": "GovernmentOrganization",
      "name": `${name}`,
      ...contactSchema
    }

    const jsonLdStr = `${jsonLd}`

    return (
      <Grid container spacing={16}>
        <Helmet>
        <title>{`${name} info, contact details and services | Localgov.fyi`} </title>
          <meta name="description" content={`${name} info, contact details and services`} />
  
        <script type="application/ld+json">
            {jsonLdStr}
        </script>
     
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


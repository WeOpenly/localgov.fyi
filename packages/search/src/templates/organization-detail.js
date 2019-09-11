import React, { Fragment } from "react"
import { connect } from "react-redux";

import Helmet from "react-helmet";
import {Link} from 'gatsby';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MiniOrgDetail from '../components/MiniOrgDetail';

import withRoot from '../withRoot';
import OrgHeader from '../components/OrgHeader';
import ChipFilter from '../components/ChipFilter';
import DetailTemplate from '../components/detailTemplate';
import Footer from '../components/Footer';
// import MemberListItem from '../components/MemberListItem';
import ServiceCard from '../components/ServiceCard';
import { trackView, trackClick } from "../components/common/tracking";

const styles = theme => ({
  "@global": {
        html: {
            WebkitFontSmoothing: "antialiased", // Antialiasing.
            MozOsxFontSmoothing: "grayscale", // Antialiasing.
            height: "100%",
            overflow: 'hidden'
        },
        body: {
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            overflowWrap: "break-word",
            overflowY: "scroll",
            overflowX: "hidden"
        },
            "body>div": {
        display: "block",
        height: "100%"
        },
    },

  org_detail_serviceListComponent : {
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap'
  },
  org_detail_servicesContainer: {
    marginTop: theme.spacing.unit * 3,
  },
  filters: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
     org_detail_footer:{
       width: '100%',
       borderTop:`1px solid #dcdcdc`,
       paddingTop: theme.spacing.unit,
       marginTop: theme.spacing.unit *6,
    }
});

const JsonLd = ({ data }) =>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />;


class OrganizationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: '',
    };
    this.changeFilter = this.changeFilter.bind(this);
  }

  changeFilter(filter) {
    const {dispatch} = this.props;
    this.setState({ selectedFilter: filter });
    dispatch(trackClick('tag_filter', 'service', filter,  filter,  0));
  }



  componentDidMount() {
    const { dispatch } = this.props;
const {id, name} = this.props.pageContext.data;
    dispatch(trackView('entity_detail', 'organization', id, name));
  }

  render() {
const {
  id,
  hierarchial_service_details,
  contact_details,
  org_name,
  url_slug,
  area,
  other_orgs_from_state_heading,
other_orgs_from_state
} = this.props.pageContext.data;
    const { isMobile} = this.props;
    const name = org_name;
    const services = hierarchial_service_details;
    const { hierarchy } = area;


    const { logoSizes } = this.props.pageContext;
    

    let otherOrgsFromState = null;
    if (other_orgs_from_state){
      otherOrgsFromState = (<div
            style={{
            display: 'flex',
            marginTop: '24px',
            marginBottom: '24px',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap'
        }}>
            {other_orgs_from_state.map((item, idx) => {
                return (
                  <div style={{ minWidth: '200px', minHeight: '40px', display: 'flex', flexWrap: 'wrap' }}>
                      <a href={`/${item.url_slug}`} >
                                        <Typography variant="body2" style={{fontSize: '1.1rem'}}>
                          {item.area.name}
                      </Typography>
                      </a>
                  </div>
                )
            })}
        </div>)
    }
 

    let orgLogoSvg = null
    if (logoSizes && logoSizes.fluid){
      orgLogoSvg = logoSizes.fluid
    }


    const { classes } = this.props;
    let contactDetailComponent = null;
    let state ='';

    if (hierarchy.length > 1 && hierarchy[hierarchy.length - 1].area_name) {
        state = `State of ${hierarchy[hierarchy.length - 1].area_name}`
    }


      contactDetailComponent = (
        <OrgHeader
          isMobile={isMobile}
          name={name}
          parent={state}
          info={contact_details}
          logoFluid={orgLogoSvg}
        />
      );


    let contactSchema = {};

    let cd = []
    let sameAs = []
    if (contact_details){
      cd = contact_details
    }
      cd.forEach((detail) => {
        let type = detail.contact_type;
        sameAs.push(detail.contact_value);
        if (type === 'ADDRESS') {
          contactSchema['address'] = detail.contact_value;
        } else if (type === 'PHONE') {
          contactSchema['phone'] = detail.contact_value;
        }
      })


    
    let allServiceList = [];
    if (services.length > 0) {

      services.map((detailsAtLevel, index) => {
        let serviceListComp = null;
        let serCards = null;
        let orgTitle = null;

    
        if ('services' in detailsAtLevel){
          let servicesAtLevel = detailsAtLevel.services || [];
          servicesAtLevel = servicesAtLevel.filter(service => {
            const deliveryLink = service.service_del_links && service.service_del_links[0] ? service.service_del_links[0] : null;
            if(this.state.selectedFilter){
               return deliveryLink && deliveryLink.link_name.toLowerCase().includes(this.state.selectedFilter.toLowerCase());
            }
            return service
          });

          serCards = servicesAtLevel.map((ser, idx) => {
            const deliveryLink = ser.service_del_links && ser.service_del_links[0] ? ser.service_del_links[0] : null;

            return (
      
                <ServiceCard
                  isMobile={isMobile}
                  resultType='service'
                  id={ser.id}
                  org_name={org_name}
                  listIndex={idx}
                  toLink={`/${ser.url_slug}/`}
                  title={ser.service_name}
                  description={ser.service_description}
                  deliveryLink={deliveryLink}
                />
    
            );
          });
        }

        if('org' in detailsAtLevel){
          if (detailsAtLevel.org && 'name' in detailsAtLevel.org) {

            const { name: orgName } = detailsAtLevel.org;
            const orgHeading = (
              <Typography variant="title">
                Services offered by {orgName}
              </Typography>
            );

            let orgSubheading = (
              <Typography variant="subheading" className={classes.orgSubheading}>
                More services available here
              </Typography>
            );
            if (orgName.toLowerCase().includes('county')) {
              orgSubheading = (<Typography variant="body2" className={classes.orgSubheading}>
                Find services from the County agencies of {orgName}
              </Typography>);
            } else if (orgName.toLowerCase().includes('state')) {
              orgSubheading = (<Typography variant="body2" className={classes.orgSubheading}>
                Find services provided by the State agencies for all its residents
              </Typography>);
            }
            orgTitle = (
              <Fragment>
                {orgHeading}
                
                {index > 0 ? 
                  orgSubheading
                  : null}
              </Fragment>
            );
          }
        }
         
        serviceListComp = (
          <Grid item xs={12} md={12}  className={classes.org_detail_serviceListComponent} key={detailsAtLevel.org ? detailsAtLevel.org.id : index}>
            {index > 0 && <div style={{margin: '16px 0', width: '100%'}} align="left">
        
                {orgTitle}
            </div>}   
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
              {serCards}
            </div>
               
          </Grid>
        );

        if (serviceListComp && serCards.length){
            allServiceList.push(serviceListComp)
        }
        return null;
      });
    }


    const jsonLd = {
      "@context": "http://schema.org",
      "@id": `https://evergov.com/${url_slug}/`,
      "@type": "Organization",
      name: `${name}`,
      sameAs: sameAs,
      ...contactSchema
    }

    return (
      <DetailTemplate isMobile={isMobile} location={this.props.location}>

        <Helmet>
          <script type="application/ld+json">{`${JSON.stringify(jsonLd)}`}</script>
          <title>{`${name} info, contact details and services | Evergov`}</title>
          <meta
            name="description"
            content={`${name} info, county / city hall contact details, utilities, and services`}
          />
          <meta name="keywords"
              content={`${name} online, info , local government services`}/>
          <meta property="og:title" content={`${name}`} />
            <meta property="og:url" content={`https://evergov.com/${url_slug}/`} />
          <meta property="og:description" content={`${name} info, contact details and services`} />
            <link rel="canonical" href={`https://evergov.com/${url_slug}/`} />
        
        </Helmet>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <br />
            {contactDetailComponent}
          </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subheading" component="h4">
                What would you like to get done?
            </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.filters}>
              <ChipFilter
                tags={['Apply', 'Pay', 'Register', 'Renew', 'Report']}
                changeFilter={this.changeFilter}
              />
            </Grid>
            <Grid item xs={12}>
              {allServiceList.length ? allServiceList : <Typography variant="body1">No services found.</Typography>}
            </Grid>
            <Grid item xs={12} >
              <div style={{width: '320px'}}>
              <Typography variant="title">
                {other_orgs_from_state_heading}
              </Typography>
              </div>
            </Grid>
            <Grid item xs={12} >
              {otherOrgsFromState}
            </Grid>
        </Grid>
       <div className={classes.org_detail_footer}>
          <Footer isMobile={isMobile} page={this.props.location.pathname} />
        </div>
        </DetailTemplate>
        
    );
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(OrganizationDetail)));
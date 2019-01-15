import React from "react"
import { connect } from "react-redux";

import Helmet from "react-helmet";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
    "body>div>div": {
        display: "block",
        height: "100%"
        },
    },
  orgTitle: {
    marginBottom: theme.spacing.unit,
  },
  orgSubheading: {
    marginTop: -theme.spacing.unit,
  },
  org_detail_serviceListComponent : {
    marginBottom: theme.spacing.unit * 2,
  },
  org_detail_servicesContainer: {
    marginTop: theme.spacing.unit * 3,
  },
  filters: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
     org_detail_footer:{
       marginTop: theme.spacing.unit * 4
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
    const { id, services, contact_details, name } = this.props.pageContext.data;
    const { logoSizes } = this.props.pageContext;
    
    let orgLogoSvg = null
    if (logoSizes && logoSizes.sizes){
      orgLogoSvg = logoSizes.sizes
    }

    const { classes } = this.props;
    let contactDetailComponent = null;
    let parent ='';
    if (services.length && services[services.length - 1].org){
        parent = services.length && services[services.length - 1].org;
      parent = parent.name === name ? {} : parent;
    }



      contactDetailComponent = (
        <OrgHeader
          name={name}
          parent={parent}
          info={contact_details}
          logoSizes={orgLogoSvg}
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
            return deliveryLink && deliveryLink.link_name.toLowerCase().includes(this.state.selectedFilter.toLowerCase());
          });
          serCards = servicesAtLevel.map((ser, idx) => {
            const deliveryLink = ser.service_del_links && ser.service_del_links[0] ? ser.service_del_links[0] : null;
            return (
              <Grid item xs={12} md={4} key={ser.id}>
                <ServiceCard
                  resultType='service'
                  id={ser.id}
                  listIndex={idx}
                  toLink={`/service/${ser.id}/`}
                  title={ser.service_name}
                  description={ser.service_description}
                  deliveryLink={deliveryLink}
                />
              </Grid>
            );
          });
        }

        if('org' in detailsAtLevel){
          if (detailsAtLevel.org && 'name' in detailsAtLevel.org && 'id' in detailsAtLevel.org) {

            const { name: orgName } = detailsAtLevel.org;
            const orgHeading = (
              <Typography variant="subheading" component="h4">
                Services offered by {orgName}
              </Typography>
            );

            let orgSubheading = (
              <Typography variant="body2" className={classes.orgSubheading}>
                More services available in this locality
              </Typography>
            );
            if (orgName.toLowerCase().includes('county')) {
              orgSubheading = (<Typography variant="body2" className={classes.orgSubheading}>
                Find services from the County agencies in which {name} is located in.
              </Typography>);
            } else if (orgName.toLowerCase().includes('state')) {
              orgSubheading = (<Typography variant="body2" className={classes.orgSubheading}>
                Find services provided by the State agencies for all its residents.
              </Typography>);
            }
            orgTitle = (
              <div className={classes.orgTitle}>
                {orgHeading}
                {index > 0 && orgSubheading}
              </div>
            );
          }
        }
         
        serviceListComp = (
          <Grid container spacing={8} className={classes.org_detail_serviceListComponent} key={detailsAtLevel.org ? detailsAtLevel.org.id : index}>
            {index > 0 && <Grid item xs={12}>
              {orgTitle}
            </Grid>}
            <Grid item xs={12}>
              <Grid container spacing={16}>
                {serCards}
              </Grid>
            </Grid>
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
      "@id" : `https://localgov.fyi/organization/${id}/`,
      "@type": "Organization",
      name: `${name}`,
      sameAs: sameAs,
      ...contactSchema
    }

    return (
      <DetailTemplate location={this.props.location}>
      <Grid container spacing={16}>
        <Helmet>
            <script type="application/ld+json">{`${JSON.stringify(jsonLd)}`}</script>
          <title>{`${name} info, contact details and services | Localgov.fyi`}</title>
          <meta
            name="description"
            content={`${name} info, county / city hall contact details, utilities, and services`}
          />
          <meta name="keywords"
              content={`${name} online, info , services,  local, utilities `}/>
          <meta property="og:title" content={`${name}`} />
          <meta property="og:url" content={`https://localgov.fyi/organization/${id}/`} />
          <meta property="og:description" content={`${name} info, contact details and services`} />
          <link rel="canonical" href={`https://localgov.fyi/organization/${id}/`} />
        
        </Helmet>
        <Grid container spacing={16} item xs={12} md={12}>
          <Grid item xs={12}>
            <br />
            {contactDetailComponent}
          </Grid>
        </Grid>
        <Grid container spacing={16} item xs={12} md={12} className={classes.org_detail_servicesContainer}>
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
        </Grid>
      </Grid>
        <div className={classes.org_detail_footer}>
            <Footer page={this.props.location.pathname} />
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
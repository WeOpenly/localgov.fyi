import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import ContentLoader from "react-content-loader"

import {navigate} from '@reach/router';
import Helmet from "react-helmet";
import {isMobileOnly} from 'react-device-detect';

import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';

import withRoot from '../withRoot';
import LoginRegisterDialog from '../components/Account/LoginRegisterDialog';

import Layout from "../components/layout";

import ServiceGrid from '../components/ServiceGrid';
import IndexHero from '../components/IndexHero';


import {trackView, trackClick} from "../components/common/tracking";
import { teal } from '@material-ui/core/colors';

const styles = theme => ({
  "@global": {
    html: {
      WebkitFontSmoothing: "antialiased", // Antialiasing.
      MozOsxFontSmoothing: "grayscale", // Antialiasing.
      height: "100%"
    },
    body: {
      margin: 0,
      padding: 0,
      height: "100%",
      width: "100%",
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
  index_login: {
    zIndex: '2000'
  },

index_section2 : {
    backgroundColor: '#fafafa',
    paddingBottom: theme.spacing.unit * 10
  },
index_popularServicesHeader : {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 5
  },
index_section3 : {
    marginLeft: theme.spacing.unit * -2,
    marginRight: theme.spacing.unit * -2
  },
index_section3Mobile : {
    width: '100%'
  },
index_otherCitiesHeader : {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 2
  },
index_linksWrapper : {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit * 4
  },
index_otherLinks : {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
index_linkLeft : {
    textAlign: 'left',
    cursor: 'pointer'
  },
index_linkCenter : {
    textAlign: 'center',
    cursor: 'pointer'
  },
index_linkRight : {
    textAlign: 'right',
    cursor: 'pointer'
  },
index_dividerWrapper : {
    marginTop: theme.spacing.unit * .5,
    marginBottom: theme.spacing.unit * 5
  },
index_gridWrapper1 : {
    width: '100%',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
index_gridWrapper2 : {
    width: '100%',
    marginBottom: theme.spacing.unit * 10,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
index_locationsLink : {
    display: 'flex',
    justifyContent: 'center',
    textDecorationColor: theme.palette.primary['500']
  },
  otherLinksIndexGrid:{
    display: 'flex',
    flexWrap: 'wrap'
  },
index_progressWrapper : {
    display: 'flex',
    justifyContent: 'center'
  },
index_toolbar : {
    width: '100%',
    display: 'flex',
    zIndex: 200,
    justifyContent: 'space-between'
  },
index_grid:{

},
index_index_grid_item:{
  dispalay: 'flex',
  flexWrap: 'wrap',
  padding: theme.spacing.unit,
  marginTop: theme.spacing.unit * 4,
}
});

const popularServices = [
  {
    service_name: 'Voter Registration',
    subhead: 'State of California',
    id: '3c35fb58-1538-43ea-b657-e954f6dbd877',
    type: 'service'
  }, {
    service_name: 'Food Stamps',
    subhead: 'State of California',
    id: 'd7052b49-3c72-4369-9af5-c56dc259b055',
    type: 'service'
  }, {
    service_name: 'Vehicle Registration Renewal',
    subhead: 'State of California',
    id: '1df3a37a-bce7-42ca-9e69-d04b707fed8c',
    type: 'service'
  }, {
    service_name: 'Renew Drivers License',
    subhead: 'State of California',
    id: '9e1c294c-195f-40ce-adaf-ceb49a648508',
    type: 'service'
  }
];

const JsonLd = ({ data }) => <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(data)
  }} />;

const searchLinksSchema = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  "url": "https://evergov.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://evergov.com/search/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
const dummyServices = [
  {
    service_name: 'Pay Business Tax',
    subhead: 'San Francisco-City & County',
    id: '77d0d9e3-5cc4-4688-99f9-b5497710b889',
    type: 'service'
  }, {
    service_name: 'Register a New Business',
    subhead: 'San Francisco-City & County',
    id: '8fad0dd5-4bb5-4822-830b-17942ffdce1f',
    type: 'service'
  }, {
    service_name: 'Apply for a Marriage License',
    subhead: 'San Francisco-City & County',
    id: '9683b5ae-d7be-465a-ab22-51e0e0af3261',
    type: 'service'
  }, {
    service_name: 'Submit a Public Records Request',
    subhead: 'San Francisco-City & County',
    id: '7e07effe-e036-4b67-b239-0d980b5a2f06',
    type: 'service'
  }, {
    service_name: 'Renew Residential Parking Permit',
    subhead: 'San Francisco-City & County',
    id: 'f75f316a-cdf6-40f3-8fa3-6a51f3e4b3f1',
    type: 'service'
  }, {
    service_name: 'Pay Water Bill',
    subhead: 'San Francisco-City & County',
    id: '1fd2b0a9-fcdc-429d-89b1-a8de6751df1e',
    type: 'service'
  }, {
    service_name: 'Purchase Parking Meter Cards',
    subhead: 'San Francisco-City & County',
    id: '5f685fe6-690b-405d-8b6b-42ea1510da12',
    type: 'service'
  }, {
    service_name: 'Pay for Traffic Citation',
    subhead: 'San Francisco-City & County',
    id: '4914912e-5d89-4d0e-be21-fc8faeba9488',
    type: 'service'
  }
];

const otherPlaces = [
  {
    name: 'Atlanta',
    url : '/organization/usa/georgia-state/fulton-county/atlanta-city/ '
  }, {
    name: 'San Francisco',
    url : '/organization/usa/california-state/san-francisco-county/'
  }, {
    name: 'Las Vegas',
    url : '/organization/usa/nevada-state/clark-county/las-vegas-city/'
  }, {
    name: 'San Jose',
    url : '/organization/usa/california-state/santa-clara-county/san-jose-city/'
  }, {
    name: 'Los Angeles',
    url : '/organization/usa/california-state/los-angeles-county/los-angeles-city/'
  }, {
    name: 'Houston',
    url : '/organization/usa/texas-state/harris-county/houston-city/'
  }, {
    name: 'New York',
    url: '/organization/usa/new-york-state/bronx-county/new-york-city/'
  }, {
    name: 'Philadelphia',
    url : '/organization/usa/pennsylvania-state/philadelphia-county/'
  },  {
    name: 'Seattle',
  url : '/organization/usa/washington-state/king-county/seattle-city/'
  }
];

const xah_randomize_array = ((arr) => {
  /* [ Fisher-Yates shuffle. can be used on array-like object
  Modify array inplace.
  http://xahlee.info/js/javascript_random_array.html
  version 2017-09-18
  ] */
  let i = arr.length - 1;
  let j;
  while (i >= 1) {
    // random element up to i, include i
    j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i--;
  }
  return arr;
});
const shuffledArray = xah_randomize_array(otherPlaces);

//  if search/ or otherwise, have box in the layout unless it is index.html if
// index > do not have it in the layout all ways get from the url



const FamounsLoading = props =>(
  <ContentLoader
    height={100}
    width={380}
    speed={5}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="71.87" y="27.83" rx="0" ry="0" width="0" height="0" />
    <rect x="50.4" y="1.83" rx="0" ry="0" width="53.1" height="52.12" />
    <rect x="77.4" y="56.83" rx="0" ry="0" width="0" height="0" />
    <rect x="85.4" y="41.83" rx="0" ry="0" width="0" height="0" />
    <rect x="117.4" y="1.83" rx="0" ry="0" width="53.1" height="52.12" />
    <rect x="182.4" y="1.83" rx="0" ry="0" width="53.1" height="52.12" />
    <rect x="247.4" y="1.83" rx="0" ry="0" width="53.1" height="52.12" />
  </ContentLoader>
)

const LocationServicesLoader = props => (
  <ContentLoader
    height={100}
    width={380}
    speed={5}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="71.87" y="27.83" rx="0" ry="0" width="0" height="0" />
    <rect x="51.4" y="27.83" rx="0" ry="0" width="53.1" height="52.12" />
    <rect x="77.4" y="56.83" rx="0" ry="0" width="0" height="0" />
    <rect x="85.4" y="41.83" rx="0" ry="0" width="0" height="0" />
    <rect x="115.4" y="27.83" rx="0" ry="0" width="53.1" height="52.12" />
    <rect x="182.4" y="27.83" rx="0" ry="0" width="53.1" height="52.12" />
    <rect x="247.4" y="27.83" rx="0" ry="0" width="53.1" height="52.12" />
    <rect x="120.77" y="12.58" rx="0" ry="0" width="108" height="8" />
  </ContentLoader>
)

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.clickSuggestion = this
      .clickSuggestion
      .bind(this);
    this.clickDiscoverMore = this
      .clickDiscoverMore
      .bind(this);
    this.clickGridItem = this
      .clickGridItem
      .bind(this);

  }




  componentDidMount() {
    const {dispatch} = this.props;

    if (this.props.location.pathname === '/') {
      dispatch(trackView('index', null, null, null));
    }

  }

  clickSuggestion(url, name, index) {
    const {dispatch} = this.props;
    dispatch(trackClick('index_grid', 'top_cities', url, name, index));
    navigate(url);
  }

  clickGridItem(type, id, name, index, url) {
    const {dispatch} = this.props;

    dispatch(trackClick('index_grid', type, id, name, index));
    navigate(url);
  }

  clickDiscoverMore() {
    const {dispatch} = this.props;
    dispatch(trackClick('index_grid', 'top_cities', 'locations', 'more'));
    navigate('/locations/');
  }

  render() {
    const {classes, search, account} = this.props;
    const {org, services, state_org} = search.location;
    const {showLogin, showRegister} = account;

    const otherLinks = shuffledArray
      .slice(0, 3)
      .map((item, idx) => {

        return (
          <Grid className={classes.index_index_grid_item} item xs={2}>
            <a
              key={item.name}
              onClick={() => this.clickSuggestion(item.url, item.name, idx)}>
              <Typography
                variant="body1"
                color="primary"
                key={item.name}
                className={classes.index_otherLinks}>
                {item.name}
              </Typography>
            </a>
          </Grid>
        );
      });

    otherLinks.push((
      <Grid className={classes.index_index_grid_item} item xs={2}>
        <a onClick={() => this.clickDiscoverMore()} className={classes.index_locationsLink}>
          <Typography variant="body1" color="primary" className={classes.index_otherLinks}>
            Discover more
          </Typography>
        </a>
      </Grid>
    ))

    const servicesFromOrg = search.allFromOrg.length >= 8
      ? search
        .allFromOrg
        .slice(0, 8)
      : search
        .allFromOrg
        .slice(0, 4);
    const stateServices = state_org
      ? state_org.services
      : popularServices;

    const stateServicesConcat = stateServices.slice(0, 4);
    const serviceNotifyForm = (<form hidden name="serviceNotify" method="post" action="/" data-netlify="true">
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={this.handleChange}/>
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="path" type="text" value=""/>
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="org_id" type="text" value=""/>
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="ser_name" type="text" value=""/>
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="phone" type="tel" value=""/>
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="email" type="email" value=""/>
              </label>
            </p>
          </form>);
          const serviceDeliveryFeedbackForm = ( <form hidden name="serviceDeliveryFeedback" method="post" action="/" data-netlify="true">
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="path" type="text" value="" />
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="satisfied" type="text" value="" />
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="feedbackComment" type="text" value="" />
              </label>
            </p>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="email" type="email" value="" />
              </label>
            </p>
          </form>);

    const autoLocatedOrgServices = (<Fragment><Grid className='index_grid' container className={classes.index_section3Mobile}>
              <Grid className='index_grid_item' item xs={1} md={3}/>
              <Grid className='index_grid_item' item xs={10} md={6}>
                    {search.locationLoading ? null : (<Typography
                  variant="display1"
                  component="h1"
                  className={classes.index_popularServicesHeader}>
                  Evergov {org ? org.name : ''}
                </Typography>)}
              </Grid>
              <Grid item xs={1} md={3}/>
            </Grid><div className={classes.index_gridWrapper2}>
              {search.locationLoading
                ? (<div className={classes.index_progressWrapper}><LocationServicesLoader/></div>)
                : (<ServiceGrid
                  clickGridItem={this.clickGridItem}
                  type='auto_loc_org_services'
                  city={org
                  ? org
                  : null}
                  services={services
                  ? services
                  : dummyServices}/>) }
            </div></Fragment>);

    const popServices = (<Fragment><Grid className='index_grid' container className={classes.index_section3Mobile}>
              <Grid className='index_grid_item' item xs={1} md={3}/>
              <Grid className='index_grid_item' item xs={10} md={6}>
                <Typography
                  variant="display1"
                  component="h1"
                  className={classes.index_popularServicesHeader}>
                  Find the most sought out services
                </Typography>
              </Grid>
              <Grid item xs={1} md={3}/>
            </Grid>
            <div className={classes.index_gridWrapper1}>
              {search.locationLoading
                ? (<FamounsLoading />)
                : <ServiceGrid
                  clickGridItem={this.clickGridItem}
                  type='pop_services'
                  services={stateServicesConcat}/>
              }
            </div></Fragment>)
    const otherLinksComp = (
      <Fragment>
        <Grid

        container
        className={classes.index_otherLinksDivider}>
                  <Grid className='index_grid_item' item xs={2}/>
                  <Grid className='index_grid_item' item xs={8}>
                    <Divider/>
                  </Grid>
                  <Grid className='index_grid_item' item xs={2}/>
                </Grid>
                <Grid className={classes.otherLinksIndexGrid} container align="center">
                  <Grid className='index_grid_item' item xs={2}/> {otherLinks}
                  <Grid className='index_grid_item' item xs={2}/>
                </Grid>
                </Fragment>
      )
    return (
      <Layout location={this.props.location}>
        <Fragment>
          <Helmet
          defaultTitle = {`Evergov: Find All Government Services in a Single Place`}
            titleTemplate={`%s | evergov`}>
            <JsonLd data={searchLinksSchema} />
            <meta name="og:type" content="website"/>
            <meta property="og:site_name" content={`Find All Government Services in a Single Place`}/>

            <link
              rel="canonical"
              href={`https://evergov.com${this.props.location.pathname}`}/>
            <meta
              property="og:url"
              content={`https://evergov.com${this.props.location.pathname}`}/>
            <html lang="en"/>
          </Helmet>
          <LoginRegisterDialog location={this.props.location}/>
          <div className={classes.index_searchWrapper}> 
              <IndexHero location={this.props.location} />
          </div>
          <div className={classes.index_section2}>
                {popServices}
          </div>
          <div className={classes.index_section3}>
            {autoLocatedOrgServices}
            {otherLinksComp}
          </div>
          {serviceNotifyForm}
          {serviceDeliveryFeedbackForm}
        </Fragment>
      </Layout>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = function (state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

const ConnIndex = connect(mapStateToProps)(withRoot(withStyles(styles, {name: 'index-styles'})(Index)));

export default ConnIndex;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Link, { navigateTo } from 'gatsby-link';
import Img from 'gatsby-image';
import Helmet from "react-helmet";
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import withRoot from '../withRoot';
import Search from '../components/Search/index';
import ServiceGrid from '../components/ServiceGrid';
import { fetchAllFromOrganization } from '../components/Search/actions';
import { trackView, trackClick } from "../components/Search/tracking";

const styles = theme => ({
  "@global": {
    html: {
      background: theme.palette.common.white,
      WebkitFontSmoothing: "antialiased", // Antialiasing.
      MozOsxFontSmoothing: "grayscale", // Antialiasing.
      height: "100%"
    },
    body: {
      margin: 0,
      padding: 0,
      height: "100vh",
      width: "100%",
      overflowWrap: "break-word",
      overflowY: "scroll",
      overflowX: "hidden"
    },
    "body>div": {
      display: "block",
      height: "100%",
    },
    "body>div>div": {
      display: "block",
      height: "100%",
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'static',
    background: theme.palette.common.white,
    color: theme.palette.primary['700'],
    boxShadow: `0 0 0 0 ${theme.palette.common.white}`,
    borderBottom: `1px solid ${theme.palette.primary['50']}`,
  },
  title:{
    color: theme.palette.common.white,
    textShadow: '1px 1px 1px black',
    padding: theme.spacing.unit * 2,
    zIndex: 2,
  },
  searchBoxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: theme.spacing.unit * 8,
    width: '100%',
  },
  searchWrapper: {
    height: '85vh',
    marginTop: -62,
  },
  landingSearch:{
    zIndex: 2,
    paddingTop: theme.spacing.unit * 16,
  },
  landingSearchMobile:{
    maxWidth:'100%',
    marginLeft: theme.spacing.unit * -2,
    marginRight: theme.spacing.unit * -2,
    paddingTop: theme.spacing.unit * 16,
  },
  landingSearchHeader: {
    marginTop: theme.spacing.unit * 12,
    display: "flex",
    alignItems: "end",
    justifyContent: "left",
    color: theme.palette.primary["700"]
  },
  appHeaderText: {
    color: theme.palette.primary["900"],
  },
  appSubHeaderTextWrapper: {
    display: 'flex',
    justifyContent: 'center',
    zIndex: 2,
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 2,
  },
  appSubHeaderText: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 3,
  },
  appNameHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 1,
    flexWrap: 'wrap',
  },
  section2: {
    backgroundColor: '#fafafa',
    paddingBottom: theme.spacing.unit * 10,
  },
  popularServicesHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 3,
  },
  section3: {
    marginLeft: theme.spacing.unit * -2,
    marginRight: theme.spacing.unit * -2,
    paddingBottom: theme.spacing.unit * 20,
  },
  section3Mobile: {
    width:'100%',
  },
  otherCitiesHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 2,
  },
  linksWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit / 2,
  },
  otherLinks: {
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  linkLeft: {
    textAlign: 'left',
    cursor: 'pointer',
  },
  linkCenter: {
    textAlign: 'center',
    cursor : 'pointer',
  },
  linkRight: {
    textAlign: 'right',
    cursor : 'pointer',
  },
  dividerWrapper: {
    marginTop: theme.spacing.unit * .5,
    marginBottom: theme.spacing.unit * 5,
  },
  gridWrapper1: {
    width: '100%',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  gridWrapper2: {
    width: '100%',
    marginBottom: theme.spacing.unit * 20,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  locationsLink: {
    display: 'flex',
    justifyContent: 'center',
    textDecorationColor: theme.palette.primary['500'],
  },
});

const otherPlaces = [
  {
    name: 'Atlanta',
    url : '/organization/910e5bde-1b39-4990-b4af-6e374e3df06d'
  },
  {
    name: 'San Francisco',
    url : '/organization/49ab4440-1176-4791-a7cf-1e27a756488d'
  },
  {
    name: 'Las Vegas',
    url : '/organization/ff101ead-22ab-4f46-97d1-07abdcc8e9fa'
  },
  {
    name: 'San Jose',
    url : '/organization/d3c866ec-13f3-41da-b6dc-a74a83d36ea7'
  },
  {
    name: 'San Mateo',
    url : '/organization/64398076-1dd4-4c06-bba0-f46bf893b2ae'
  },
  {
    name: 'Los Angeles',
    url : '/organization/206843c1-890c-435c-85d6-5e2350200c1e'
  },
  {
    name: 'Houston',
    url : '/organization/f212a1f8-d95e-4448-a6c7-659a4aa88934'
  },
  {
    name: 'New York',
    url : '/organization/2c3e6f85-25ee-420d-a31b-25662e2e6a2e'
  },
  {
    name: 'Philadelphia',
    url : '/organization/c91151b6-d989-4163-ab1c-f8680ad6b9f5'
  },
  {
    name: 'Phoenix',
    url : '/organization/b26c8d4f-74b9-4a80-9723-d696089aea99'
  },
  {
    name: 'San Diego',
    url : '/organization/1fcd5489-5736-432a-88c7-fb720b134044'
  },
  {
    name: 'Seattle',
    url : '/organization/28d8e00d-ee9c-49d0-97d8-18c1bf3cc707'
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

//  if search/ or otherwise, have box in the layout unless it is index.html
// if index > do not have it in the layout
// all ways get from the url

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.clickSuggestion = this.clickSuggestion.bind(this);
  }

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(fetchAllFromOrganization);
    dispatch(trackView('index', null, null, null));
  }

  clickSuggestion(url, name, index){
    const { dispatch } = this.props;
    dispatch(trackClick('suggestion', 'top_cities', url, name, index));
    navigateTo(url);
  }

  render() {
    const { classes, search } = this.props;
    const otherLinks = shuffledArray.slice(0,3).map((item, idx) => {
      let link = 'linkLeft';
      if (idx === 1) link = 'linkCenter';
      else if (idx === 2) link = 'linkRight';

      return (
        <Grid item xs={4}>
          <a key={item.name} onClick={() => this.clickSuggestion(item.url, item.name, idx)} className={classes[link]}>
            <Typography
              variant="caption"
              color="textPrimary"
              className={classes.otherLinks}
            >
              {item.name}
            </Typography>
          </a>
        </Grid>
      );
    });
    const popularServices = [
      {
        head: 'Voter Registration',
        subhead: 'State of California',
        id: '3c35fb58-1538-43ea-b657-e954f6dbd877',
        type: 'service'
      },
      {
        head: 'Food Stamps',
        subhead: 'State of California',
        id: 'd7052b49-3c72-4369-9af5-c56dc259b055',
        type: 'service'
      },
      {
        head: 'Vehicle Registration Renewal',
        subhead: 'State of California',
        id: '1df3a37a-bce7-42ca-9e69-d04b707fed8c',
        type: 'service'
      },
      {
        head: 'Renew Drivers License',
        subhead: 'State of California',
        id: '9e1c294c-195f-40ce-adaf-ceb49a648508',
        type: 'service'
      },
    ];
    const dummyServices = [
      {
        head: 'Pay Business Tax',
        subhead: 'San Francisco-City & County',
        id: '77d0d9e3-5cc4-4688-99f9-b5497710b889',
        type: 'service'
      },
      {
        head: 'Register a New Business',
        subhead: 'San Francisco-City & County',
        id: '8fad0dd5-4bb5-4822-830b-17942ffdce1f',
        type: 'service'
      },
      {
        head: 'Apply for a Marriage License',
        subhead: 'San Francisco-City & County',
        id: '9683b5ae-d7be-465a-ab22-51e0e0af3261',
        type: 'service'
      },
      {
        head: 'Submit a Public Records Request',
        subhead: 'San Francisco-City & County',
        id: '7e07effe-e036-4b67-b239-0d980b5a2f06',
        type: 'service'
      },
      // {
      //   head: 'Pay Business Tax',
      //   subhead: 'San Francisco-City & County',
      //   id: '77d0d9e3-5cc4-4688-99f9-b5497710b889',
      //   type: 'service'
      // },
      // {
      //   head: 'Register a New Business',
      //   subhead: 'San Francisco-City & County',
      //   id: '8fad0dd5-4bb5-4822-830b-17942ffdce1f',
      //   type: 'service'
      // },
      // {
      //   head: 'Apply for a Marriage License',
      //   subhead: 'San Francisco-City & County',
      //   id: '9683b5ae-d7be-465a-ab22-51e0e0af3261',
      //   type: 'service'
      // },
      // {
      //   head: 'Submit a Public Records Request',
      //   subhead: 'San Francisco-City & County',
      //   id: '7e07effe-e036-4b67-b239-0d980b5a2f06',
      //   type: 'service'
      // },
    ];
    const servicesFromOrg = search.allFromOrg.length >= 8 ? search.allFromOrg.slice(0, 8) : search.allFromOrg.slice(0, 4);

    return (
      <Fragment>
        <Helmet defaultTitle={`Localgov.fyi | Search for local government organizations, and services`} titleTemplate={`%s | Localgov.fyi`}>
          <meta name="og:type" content="website" />
          <meta name="og:site_name" content="Localgov.fyi" />
          <link
            rel="canonical"
            href={`https://localgov.fyi${this.props.location.pathname}`}
          />
          <meta property="og:url" content={`https://localgov.fyi${this.props.location.pathname}`} />
          <html lang="en" />
        </Helmet>
        <AppBar className={classes.header}>
          <Typography variant="display1" className={classes.title}>
            Localgov.fyi
          </Typography>
        </AppBar>
        <div className={classes.searchWrapper}>
          <Img
            title="United States Capitol"
            alt="Photo by Andy Feliciotti (@someguy) on Unsplash"
            sizes={this.props.data.capitol.sizes}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100vw',
              height: '85vh',
              filter: 'brightness(50%)',
            }}
          />
          <Grid container spacing={0} className={!isMobileOnly ? classes.landingSearch : classes.landingSearchMobile}>
            {/*<Grid item xs={1} sm={2} md={2} />
            <Grid item xs={6} sm={6} md={8} className={classes.appNameHeader}>
              <Typography variant="display1" component="span" className={classes.appHeaderText}>
                Localgov.fyi
              </Typography>
            </Grid>
            <Grid item xs={1} sm={2} md={2} />*/}
            <Grid item xs={1} sm={2} md={2} />
            <Grid item xs={10} sm={8} md={8} className={classes.appSubHeaderTextWrapper}>
              <Typography variant="display1" component="span" className={classes.appSubHeaderText}>
                All your government services in a single place
              </Typography>
            </Grid>
            <Grid item xs={1} sm={2} md={2} />
            <Grid item xs={1} sm={2} md={2} />
            <Grid item xs={10} sm={10} md={8} className={classes.searchBoxContainer}>
              <Search />
            </Grid>
            <Grid item xs={1} sm={2} md={2} />
          </Grid>
        </div>
        <div className={classes.section2}>
          <Grid container className={classes.section3Mobile}>
            <Grid item xs={1} md={3} />
            <Grid item xs={10} md={6}>
              <Typography variant="display1" color="primary" component="h1" className={classes.popularServicesHeader}>
                Find the most sought out services
              </Typography>
            </Grid>
            <Grid item xs={1} md={3} />
          </Grid>
          <div className={classes.gridWrapper1}>
            <ServiceGrid services={popularServices} />
          </div>
        </div>
        <div className={classes.section3}>
          <Grid container className={classes.section3Mobile}>
            <Grid item xs={1} md={3} />
            <Grid item xs={10} md={6}>
              <Typography variant="display1" color="primary" component="h1" className={classes.otherCitiesHeader}>
                Localgov San Francisco
              </Typography>
              <Grid container className={classes.linksWrapper}>
                {otherLinks}
              </Grid>
            </Grid>
            <Grid item xs={1} md={3} />
            <Grid item xs={1} md={2} />
            <Grid item xs={10} md={8} className={classes.dividerWrapper}>
              <Divider />
            </Grid>
            <Grid item xs={1} md={2} />
          </Grid>
          <div className={classes.gridWrapper2}>
            <ServiceGrid city={{ id: '49ab4440-1176-4791-a7cf-1e27a756488d' }} services={dummyServices} />
          </div>
        </div>
        <div className={classes.section4}>
          <Grid container>
            <Grid item xs={1} md={3} />
            <Grid item xs={10} md={6}>
              <Link to="/locations/" className={classes.locationsLink}>
                <Typography variant="display1" color="primary" component="h1">
                  Discover more locations on LocalGov
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={1} md={3} />
          </Grid>
        </div>
      </Fragment>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const query = graphql`
  query indexImageQuery {
    capitol: imageSharp(id: { regex: "/capitol/"}) {
      sizes(quality: 100) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;

const mapStateToProps = function (state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(Index)));

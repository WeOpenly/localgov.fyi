import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ContentLoader from "react-content-loader"
import Toolbar from '@material-ui/core/Toolbar';
import {navigate} from '@reach/router';
import Img from 'gatsby-image';
import Helmet from "react-helmet";
import {isMobileOnly} from 'react-device-detect';
import {graphql} from "gatsby"
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import withRoot from '../withRoot';
import LoginRegisterDialog from '../components/Account/LoginRegisterDialog';

import Layout from "../components/layout";
import Search from '../components/Search/Search';
import ServiceGrid from '../components/ServiceGrid';
import {getLocation} from '../components/Search/actions';
import HeaderAccountMenu from '../components/HeaderAccountMenu';

import {logOut, toggleLogin} from '../components/Account/actions';
import {trackView, trackClick} from "../components/common/tracking";
import {isLoggedIn} from '../components/Account/Auth';

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
index_header : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-between',
    position: 'static',
    background: theme.palette.common.white,
    color: theme.palette.primary['700'],
    boxShadow: `0 0 0 0 ${theme.palette.common.white}`,
    borderBottom: `1px solid ${theme.palette.primary['50']}`
  },
index_otherLinksDivider : {
    margin: theme.spacing.unit * 2
  },
index_title : {
    color: theme.palette.common.white,
    textShadow: '1px 1px 1px black',
    padding: theme.spacing.unit * 2,
    zIndex: 2
  },
index_searchBoxContainer : {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: theme.spacing.unit * 8,
    width: '100%'
  },
index_searchWrapper : {
    height: '85vh',
    marginTop: -62
  },
index_landingSearch : {
    zIndex: 2,
    paddingTop: theme.spacing.unit * 16
  },
index_landingSearchMobile : {
    maxWidth: '100%',
    marginLeft: theme.spacing.unit * -2,
    marginRight: theme.spacing.unit * -2,
    paddingTop: theme.spacing.unit * 16
  },
index_landingSearchHeader : {
    marginTop: theme.spacing.unit * 12,
    display: "flex",
    alignItems: "end",
    justifyContent: "left",
    color: theme.palette.primary["700"]
  },
index_appHeaderText : {
    color: theme.palette.primary["900"]
  },
index_appSubHeaderTextWrapper : {
    display: 'flex',
    justifyContent: 'center',
    zIndex: 2,
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 2
  },
index_appSubHeaderText : {
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 3
  },
index_appNameHeader : {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 1,
    flexWrap: 'wrap'
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
index_grid_item:{

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
    url: '/organization/910e5bde-1b39-4990-b4af-6e374e3df06d'
  }, {
    name: 'San Francisco',
    url: '/organization/49ab4440-1176-4791-a7cf-1e27a756488d'
  }, {
    name: 'Las Vegas',
    url: '/organization/ff101ead-22ab-4f46-97d1-07abdcc8e9fa'
  }, {
    name: 'San Jose',
    url: '/organization/d3c866ec-13f3-41da-b6dc-a74a83d36ea7'
  }, {
    name: 'San Mateo',
    url: '/organization/64398076-1dd4-4c06-bba0-f46bf893b2ae'
  }, {
    name: 'Los Angeles',
    url: '/organization/206843c1-890c-435c-85d6-5e2350200c1e'
  }, {
    name: 'Houston',
    url: '/organization/f212a1f8-d95e-4448-a6c7-659a4aa88934'
  }, {
    name: 'New York',
    url: '/organization/2c3e6f85-25ee-420d-a31b-25662e2e6a2e'
  }, {
    name: 'Philadelphia',
    url: '/organization/c91151b6-d989-4163-ab1c-f8680ad6b9f5'
  }, {
    name: 'Phoenix',
    url: '/organization/b26c8d4f-74b9-4a80-9723-d696089aea99'
  }, {
    name: 'San Diego',
    url: '/organization/1fcd5489-5736-432a-88c7-fb720b134044'
  }, {
    name: 'Seattle',
    url: '/organization/28d8e00d-ee9c-49d0-97d8-18c1bf3cc707'
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

const SuggestBoxLoader = props => (
  <ContentLoader
    height={160}
    width={800}
    speed={5}
    primaryColor="#f3f3f3"
    secondaryColor="#e0d9ff"
    {...props}>
    <rect x="99.4" y="93.83" rx="0" ry="0" width="0" height="0"/>
    <rect x="13.4" y="17.83" rx="0" ry="0" width="424" height="43"/>
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


    const backgroundImages = [ < Img title = "United States Capitol" alt = "Photo by Andy Feliciotti (@someguy) on Unsplash" sizes = {
        this.props.data.capitol.childImageSharp.fluid
      }
      backgroundColor = "#0000ca" style = {{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100vw',
          height: '85vh',
          filter: 'brightness(50%)',
        }}
      />,
      <Img
        title="Philadelphia City Hall"
        alt="Photo by BruceEmmerling on Pixabay"
        backgroundColor="#0000ca"
        sizes={this.props.data.philadelphia.childImageSharp.fluid}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100vw',
          height: '85vh',
          filter: 'brightness(60%)',
        }}
      />, <Img title = "Los Angeles City Hall" alt = "Photo from Pixabay" backgroundColor = "#0000ca" sizes = {
        this.props.data.losAngeles.childImageSharp.fluid
      }
      style = {{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100vw',
          height: '85vh',
          filter: 'brightness(70%)',
        }}
      />,
      <Img
        title="San Francisco City Hall"
        alt="Photo by Hoona9091 on Pixabay"
        backgroundColor="#0000ca"
        sizes={this.props.data.sanFrancisco.childImageSharp.fluid}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100vw',
          height: '85vh',
          filter: 'brightness(60%)',
        }}
      />
    ];
    this.bg = backgroundImages[Math.floor(Math.random() * backgroundImages.length)]
  }




  componentDidMount() {
    const {dispatch} = this.props;

    if (this.props.location.pathname === '/') {
      dispatch(getLocation);
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
          <Grid className='index_grid_item' item xs={2}>
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
      <Grid className='index_grid_item' item xs={2}>
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

    return (
      <Layout location={this.props.location}>
        <Fragment>
          <Helmet
            defaultTitle={`Localgov.fyi | Search for local government organizations, and services`}
            titleTemplate={`%s | Localgov.fyi`}>
            <meta name="og:type" content="website"/>
            <meta name="og:site_name" content="Localgov.fyi"/>
            <link
              rel="canonical"
              href={`https://localgov.fyi${this.props.location.pathname}`}/>
            <meta
              property="og:url"
              content={`https://localgov.fyi${this.props.location.pathname}`}/>
            <html lang="en"/>
          </Helmet>
          <AppBar className={classes.index_header}>
            <Toolbar className={classes.index_toolbar}>
              <Typography variant="display1" className={classes.index_title}>
                Localgov.fyi
              </Typography>
              <HeaderAccountMenu location={this.props.location} />
            </Toolbar>
          </AppBar>
          <LoginRegisterDialog location={this.props.location}/>
          <div className={classes.index_searchWrapper}>
            {this.bg}
            <Grid
              container
              spacing={0}
              className={!isMobileOnly
              ? classes.index_landingSearch
              : classes.index_landingSearchMobile}>
              <Grid className='index_grid_item' item xs={1} sm={2} md={2} />
              <Grid  item xs={10} sm={8} md={8} className={classes.index_appSubHeaderTextWrapper}>
                <Typography
                  variant="display1"
                  component="span"
                  className={classes.index_appSubHeaderText}>
                  All your government services in a single place
                </Typography>
              </Grid>
              <Grid className='index_grid_item' item xs={1} sm={2} md={2}/>
              <Grid className='index_grid_item' item xs={1} sm={2} md={2}/>
              <Grid className='index_grid_item' item xs={10} sm={10} md={8} className={classes.index_searchBoxContainer}>
                {search.locationLoading
                  ? (<SuggestBoxLoader/>)
                  : <Search/>}
              </Grid>
              <Grid item xs={1} sm={2} md={2}/>
            </Grid>
          </div>
          <div className={classes.index_section2}>
            <Grid className='index_grid' container className={classes.index_section3Mobile}>
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
                ? <div className={classes.index_progressWrapper}><CircularProgress/></div>
                : <ServiceGrid
                  clickGridItem={this.clickGridItem}
                  type='pop_services'
                  services={stateServicesConcat}/>
}
            </div>
          </div>
          <div className={classes.index_section3}>
            <Grid className='index_grid' container className={classes.index_section3Mobile}>
              <Grid className='index_grid_item' item xs={1} md={3}/>
              <Grid className='index_grid_item' item xs={10} md={6}>
                    {search.locationLoading ? null : (<Typography
                  variant="display1"
                  component="h1"
                  className={classes.index_popularServicesHeader}>
                  Localgov {org ? org.name : ''}
                </Typography>)}
              </Grid>
              <Grid item xs={1} md={3}/>
            </Grid>
            <div className={classes.index_gridWrapper2}>
              {search.locationLoading
                ? (<div className={classes.index_progressWrapper}><CircularProgress/></div>)
                : (<ServiceGrid
                  clickGridItem={this.clickGridItem}
                  type='auto_loc_org_services'
                  city={org
                  ? org
                  : null}
                  services={services
                  ? services
                  : dummyServices}/>)
}
            </div>
            <Grid className='index_grid' container className={classes.index_otherLinksDivider}>
              <Grid className='index_grid_item' item xs={2}/>
              <Grid className='index_grid_item' item xs={8}>
                <Divider/>
              </Grid>
              <Grid className='index_grid_item' item xs={2}/>
            </Grid>
            <Grid className='index_grid' container align="center">
              <Grid className='index_grid_item' item xs={2}/> {otherLinks}
              <Grid className='index_grid_item' item xs={2}/>
            </Grid>
          </div>
          <form hidden name="serviceNotify" method="post" action="/" data-netlify="true">
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
          </form>
          <form hidden name="serviceDeliveryFeedback" method="post" action="/" data-netlify="true">
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
          </form>
        </Fragment>
      </Layout>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export const query = graphql `
  query indexImageQuery {
    capitol: file(relativePath: { regex: "/capitol/"}) {
        childImageSharp {
fluid(maxWidth : 1000, duotone : {
highlight : "#4F23FF",
  shadow: "#000000",
opacity : 80
}) {
...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
    }
    philadelphia: file(relativePath: { regex: "/philadelphia/"}) {
      childImageSharp {
fluid(maxWidth : 1000, duotone : {
highlight : "#4F23FF",
  shadow: "#000000",
opacity : 80
}) {
...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
    }
    losAngeles: file(relativePath: { regex: "/losAngeles/"}) {
      childImageSharp {
fluid(maxWidth : 1000, duotone : {
highlight : "#4F23FF",
shadow : "#000000",
opacity : 80
}) {
...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
    }
    sanFrancisco: file(relativePath: { regex: "/sanFrancisco/"}) {
      childImageSharp {
fluid(maxWidth : 1000, duotone : {
highlight : "#4F23FF",
shadow : "#000000",
opacity : 80
}) {
...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
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

const ConnIndex = connect(mapStateToProps)(withRoot(withStyles(styles, {name: 'index-styles'})(Index)));

export default ConnIndex;

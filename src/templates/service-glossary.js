import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Link from 'gatsby-link';
import queryString from 'query-string'

import {navigate} from '@reach/router';

import Helmet from "react-helmet";
import {isMobileOnly, isTablet, isMobile} from 'react-device-detect';

import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Share from '@material-ui/icons/Share';
import RelatedServiceTemplates from '../components/RelatedServiceTemplates';
import Footer from '../components/Footer';
import withRoot from '../withRoot';
import Info from '@material-ui/icons/InfoOutlined';
import HeaderAccountMenu from '../components/HeaderAccountMenu';

import {NO_SEARCH_RESULTS} from '../components/common/tracking_events';
import RawForm from '../components/Reminders/RawForm';
import { fetchGoogLoc, fetchAutoLoc, clearAll} from '../components/ServiceTemplatePage/actions';
import ProptaxSvg from '../svgIcons/PropTaxIl.js';

import ParkingcitSvg from '../svgIcons/ParkingCitIl.js';
import RecreationSvg from '../svgIcons/RecreationIl.js';
import Utilitybill from '../svgIcons/utbIl.js';
import BusinessLic from '../svgIcons/businessLic.js';

import {trackView, trackClick, trackInput, trackEvent} from "../components/common/tracking";
import Suggested from '../components/ServiceTemplatePage/Suggested';
import TemplateHero from '../components/ServiceTemplatePage/TemplateHero';
import GoogAutoComplete from '../components/ServiceTemplatePage/GoogAutoComplete';
import OtherLocations from '../components/ServiceTemplatePage/OtherLocations';

const styles = theme => ({
  "@global": {
    html: {
      WebkitFontSmoothing: "antialiased", // Antialiasing.
      MozOsxFontSmoothing: "grayscale" // Antialiasing.
    },
    body: {
      height: "100%",
      overflow: "hidden",
      margin: 0,
      padding: 0,
      background: "#fff",
      overflowWrap: "break-word",
      overflowY: "scroll",
      overflowX: "hidden"
    }
  },
  ser_gloss_filterContainer: {
    padding: "16px 16px",
    margin: theme.spacing.unit,
    display: "flex",
    alignItems: "center",
    boxShadow: `0 5px 10px 0 #f1f1f1`,
    borderRadius: "5px"
  },
  ser_gloss_locGridContainer: {
    width: "100%"
  },
  ser_gloss_nav_items: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.unit
  },
  ser_gloss_locationPaper: {
    padding: theme.spacing.unit * 5,
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: theme.spacing.unit,
    boxShadow: `0 0 1px 0 #d4d4d4`
  },
  ser_gloss_loc_search_root: {
    padding: "4px 8px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    boxShadow: `0 0 1px 0 ${theme.palette.primary["300"]}`
  },
  ser_gloss_input: {
    marginLeft: 16,
    flex: 1
  },
  ser_gloss_iconButton: {
    padding: 12
  },
  ser_gloss_divider: {
    width: 1,
    height: 32,
    margin: 4
  },
  ser_gloss_gridItemLocation_mob_focus: {
    boxShadow: `0 0 3px 0px ${theme.palette.primary["600"]}`
  },
  ser_gloss_gridItemLocation_focus: {
    cursor: "pointer",
    padding: theme.spacing.unit * 2,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    margin: theme.spacing.unit * 2,
    justifyContent: "left",
    width: 320,
    height: 104,
    boxShadow: `0 0 4px 0px ${theme.palette.primary["600"]}`
  },
  ser_gloss_titleWrapper: {
    textAlign: "center",
    padding: theme.spacing.unit * 4,
    margin: theme.spacing.unit * 2
  },
  ser_gloss_subtitle: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 4
  },
  ser_gloss_section: {
    marginBottom: theme.spacing.unit
  },
  ser_gloss_link: {
    padding: theme.spacing.unit
  },
  ser_gloss_locGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: theme.spacing.unit * 4
  },
  ser_gloss_app_name: {
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary["700"]
    }
  },
  ser_gloss_gridItemLocation: {
    cursor: "pointer",
    padding: theme.spacing.unit * 2,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    margin: theme.spacing.unit * 2,
    boxShadow: `0 0px 1px 0 ${theme.palette.primary["200"]}`,
    justifyContent: "left",
    width: 320,
    height: 104
  },
  ser_gloss_locGrid_list: {
    width: "100%",
    margin: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.paper
  },
  ser_gloss_heading: {
    fontWeight: 600
  },
  ser_gloss_listItem: {
    display: "flex",
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2
  },
  ser_gloss_countContainer: {
    marginTop: theme.spacing.unit * 2
  },
  ser_gloss_footer: {
    borderTop: `1px solid #dcdcdc`,
    paddingTop: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4
  },
  ser_gloss_relatedSerDivider: {
    marginTop: theme.spacing.unit * 2,
    borderTop: `1px solid #dcdcdc`
  },
  ser_gloss_state_name: {
    color: "#4c4d55"
  },
  ser_gloss_related_container: {
    margin: `${theme.spacing.unit * 2}px  ${theme.spacing.unit * 10}px ${theme
      .spacing.unit * 4}px ${theme.spacing.unit * 10}px`
  }
});

const RawHTML = ({
    children,
    className = ""
}) => (<div
    className={className}
    dangerouslySetInnerHTML={{
    __html: children.replace(/\n/g, " ")
}}/>);

const genericFSchema = {
    "type": "object",
    "required": ["email"],
    "properties": {
        "locations": {
            "type": "string",
            "title": "Location(s)"
        },
        "services": {
            "type": "string",
            "title": "Services(s)"
        },
        "email": {
            "type": "email",
            "title": "Email"
        },
        "name": {
            "type": 'string',
            "title": "Name"
        },
        "path": {
            "type": 'string',
            "title": "path"
        }
    }
}

class ServiceGlossary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            copied: false,
            openDescDialog: false,
            foundDevice: false,
            isMobile: false
        }

        this.handleOrgClick = this
            .handleOrgClick
            .bind(this);
        this.onSearchChange = this
            .onSearchChange
            .bind(this);

    }
   


    onSearchChange(ev) {
        ev.preventDefault();
        const {location} = this.props;
        const searchValues = queryString.parse(location.search);

        const value = ev.target.value;
        if (value && value.length > 1) {
            this
                .props
                .trackFeedback(value);
        }

        let uri = `?searchText=${value}`;

        if (searchValues.stateName) {
            uri = `?searchText=${value}&stateName=${searchValues.stateName}`;
        }

        const encodedSearchUri = encodeURI(uri);
        navigate(encodedSearchUri);
    }

    componentDidMount() {
        const { id } = this.props.pageContext.data;
      this.setState({ isMobile: isMobileOnly, foundDevice: true })
        this.props.clearAll();
        this.props.trackView();
        this.props.autoGetLoc(id);
    }

    handleOrgClick(id, name, index, url) {
        this.props.trackClick('service_glossary', 'list', id, name, index);
        navigate(url);
    }

    render() {
        const {classes} = this.props;
        const { id,  service_name, service_name_slug, service_glossary_description, orgs, views} = this.props.pageContext.data;

        const userLocReqFormRaw = <RawForm  
            field_schema={JSON.stringify(genericFSchema)}
            id="user_request_missing_loc_ser"/>

      const { anchorEl, copied } = this.state;
      let icon = null;
      let mobIcon = null;
      const windowGlobal = typeof window !== 'undefined' && window;
      const windowLocation = windowGlobal.location
        ? windowGlobal.location
        : {};

      const shareLink = windowLocation.href;

      const shareButton = (
        <IconButton
          color="primary"
          size="small"
          className={classes.ser_gloss_menu_button}
          onClick={this.handleShareClick}
          aria-label="share">
          <Share className={classes.ser_gloss_share} fontSize="small" />
        </IconButton>
      )

      const learnMoreButton = (
        <IconButton
          color="primary"
          size="small"
          className={classes.ser_gloss_learn_more}
          onClick={this.toggleDescDialog}
          aria-label="share">
          <Info className={classes.ser_gloss_share} fontSize="small" />
        </IconButton>
      )
      const lowerCaseName = service_name.toLowerCase();

      if (lowerCaseName.indexOf('tax') !== -1) {
        icon = (<ProptaxSvg style={{ fontSize: '224px' }} />);
        mobIcon = (<ProptaxSvg style={{ fontSize: '48px' }} />)
      } else if (lowerCaseName.indexOf('parking') !== -1) {
        icon = (<ParkingcitSvg style={{ fontSize: '224px' }} />)
        mobIcon = (<ParkingcitSvg style={{ fontSize: '48px' }} />)
      } else if (lowerCaseName.indexOf('license') !== -1) {
        icon = (<BusinessLic style={{ fontSize: '224px' }} />)
        mobIcon = (<BusinessLic style={{ fontSize: '48px' }} />)
      } else if (lowerCaseName.indexOf('utility') !== -1 || lowerCaseName.indexOf('water') !== -1) {
        icon = (<Utilitybill style={{ fontSize: '224px' }} />)
        mobIcon = (<Utilitybill style={{ fontSize: '48px' }} />)
      } else if (lowerCaseName.indexOf('recreation') !== -1 || lowerCaseName.indexOf('recreational') !== -1) {
        icon = (<RecreationSvg style={{ fontSize: '224px' }} />)
        mobIcon = (<RecreationSvg style={{ fontSize: '48px' }} />)
      }   

      let showIcon = null;
  
      if (this.state.foundDevice && !this.state.isMobile){
        showIcon = icon;
      }

        return (
          <Fragment>
            <Helmet>
              <title>{`${service_name} | Evergov`}</title>
              <link
                rel="canonical"
                href={`https://evergov.com/services/${service_name_slug}/`}
              />

              <meta
                property="og:title"
                content={`${service_name} | Evergov`}
              />
              <meta
                property="og:url"
                content={`https://evergov.com/services/${service_name_slug}/`}
              />

              <meta
                name="description"
                content={`Forms, Price, Timings and Contact Details for ${service_name} | Evergov`}
              />
              <meta
                name="keywords"
                content={`${service_name}, ${service_name} online, Local Government Service Onine, my ${service_name}, ${service_name} near me, How do you ${service_name}, can you ${service_name} onine, ${service_glossary_description}`}
              />
              <meta
                property="og:description"
                content={`Forms, Price, Timings and Local Government Service Contact Details for ${service_name} | Evergov`}
              />
            </Helmet>
            {userLocReqFormRaw}

            <Grid container className={classes.ser_gloss_search}>
              <Grid item sm={1} />
              <Grid
                item
                xs={12}
                sm={10}
                className={classes.ser_gloss_nav_items}
              >
                <Typography variant="title">
                  <Link to="/" className={classes.ser_gloss_app_name}>
                    evergov
                </Link>
                </Typography>
                {this.state.isMobile && (
                  <div className={classes.ser_gloss_service_mob_actions}>
                    {shareButton}
                    {learnMoreButton}
                  </div>
                )}
                <HeaderAccountMenu location={this.props.location} />
              </Grid>
              <Grid item sm={1} />

              <Grid item xs={1} />
              <Grid item xs={12} md={6}>
                <TemplateHero
                  views={views}
                  orgsCnt={orgs.length}
                  service_name={service_name}
                  trackClick={this.trackClick}
                  service_glossary_description={
                    service_glossary_description
                  }
                />
              </Grid>
              <Grid item xs="auto" md={4} align="right">
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {showIcon}
                </div>
              </Grid>
              <Grid item xs={1} />

              <Grid item xs={12}>
                <GoogAutoComplete serviceTemplateId={id} />
              </Grid>
              <Grid item xs={12}>
                <Suggested service_name={service_name} handleOrgClick={this.handleOrgClick} />
              </Grid>
              <Grid item xs={12}>
                <OtherLocations allOrgs={orgs} />
              </Grid>
            </Grid>

            <Grid
              container
              className={classes.ser_gloss_relatedServiceContainer}
            >
              <Grid item xs={1} />
              <Grid item xs={10}>
                <div className={classes.ser_gloss_relatedSerDivider} />
                <Typography
                  style={{
                    padding: "32px 0 16px 0"
                  }}
                  variant="title"
                  component="h5"
                >
                  More Services
                </Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid
                item
                xs={12}
                className={classes.ser_gloss_related_container}
              >
                <RelatedServiceTemplates
                  currentNameSlug={service_name_slug}
                  showAdd={true}
                />
              </Grid>
            </Grid>
            <div className={classes.ser_gloss_footer}>
              <Footer page={this.props.location.pathname} />
            </div>
          </Fragment>
        );
    }
}

ServiceGlossary.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
      trackView: (click_type, resultType, id, title, listIndex) => {
        dispatch(trackView("service_glossary", null, null, null));
      },
      trackClick: (click_type, resultType, id, title, listIndex) => {
        dispatch(trackClick(click_type, resultType, id, title, listIndex));
      },
      trackFeedback: input => {
        dispatch(trackInput("service_glossary_search", input));
      },
      trackEvent: (evName, data) => {
        dispatch(trackEvent(evName, data));
      },
      autoGetLoc: serviceTemplateId => {
        dispatch(fetchAutoLoc(serviceTemplateId));
      },
      setGoogLoc: (serviceTemplateId, lat, lng) => {
        dispatch(fetchGoogLoc(serviceTemplateId, lat, lng));
      },
      clearAll: () =>{
          dispatch(clearAll());
      }
    };
}

const mapStateToProps = function (state, ownProps) {
    return {
        serTemplate: state.serTemplate,
        ...ownProps
    };
};

const ConnServiceGlossary = connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(ServiceGlossary)));

export default ConnServiceGlossary;
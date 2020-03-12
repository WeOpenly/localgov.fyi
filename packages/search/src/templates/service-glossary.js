import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Link from "gatsby-link";
import queryString from "query-string";

import { navigate } from "@reach/router";

import Helmet from "react-helmet";

import RelatedServiceTemplates from "../components/RelatedServiceTemplates";

import {
  fetchGoogLoc,
  fetchAutoLoc,
  clearAll
} from "../components/ServiceTemplatePage/actions";

import ProptaxSvg from "../svgIcons/PropTaxIl.js";
import ParkingcitSvg from "../svgIcons/ParkingCitIl.js";
import RecreationSvg from "../svgIcons/RecreationIl.js";
import Utilitybill from "../svgIcons/utbIl.js";
import BusinessLic from "../svgIcons/businessLic.js";

import FooterNew from "../components/FooterNew";
import {
  trackView,
  trackClick,
  trackInput,
  trackEvent
} from "../components/common/tracking";
import Suggested from "../components/ServiceTemplatePage/Suggested";
import TemplateHero from "../components/ServiceTemplatePage/TemplateHero";
import GoogAutoComplete from "../components/ServiceTemplatePage/GoogAutoComplete";
import OtherLocations from "../components/ServiceTemplatePage/OtherLocations";

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";
import Corona from "../components/Banner/Corona";

const RawHTML = ({ children, className = "" }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{
      __html: children.replace(/\n/g, " ")
    }}
  />
);

class ServiceGlossary extends Component {
  constructor(props) {
    super(props);
    this.handleOrgClick = this.handleOrgClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(ev) {
    ev.preventDefault();
    const { location } = this.props;
    const searchValues = queryString.parse(location.search);

    const value = ev.target.value;
    if (value && value.length > 1) {
      this.props.trackFeedback(value);
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
    this.props.clearAll();
    this.props.trackView();
    this.props.autoGetLoc(id);
  }

  handleOrgClick(id, name, index, url) {
    this.props.trackClick("service_glossary", "list", id, name, index);
    navigate(url);
  }

  render() {
    const { classes } = this.props;
    const {
      id,
      service_name,
      service_name_slug,
      service_glossary_description,
      orgs,
      views
    } = this.props.pageContext.data;

    let icon = null;
    let mobIcon = null;

    const lowerCaseName = service_name.toLowerCase();

    if (lowerCaseName.indexOf("tax") !== -1) {
      icon = <ProptaxSvg style={{ width: "180px", height: "180px" }} />;
      mobIcon = <ProptaxSvg style={{ width: "48px", height: "48px" }} />;
    } else if (lowerCaseName.indexOf("parking") !== -1) {
      icon = <ParkingcitSvg style={{ width: "260px", height: "150px" }} />;
      mobIcon = <ParkingcitSvg style={{ width: "48px", height: "48px" }} />;
    } else if (lowerCaseName.indexOf("license") !== -1) {
      icon = <BusinessLic style={{ width: "196px", height: "150px" }} />;
      mobIcon = <BusinessLic style={{ width: "48px", height: "48px" }} />;
    } else if (
      lowerCaseName.indexOf("utility") !== -1 ||
      lowerCaseName.indexOf("water") !== -1
    ) {
      icon = <Utilitybill style={{ width: "160px", height: "180px" }} />;
      mobIcon = <Utilitybill style={{ width: "48px", height: "48px" }} />;
    } else if (
      lowerCaseName.indexOf("recreation") !== -1 ||
      lowerCaseName.indexOf("recreational") !== -1
    ) {
      icon = <RecreationSvg style={{ width: "180px", height: "150px" }} />;
      mobIcon = <RecreationSvg style={{ width: "48px", height: "48px" }} />;
    }

    let showIcon = null;

    if (!this.props.isMobile) {
      showIcon = icon;
    }

    const hieLinks = (
      <ul
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className={styles.breadcrumb}
      >
        <li
          itemScope
          itemProp="itemListElement"
          itemType="https://schema.org/ListItem"
          className={styles.breadcrumbItem}
        >
          <a itemProp="item" itemType="https://schema.org/WebPage" href="/">
            {" "}
            <span itemProp="name">Home</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>
        <li
          itemScope
          itemProp="itemListElement"
          itemType="https://schema.org/ListItem"
          className={styles.breadcrumbItem}
        >
          <a
            itemProp="item"
            itemType="https://schema.org/WebPage"
            href="/services"
          >
            <span itemProp="name">Services</span>
          </a>
          <meta itemProp="position" content="2" />
        </li>
      </ul>
    );

    return (
      <Fragment>
        <Helmet>
          <title>{`${service_name} | papergov`}</title>
          <link
            rel="canonical"
            href={`https://papergov.com/services/${service_name_slug}/`}
          />

          <meta property="og:title" content={`${service_name} | papergov`} />
          <meta
            property="og:url"
            content={`https://papergov.com/services/${service_name_slug}/`}
          />

          <meta name="description" content={service_glossary_description} />
          <meta
            name="keywords"
            content={`${service_name}, ${service_name} online, Local Government Service Onine, my ${service_name}, ${service_name} near me, How do you ${service_name}, can you ${service_name} onine, ${service_glossary_description}`}
          />
          <meta
            property="og:description"
            content={`Forms, Price, Timings and Local Government Service Contact Details for ${service_name} | papergov`}
          />
        </Helmet>

        <div
          className={`${styles.container}`}
          style={{ background: "#f8f9fc" }}
        >
          <div className={`${styles.columns} ${styles.hideMd}`}>
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              className={`${styles.column} ${styles.col10}`}
              style={{
                padding: "0.7rem 0rem 0.7rem 1rem"
              }}
            >
              <a style={{ textDecoration: "none" }} href="/">
                <h4>papergov</h4>
              </a>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              className={`${styles.column} ${styles.col10}`}
              style={{
                marginTop: "1rem",
                padding: "2rem",
                background: "rgba(233,180,255,.15)",
                transition: "opacity .2s ease-in-out",
                borderRadius: "0.8rem",
                boxShadow: "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)"
              }}
            >
              <TemplateHero
                id={id}
                hieLinks={hieLinks}
                views={views}
                isMobile={this.props.isMobile}
                orgsCnt={orgs.length}
                icon={icon}
                service_name={service_name}
                trackClick={this.trackClick}
                service_glossary_description={service_glossary_description}
              />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              className={`${styles.column} ${styles.col10}`}
              style={{
                margin: "3rem 0 2rem 0"
              }}
            >
              <Suggested
                isMobile={this.props.isMobile}
                service_name={service_name}
                handleOrgClick={this.handleOrgClick}
              />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              className={`${styles.column} ${styles.col10}`}
              style={{
                margin: "0rem 0 2rem 0"
              }}
            >
              <OtherLocations isMobile={this.props.isMobile} allOrgs={orgs} />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              className={`${styles.column} ${styles.col10}`}
              style={{
                marginTop: "3rem",
                padding: "1.5rem"
              }}
            >
              <RelatedServiceTemplates
                isMobile={this.props.isMobile}
                currentNameSlug={service_name_slug}
                showAdd={true}
              />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>
          <div className={`${styles.columns} ${styles.showMd}`}>
            <div
              style={{
                padding: "0.5rem 0rem 0.5rem 0.5rem"
              }}
              className={`${styles.column} ${styles.col12}`}
            >
              <a style={{ textDecoration: "none" }} href="/">
                <h4>papergov</h4>
              </a>
            </div>

            <div
              style={{
                marginTop: "0.5rem",
                padding: "1.5rem",
               
                transition: "opacity .2s ease-in-out",
                borderRadius: "0.8rem",
              
              }}
              className={`${styles.column} ${styles.col12}`}
            >
              <TemplateHero
                hieLinks={hieLinks}
                id={id}
                views={views}
                isMobile={this.props.isMobile}
                orgsCnt={orgs.length}
                service_name={service_name}
                trackClick={this.trackClick}
                service_glossary_description={service_glossary_description}
              />
            </div>

            <div
              className={`${styles.column} ${styles.col12}`}
              style={{
           
                padding: "1rem"
              }}
            >
              <Suggested
                isMobile={this.props.isMobile}
                service_name={service_name}
                handleOrgClick={this.handleOrgClick}
              />
            </div>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{
                marginTop: "3rem",
                padding: "1rem"
              }}
            >
              <OtherLocations isMobile={this.props.isMobile} allOrgs={orgs} />
            </div>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{
                marginTop: "3rem",
                padding: "1.5rem"
              }}
            >
              <RelatedServiceTemplates
                isMobile={this.props.isMobile}
                currentNameSlug={service_name_slug}
                showAdd={true}
              />
            </div>
          </div>
          <FooterNew page={this.props.location.pathname} />
          <Corona />
          {/* <Banner title="hello" button={"button"} /> */}
        </div>
      </Fragment>
    );
  }
}

ServiceGlossary.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
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
    clearAll: () => {
      dispatch(clearAll());
    }
  };
};

const mapStateToProps = function(state, ownProps) {
  return {
    serTemplate: state.serTemplate,
    ...ownProps
  };
};

const ConnServiceGlossary = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceGlossary);

export default ConnServiceGlossary;

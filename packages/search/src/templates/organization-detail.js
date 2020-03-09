import React, { Fragment } from "react";
import { connect } from "react-redux";

import Helmet from "react-helmet";
import { Link } from "gatsby";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MiniOrgDetail from "../components/MiniOrgDetail";

import withRoot from "../withRoot";
import OrgHeader from "../components/OrgHeader";

import SearchNav from "../components/Nav/Search";

import ServiceDetail from "../components/ServicePage/ServiceDetail";
import ServiceHeader from "../components/ServicePage/ServiceHeader";

import MediaNetAd from "../components/MediaNetAd";

import FooterNew from "../components/FooterNew";

import AttachmentList from "../components/AttachmentList";
import MoreLinks from "../components/ServicePage/MoreLinks";

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";

// import MemberListItem from '../components/MemberListItem';
import ServiceCard from "../components/ServiceCard";
import { trackView, trackClick } from "../components/common/tracking";

const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

class OrganizationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: ""
    };
    this.changeFilter = this.changeFilter.bind(this);
  }

  changeFilter(filter) {
    const { dispatch } = this.props;
    this.setState({ selectedFilter: filter });
    dispatch(trackClick("tag_filter", "service", filter, filter, 0));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { id, name } = this.props.pageContext.data;
    dispatch(trackView("entity_detail", "organization", id, name));
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
    const { isMobile } = this.props;
    const name = org_name;
    const services = hierarchial_service_details;
    const { hierarchy } = area;

    const { logoSizes } = this.props.pageContext;

    let otherOrgsFromState = null;
    if (other_orgs_from_state) {
      otherOrgsFromState = (
        <div
          style={{
            display: "flex",
            marginTop: "24px",
            marginBottom: "24px",
            justifyContent: "space-evenly",
            flexWrap: "wrap"
          }}
        >
          {other_orgs_from_state.map((item, idx) => {
            return (
              <div
                style={{
                  minWidth: "200px",
                  minHeight: "40px",
                  display: "flex",
                  flexWrap: "wrap"
                }}
              >
                <a href={`/${item.url_slug}`}>
                  <Typography variant="body2" style={{ fontSize: "1.1rem" }}>
                    {item.area.name}
                  </Typography>
                </a>
              </div>
            );
          })}
        </div>
      );
    }

    let orgLogoSvg = null;
    if (logoSizes && logoSizes.fluid) {
      orgLogoSvg = logoSizes.fluid;
    }

    const { classes } = this.props;
    let contactDetailComponent = null;
    let state = "";

    if (hierarchy.length > 1 && hierarchy[hierarchy.length - 1].area_name) {
      state = `State of ${hierarchy[hierarchy.length - 1].area_name}`;
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

    let cd = [];
    let sameAs = [];
    if (contact_details) {
      cd = contact_details;
    }
    cd.forEach(detail => {
      let type = detail.contact_type;
      sameAs.push(detail.contact_value);
      if (type === "ADDRESS") {
        contactSchema["address"] = detail.contact_value;
      } else if (type === "PHONE") {
        contactSchema["phone"] = detail.contact_value;
      }
    });

    let allServiceList = [];
    if (services.length > 0) {
      services.map((detailsAtLevel, index) => {
        let serviceListComp = null;
        let serCards = null;
        let orgTitle = null;

        if ("services" in detailsAtLevel) {
          let servicesAtLevel = detailsAtLevel.services || [];
          servicesAtLevel = servicesAtLevel.filter(service => {
            const deliveryLink =
              service.service_del_links && service.service_del_links[0]
                ? service.service_del_links[0]
                : null;
            if (this.state.selectedFilter) {
              return (
                deliveryLink &&
                deliveryLink.link_name
                  .toLowerCase()
                  .includes(this.state.selectedFilter.toLowerCase())
              );
            }
            return service;
          });

          serCards = servicesAtLevel.map((ser, idx) => {
            const deliveryLink =
              ser.service_del_links && ser.service_del_links[0]
                ? ser.service_del_links[0]
                : null;

            return (
              <ServiceCard
                isMobile={isMobile}
                resultType="service"
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

        if ("org" in detailsAtLevel) {
          if (detailsAtLevel.org && "name" in detailsAtLevel.org) {
            const { name: orgName } = detailsAtLevel.org;
            const orgHeading = <h5>Services offered by {orgName}</h5>;

            let orgSubheading = <p>More services available here</p>;
            if (orgName.toLowerCase().includes("county")) {
              orgSubheading = (
                <p>Find services from the County agencies of {orgName}</p>
              );
            } else if (orgName.toLowerCase().includes("state")) {
              orgSubheading = (
                <p>
                  Find services provided by the State agencies for all its
                  residents
                </p>
              );
            }
            orgTitle = (
              <Fragment>
                {orgHeading}
                <div style={{paddingRight: '1rem'}}>{index > 0 ? orgSubheading : null}</div>
              </Fragment>
            );
          }
        }

        serviceListComp = (
          <div style={{ margin: "3rem 0 0 0" }}>
            {index >= 0 && (
              <>
                <div style={{ marginBottom: "0.5rem", padding: "0 1rem" }}>
                  {orgTitle}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, 300px)"
                  }}
                >
                  {serCards}
                </div>
              </>
            )}
          </div>
        );

        if (serviceListComp && serCards.length) {
          allServiceList.push(serviceListComp);
        }
        return null;
      });
    }

    const jsonLd = {
      "@context": "http://schema.org",
      "@id": `https://papergov.com/${url_slug}/`,
      "@type": "Organization",
      name: `${name}`,
      sameAs: sameAs,
      ...contactSchema
    };

    return (
      <>
        <Helmet>
          <script type="application/ld+json">{`${JSON.stringify(
            jsonLd
          )}`}</script>
          <title>{`${name} info, contact details and services | papergov`}</title>
          <meta
            name="description"
            content={`${name} info, county / city hall contact details, utilities, and services`}
          />
          <meta
            name="keywords"
            content={`${name} online, info , local government services`}
          />
          <meta property="og:title" content={`${name}`} />
          <meta
            property="og:url"
            content={`https://papergov.com/${url_slug}/`}
          />
          <meta
            property="og:description"
            content={`${name} info, contact details and services`}
          />
          <link rel="canonical" href={`https://papergov.com/${url_slug}/`} />
        </Helmet>
        <div
          className={`${styles.container}`}
          style={{ background: "#f8f9fc" }}
        >
          <div className={`${styles.columns} ${styles.hideMd}`}>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ background: "#fff" }}
            >
              <SearchNav />
            </div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              className={`${styles.column} ${styles.col10}`}
              style={{
                marginTop: "3rem"
              }}
            >
              <div className={styles.columns}>
                <div
                  className={`${styles.column} ${styles.col12}`}
                  style={{
                    padding: "2rem",
                    background: "rgba(233,180,255,.15)",
                    transition: "opacity .2s ease-in-out",
                    borderRadius: "0.8rem",
                    boxShadow:
                      "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)"
                  }}
                >
                  {contactDetailComponent}
                </div>
                <div className={`${styles.column} ${styles.col5}`}>
                  {allServiceList.length
                    ? allServiceList
                    : "No services found."}
                </div>
                <div className={`${styles.column} ${styles.col7}`}>faqs</div>
                <div className={`${styles.column} ${styles.col12}`}>
                  {otherOrgsFromState}
                </div>
              </div>
            </div>
          </div>
          <FooterNew isMobile={isMobile} page={this.props.location.pathname} />
        </div>
      </>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(
  withRoot(withStyles(styles)(OrganizationDetail))
);

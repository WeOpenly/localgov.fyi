import React, { Fragment } from "react";

import { connect } from "react-redux";
import Helmet from "react-helmet";

import Link from "gatsby-link";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import SearchNav from "../components/Nav/Search";

import ContentLoader from "react-content-loader";

import ServiceDetail from "../components/ServiceDetail";
import DetailTemplate from "../components/detailTemplate";
import ServiceHeader from "../components/ServiceHeader";
import GlossaryCard from "../components/ServicePage/GlossaryCard";

import MediaNetAd from "../components/MediaNetAd";

import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import AttachmentList from '../components/AttachmentList';

import MoreLinks from "../components/ServicePage/MoreLinks";

import withRoot from "../withRoot";
import { trackView } from "../components/common/tracking";
import specStyles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;

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
      background: "#fff",
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
    }
  },
  ser_detail_container: {
    marginTop: theme.spacing.unit * 2,
    maxWidth: "1000px"
  },
  ser_detail_details: {
    width: "100%",
    lineHeight: '1.3rem',
  },
  ser_detail_cardWrapper: {
    borderRadius: 3,
    boxShadow: `0 0 0 0`,
    border: `1px solid ${theme.palette.primary["50"]}`
  },
  ser_detail_body: {
    marginTop: "16px",
    marginBottom: "16px",
    paddingLeft: `${theme.spacing.unit * 4}px`,
    paddingRight: `${theme.spacing.unit * 4}px`,
    boxShadow: `0 .15rem 0.5rem rgba(48,55,66,.10)`,
    background: "#fff"
  },
  ser_detail_body_mob: {
      background: "#fff",
    paddingLeft: `${theme.spacing.unit * 1}px`,
    paddingRight: `${theme.spacing.unit * 1}px`
  },
  ser_detail_cards: {
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
    borderRadius: 3,
    boxShadow: `0 0 0 0`
    // border: `1px solid ${theme.palette.primary['50']}`,
  },
  ser_detail_serviceItemIcon: {
    padding: 8
  },
  ser_detail_cardContent: {
    marginLeft: theme.spacing.unit * 3,
    padding: theme.spacing.unit / 2
  },
  ser_detail_dividerWrapper: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  },
  ser_detail_iconWrapper: {
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2
  },
  ser_goback_button: {
    border: "none",
    "&:hover": {
      background: "none"
    },
    marginLeft: theme.spacing.unit * -6
  },
  ser_detail_icon: {
    fontSize: 24,
    color: theme.palette.primary["200"]
  },
  ser_detail_formLink: {
    textDecoration: "underline",
    textDecorationColor: "#0000EE"
  },
  ser_detail_otherServicesDividerWrapper: {
    marginBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  },
  other_ser_headerWrapper: {
    display: "flex",
    justifyContent: "left",
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  other_ser_card: {
    marginBottom: theme.spacing.unit * 2,
    boxShadow: "0 0 0 0",
    border: `1px solid ${theme.palette.primary["50"]}`
  },
  other_ser_cardContent: {
    marginBottom: theme.spacing.unit * -2
  },
  other_ser_cardTitle: {
    fontWeight: 600
  },
  other_ser_caption: {
    height: 40,
    overflowY: "hidden",
    color: "rgba(30, 30, 50, 0.75)"
  },
  other_ser_serviceLink: {
    textDecoration: "none"
  },
  other_ser_cardActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  other_ser_linkWrapper: {
    margin: theme.spacing.unit * 2,
    display: "flex",
    justifyContent: "left",
    width: "100%"
  },
  other_ser_link: {
    color: theme.palette.primary["500"],
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  other_ser_linkText: {
    color: theme.palette.primary["500"]
  },
  other_ser_raw: {
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  ser_detail_loading_spinner: {},
  service_detail_footer: {
    paddingTop: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4
  },
  serviceDetailStepNumber: {
    marginRight: theme.spacing.unit * 2
  },
  ser_detail_footer: {
    width: "100%",
  },
  ser_detail_morelinks: {
    borderTop: `1px solid #dcdcdc`,
    paddingTop: theme.spacing.unit,
    marginTop: theme.spacing.unit * 6
  }
});

const genericFSchema = {
  type: "object",
  title: "Get notified from us about this service",
  description: "Get notified from us about this service",
  required: ["email"],
  properties: {
    email: {
      type: "string",
      title: "Email"
    }
  }
};

const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data)
    }}
  />
);

const RawHTML = ({ children, className = "" }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{
      __html: children.replace(/\n/g, " ")
    }}
  />
);

class ServiceDetailTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      logincheckloading: true
    };
    this.slugify = this.slugify.bind(this);
  }

  componentDidMount() {
    const { dispatch, isMobile } = this.props;
    const { userRequests } = this.props;
    const { showNotifyDialog } = userRequests;
    const { id, name } = this.props.pageContext.data;
    dispatch(trackView("entity_detail", "service", id, name));

    if (windowGlobal) {
  
      if (this.desktopinstance2) {
        windowGlobal.atOptions = {
          key: "4b3335c41092aeff9cbb352a65422c25",
          format: "iframe",
          height: 600,
          width: 160,
          params: {}
        };

        let desktopinstanceexternalJs =
          "//www.bcloudhost.com/4b3335c41092aeff9cbb352a65422c25/invoke.js";

        const script = document.createElement("script");
        script.src = desktopinstanceexternalJs;
        script.async = true;
        this.desktopinstance2.appendChild(script);
      }



    }
  }

  slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  componentWillUnmount() {
    // if (this.state.notifyInterval && windowGlobal){
    //     const notifyInterval = this.state.notifyInterval;
    //     windowGlobal.clearTimeout(notifyInterval);
    // }
  }

  render() {
    const {
      id,
      url_slug,
      name,
      service_delivery_enabled,
      allForms,
      allSteps,
      description,
      contact_details,
      price,
      alllocations,
      alltimings,
      allfaq,
      org_id,
      org_slug,
      org_name,
      service_del_links,
      service_parent,
      state_org_details,
      service_attachments,
      service_reminder_bp_json,
      otherServices,
      logoSizes,
      org_area_hie,
      views,
      org_logo_sizes
    } = this.props.pageContext.data;

    const { classes, isMobile } = this.props;

    let orgLogoSvg = null;
    if (org_logo_sizes && org_logo_sizes.fluid) {
      orgLogoSvg = org_logo_sizes.fluid;
    }

    let orgHieComp = null;
    let orgHieSlug = null;

    if (org_area_hie.length === 1) {
      orgHieComp = (
        <Link style={{ color: "#6F47FF" }} to={state_org_details.url_slug}>
          {org_name}
        </Link>
      );
      orgHieSlug = org_name;
    } else {
      if (org_area_hie.length) {
        orgHieComp = (
          <span>
            <Link style={{ color: "#6F47FF" }} to={org_slug}>
              {org_name}
            </Link>
            ,{" "}
            <Link style={{ color: "#6F47FF" }} to={state_org_details.url_slug}>
              {org_area_hie[org_area_hie.length - 1].area_name}
            </Link>
          </span>
        );
        orgHieSlug = `${org_name}, ${org_area_hie[org_area_hie.length - 1].area_name}`;
      }
    }

    let serRemFormRaw = null;


    let serRemFormCard = null;


    let serLogoSvg = null;
    if (logoSizes && logoSizes.sizes) {
      serLogoSvg = logoSizes.sizes;
    }

    let locList = null;

    const serDel = service_del_links.map((link, idx) => {
      return {
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${link.url}`,
            inLanguage: "en-US",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/IOSPlatform",
              "http://schema.org/AndroidPlatform"
            ]
          },
          result: {
            "@type": "Reservation",
            name: `${link.link_name}`
          }
        }
      };
    });

    const serviceDeliveryFeedbackForm = (
      <form
        hidden
        name="serviceDeliveryFeedback"
        method="post"
        action="/"
        data-netlify="true"
      >
        <p hidden>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </p>
        <p hidden>
          <label>
            Don’t fill this out: <input name="path" type="text" value="" />
          </label>
        </p>
        <p hidden>
          <label>
            Don’t fill this out: <input name="satisfied" type="text" value="" />
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
            Don’t fill this out: <input name="email" type="email" value="" />
          </label>
        </p>
      </form>
    );

    const jsonLd = {
      "@context": "http://schema.org",
      "@type": "GovernmentService",
      "@id": `https://papergov.com/${url_slug}/`,
      name: `${name}`,
      serviceOperator: {
        "@context": "http://schema.org",
        "@id": `https://papergov.com/${org_slug}/`,
        "@type": "GovernmentOrganization",
        name: `${org_name}`
      }
    };

    if (serDel.length > 0) {
      jsonLd["potentialAction"] = serDel[0]["potentialAction"];
    }

    let hieLinks = null;

    let actionCard = null;

    if (service_parent) {
      const { name, description, logo_url } = service_parent;
      const service_parent_slug = this.slugify(name);

      actionCard = (
        <GlossaryCard
          isMobile={isMobile}
          name={name}
          description={description}
          logoUrl={logo_url}
        />
      );
      hieLinks = (
        <ul
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className={specStyles.breadcrumb}
        >
          <li
            itemScope
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
            className={specStyles.breadcrumbItem}
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
            className={specStyles.breadcrumbItem}
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
          {name ? (
            <li
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
              className={specStyles.breadcrumbItem}
            >
              <a
                itemProp="item"
                itemType="https://schema.org/WebPage"
                href={`/services/${service_parent_slug}`}
              >
                <span itemProp="name">{name}</span>
              </a>
              <meta itemProp="position" content="3" />
            </li>
          ) : null}
        </ul>
      );
    }

    let serHeader = null;
    if (name) {
      serHeader = (
        <ServiceHeader
          isMobile={isMobile}
          name={name}
          views={views}
          service_delivery_enabled={service_delivery_enabled}
          id={id}
          orgLogoSvg={orgLogoSvg}
          offeredIn={orgHieSlug}
          orgNameOnly={org_name}
          orgID={org_id}
          orgHieComp={orgHieComp}
          hieLinks={hieLinks}
          info={contact_details}
          serDelLinks={service_del_links}
          logoSizes={serLogoSvg}
        />
      );
    }
    
    let serAtts = null;
    if (service_attachments) {
      const attMap = {};

      service_attachments.forEach(item => {
        const key = item.group;
        const collection = attMap[key];
        if (!collection) {
          attMap[key] = [item];
        } else {
          collection.push(item);
        }
      });

      serAtts = <AttachmentList key="att-list" attMap={attMap} />;
    }

    let backButton = null;

    return (
      <>
        <Helmet>
          <title>{`${name} | ${org_name} | papergov`}</title>
          {allfaq.length > 0 ? (
            <html itemScope itemType="https://schema.org/FAQPage" />
          ) : null}

          <script type="application/ld+json">{`${JSON.stringify(
            jsonLd
          )}`}</script>
          <link rel="canonical" href={`https://papergov.com/${url_slug}/`} />
          <meta
            property="og:title"
            content={`${name} | ${org_name} | papergov`}
          />
          <meta
            property="og:url"
            content={`https://papergov.com/${url_slug}/`}
          />

          {description ? (
            <meta name="description" content={description.substr(0, 300)} />
          ) : (
            <meta
              name="description"
              content={`${name} online in ${org_name} seamlessly with papergov. Be it property taxes, utility bills, tickets or permits and licenses, you can find them all on papergov.`}
            />
          )}
          <meta
            name="keywords"
            content={`${name} online , ${org_name} services `}
          />
          <meta
            property="og:description"
            content={`Forms, Price, Checklist, FAQS, Timings and Local Government Service Contact Details for ${name} offered in ${org_name} | papergov`}
          />
        </Helmet>

        <Grid container style={{ background: "#f9fafc" }}>
          <SearchNav isMobile={isMobile} />
          <Grid item sm={0} md={2} align="center">
            {!isMobile ? (
              <MediaNetAd
                dims="160x600"
                slotId="975270174"
                containerStyles={{
                  marginTop: "16px",
                  borderRight: "1px solid #ececec",
                  paddingRight: "24px"
                }}
              />
            ) : null}
          </Grid>
          <Grid
            item
            sm={12}
            md={8}
            className={
              this.props.isMobile
                ? classes.ser_detail_body_mob
                : classes.ser_detail_body
            }
          >
            <Grid item xs={12}>
              {serHeader}
            </Grid>

            <Grid item xs={12} align="center">
              {isMobile ? (
                <MediaNetAd
                  dims="300x250"
                  slotId="189122234"
                  containerStyles={{
                    marginTop: "8px",
                    borderTop: "1px solid #d4d4d4",
                    paddingTop: "8px"
                  }}
                />
              ) : null}
            </Grid>

            <Grid item xs={12} className={classes.ser_detail_details}>
              <ServiceDetail
                name={name}
                isMobile={isMobile}
                serAtts={serAtts}
                orgHieSlug={orgHieSlug}
                description={description}
                price={price}
                alltimings={alltimings}
                allForms={allForms}
                allfaq={allfaq}
                allSteps={allSteps}
              />
            </Grid>

            <Grid item xs={12} className={classes.ser_detail_morelinks}>
              <MoreLinks
                isMobile={isMobile}
                otherServices={otherServices}
                state_name={state_org_details.area.name}
                org_name={org_name}
                stateServices={state_org_details.offered_services}
                glossaryLinks={state_org_details.offered_services}
              />
            </Grid>
          </Grid>

          <Grid item sm={0} md={2} align="center">
            {!isMobile ? (
              <MediaNetAd
                dims="160x600"
                slotId="876473088"
                containerStyles={{
                  marginTop: "16px",
                  borderLeft: "1px solid #ececec",
                  paddingLeft: "24px"
                }}
              />
            ) : null}
          </Grid>
          <Grid item sm={12} align="center">
            <MediaNetAd
              dims="728x90"
              slotId="788671455"
              containerStyles={{
                marginTop: "16px",
                borderLeft: "1px solid #ececec"
              }}
            />
          </Grid>
        </Grid>

        <div className={classes.ser_detail_footer}>
          <Footer isMobile={isMobile} page={this.props.location.pathname} />
        </div>
        {serviceDeliveryFeedbackForm}
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
  withRoot(withStyles(styles)(ServiceDetailTemplate))
);

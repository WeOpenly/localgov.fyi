import React, { Fragment } from "react";

import { connect } from "react-redux";
import Helmet from "react-helmet";

import Link from "gatsby-link";

import SearchNav from "../components/Nav/Search";

import ServiceDetail from "../components/ServicePage/ServiceDetail";
import ServiceHeader from "../components/ServicePage/ServiceHeader";

import MediaNetAd from "../components/MediaNetAd";

import FooterNew from "../components/FooterNew";

import AttachmentList from '../components/AttachmentList';
import MoreLinks from "../components/ServicePage/MoreLinks";
import CoronaBanner from "../components/Banner/Corona";
import { trackView } from "../components/common/tracking";
import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;


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
        <Link style={{ color: "#6F47FF", margin: '0.5rem 0rem' }} to={state_org_details.url_slug}>
          {org_name}
        </Link>
      );
      orgHieSlug = org_name;
    } else {
      if (org_area_hie.length) {
        orgHieComp = (
          <span>
            <Link
              style={{ color: "#6F47FF", margin: "0.5rem 0rem" }}
              to={org_slug}
            >
              {org_name}
            </Link>
            ,{" "}
            <Link
              style={{ color: "#6F47FF", margin: "0.5rem 0rem" }}
              to={state_org_details.url_slug}
            >
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

      actionCard = null;
      hieLinks = (
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
          {name ? (
            <li
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
              className={styles.breadcrumbItem}
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

            <div
              className={`${styles.column} ${styles.col2} ${styles.textCenter} `}
            >
              <MediaNetAd
                dims="160x600"
                slotId="975270174"
                containerStyles={{
                  marginTop: "16px",
                  borderRight: "1px solid #ececec",
                  paddingRight: "24px"
                }}
              />
            </div>
            <div
              className={`${styles.column} ${styles.col8}`}
              style={{
                marginTop: "3rem",
                padding: "1.5rem",
                background: "#fff",
                borderRadius: "0.8rem",
                boxShadow: "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)"
              }}
            >
              <div className={styles.columns}>
                <div className={`${styles.column} ${styles.col12}`}>
                  {serHeader}
                </div>
                <div className={`${styles.column} ${styles.col12}`}>
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
                </div>
                <div className={`${styles.column} ${styles.col12}`}>
                  <MoreLinks
                    isMobile={isMobile}
                    otherServices={otherServices}
                    state_name={state_org_details.area.name}
                    org_name={org_name}
                    stateServices={state_org_details.offered_services}
                    glossaryLinks={state_org_details.offered_services}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${styles.column} ${styles.col2} ${styles.textCenter}`}
            >
              <MediaNetAd
                dims="160x600"
                slotId="876473088"
                containerStyles={{
                  marginTop: "16px",
                  borderLeft: "1px solid #ececec",
                  paddingLeft: "24px"
                }}
              />
            </div>
            <div
              style={{ marginTop: "8px" }}
              className={`${styles.column} ${styles.col12} ${styles.textCenter} `}
            >
              <MediaNetAd
                dims="728x90"
                slotId="788671455"
                containerStyles={{
                  marginTop: "16px",
                  borderLeft: "1px solid #ececec"
                }}
              />
            </div>
          </div>
          <div
            className={`${styles.columns} ${styles.showMd} ${styles.textCenter}`}
          >
            <div className={`${styles.column} ${styles.col12}`}>
              <SearchNav />
            </div>

            <div className={`${styles.column} ${styles.colMd12}`}>
              <div
                style={{
                  margin: "1rem 0.2rem",
                  padding: "2rem 0.5rem",
                  background: "#fff",
                  transition: "opacity .2s ease-in-out",
                  borderRadius: "0.8rem",
                  boxShadow: "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)"
                }}
                className={styles.columns}
              >
                <div className={`${styles.column} ${styles.col12}`}>
                  {serHeader}
                </div>
                <div className={`${styles.column} ${styles.col12}`}>
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
                </div>
                <div className={`${styles.column} ${styles.col12}`}>
                  <MoreLinks
                    isMobile={isMobile}
                    otherServices={otherServices}
                    state_name={state_org_details.area.name}
                    org_name={org_name}
                    stateServices={state_org_details.offered_services}
                    glossaryLinks={state_org_details.offered_services}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.column} ${styles.col12}`}>
              <MediaNetAd
                dims="300x250"
                slotId="189122234"
                containerStyles={{
                  marginTop: "8px",
                  borderTop: "1px solid #d4d4d4",
                  paddingTop: "8px"
                }}
              />
            </div>
          </div>
          <FooterNew isMobile={isMobile} page={this.props.location.pathname} />
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

export default connect(mapStateToProps)(ServiceDetailTemplate);

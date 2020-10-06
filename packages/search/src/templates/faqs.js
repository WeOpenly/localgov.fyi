import React, { Fragment } from "react";

import { connect } from "react-redux";
import Helmet from "react-helmet";

import Link from "gatsby-link";

import SearchNav from "../components/Nav/Search";

import ServiceFAQDetail from "../components/FAQPage/ServiceFAQDetail";
import ServiceFAQHeader from "../components/FAQPage/ServiceFAQHeader";
import CommunityQuestion from "../components/FAQPage/CommunityFAQ";
import ServiceDeliveryLink from "../components/ServicePage/ServiceDeliveryLink";
import FeedbackDialog from "../components/ServicePage/FeedbackDialog";
import LocationCard from "../components/UserRequests/LocationCard";
import SendFeedback from "../components/ServicePage/SendFeedback";
import ServiceCard from "../components/ServiceCard";


import MediaNetAd from "../components/MediaNetAd";

import GoogleAds from "../components/GoogleAds";

import FooterNew from "../components/FooterNew";

import AttachmentList from '../components/AttachmentList';
import MoreLinks from "../components/ServicePage/MoreLinks";
import CoronaBanner from "../components/Banner/Corona";
import { trackView } from "../components/common/tracking";
import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";
import { Modal } from "@material-ui/core";
import { DiscussionEmbed } from "disqus-react";
import Disqus from "disqus-react";
import CommunityForum from "../components/FAQPage/CommunityForum";
import { fetchNearbyOrgs } from "../components/Nearby/actions";

const windowGlobal = typeof window !== "undefined" && window;


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

class faqTemplate extends React.Component {
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
      .replace(/-+$/, "") // Trim - from end of text
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
      description,
      contact_details,
      allfaq,
      allSteps,
      org_id,
      org_slug,
      org_name,
      service_del_links,
      service_parent,
      state_org_details,
      org_area_hie
    } = this.props.pageContext.data;

    const { classes, isMobile, new_url_slug } = this.props;


    let orgHieComp = null;
    let orgHieSlug = null;
    
    if (org_area_hie.length === 1) {
      let url = `https://papergov.com/${state_org_details.url_slug}`;
      orgHieComp = (
        <a target="_blank" className={styles.textBold} style={{ color: "#6F47FF" }} href={url}>
          {org_name}
        </a>
      );
      orgHieSlug = org_name;
    } else {
      if (org_area_hie.length) {
        let orgurl = `https://papergov.com/${org_slug}`;
        let stateUrl = `https://papergov.com/${state_org_details.url_slug}`;

        orgHieComp = (
          <span>
            <a target="_blank" style={{ color: "#6F47FF" }} href={orgurl}>
              {org_name}
            </a>
            ,{" "}
            <a target="_blank" style={{ color: "#6F47FF" }} href={stateUrl}>
              {org_area_hie[org_area_hie.length - 1].area_name}
            </a>
          </span>
        );
        orgHieSlug = `${org_name}, ${
          org_area_hie[org_area_hie.length - 1].area_name
        }`;
      }
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
            >
              <span itemProp="name">Questions</span>
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
                href={`/${url_slug}`}
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
        <ServiceFAQHeader
          isMobile={isMobile}
          name={name}
          id={id}
          offeredIn={orgHieSlug}
          orgNameOnly={org_name}
          orgID={org_id}
          orgHieComp={orgHieComp}
          hieLinks={hieLinks}
          info={contact_details}
          serDelLinks={service_del_links}
        />
      );
    }
    
    
    let newurl = null;

    if(url_slug) {
    
    newurl = url_slug.split("/services") 

    }
    

    let faqServiceList = null;
            
    faqServiceList = (
              <div
                style={{
                display: "flex",
                flexDirection: "column",
                margin: "1rem 0.2rem 0.2rem 0.2rem"
               }}
              >
                  <div> 
                  <div
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                      style={{ margin: "1rem 0.3rem" }}
                  >
                  <h4>How to {name} Online in {org_name}?</h4>
                  </div>

                  <div
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                        style={{ fontSize: "1rem", letterSpacing: "0.002em", lineHeight: "1.4" }}
                        style={{ margin: "1rem 0.3rem" }}
                  >
                    You can access all the information on how to {name} Online <a href={`/${url_slug}`}>here</a>.
                  </div>
                  <div className={styles.divider} /> 
                  <div class="spectre-min-module--divider--2dnFa"></div>
                  </div>

                </div>
             ); 

    return (
      <>
        <Helmet>
          <title>{`${name} | Community FAQs | ${org_name}`}</title>
          {allfaq.length > 0 ? (
            <html itemScope itemType="https://schema.org/FAQPage" />
          ) : null}

          <script type="application/ld+json">{`${JSON.stringify(
            jsonLd
          )}`}</script>
          <link rel="canonical" href={`https://papergov.com/${new_url_slug}/`} />
          <meta
            property="og:title"
            content={`${name} | ${org_name} | papergov`}
          />
          <meta
            property="og:url"
            content={`https://papergov.com/${new_url_slug}/`}
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
            content={`${name} Online in ${org_name} & access all other government services seamlessly | Papergov`}
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
              className={`${styles.column} ${styles.col8}`}
              style={{
                marginTop: "3rem",
                marginLeft: "10rem",
                padding: "1.5rem",
                background: "#fff",
                borderRadius: "0.8rem",
                boxShadow: "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)"
              }}
            >
              <div className={styles.columns}>

          
                <div className={`${styles.column} ${styles.col12}`}>
                 
                     <p> {hieLinks} </p>

                  <div class="divider"></div> 

                  <h4> 
                    <u>
                     Community Frequently Asked Questions
                    </u>
                  </h4>

                  <ServiceFAQDetail
                    name={name}
                    orgHieSlug={orgHieSlug}
                    description={description}
                    allfaq={allfaq}
                  />

                  {faqServiceList}

                  <hr class="dashed"></hr>

                </div>    

                <p> {serHeader} </p>
                
                <div class="divider"></div>

                <div className={`${styles.column} ${styles.col12} `}>
                    <CommunityForum> </CommunityForum>
                </div>

              </div>
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

                <p> {hieLinks} </p>

                  <h4> 
                    <u>
                     Community Frequently Asked Questions
                    </u>
                  </h4>

                  <ServiceFAQDetail
                    name={name}
                    isMobile={isMobile}
                    orgHieSlug={orgHieSlug}
                    description={description}
                    allfaq={allfaq}
                  />

                  {faqServiceList}

                  <hr class="dashed"></hr>
                  
                 </div>

                <p> {serHeader} </p>
                
                <div class="divider"></div>

                <div className={`${styles.column} ${styles.col12} `}>
                    <CommunityQuestion></CommunityQuestion>
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

export default connect(mapStateToProps)(faqTemplate);

import React, { Fragment } from "react";

import { connect } from "react-redux";
import Helmet from "react-helmet";

import Link from "gatsby-link";

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";

import ServiceDetail from '../components/ServiceDetail/index.js';

const windowGlobal = typeof window !== "undefined" && window;


const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data)
    }}
  />
);


class ServiceDetailTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.slugify = this.slugify.bind(this);
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

  render() {
    const {
      id,
      url_slug,
      name,
      contact_details,
      org_slug,
      org_name,
      service_del_links,
      service_parent,
      state_org_details,
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
        <Link className={styles.textBold} style={{ color: "#6F47FF" }} to={state_org_details.url_slug}>
          {org_name}
        </Link>
      );
      orgHieSlug = org_name;
    } else {
      if (org_area_hie.length) {
        orgHieComp = (
          <span >
            <Link style={{ color: "#6F47FF" }} to={org_slug}>
              {org_name}
            </Link>
            ,{" "}
            <Link style={{ color: "#6F47FF" }} to={state_org_details.url_slug}>
              {org_area_hie[org_area_hie.length - 1].area_name}
            </Link>
          </span>
        );
        orgHieSlug = `${org_name}, ${
          org_area_hie[org_area_hie.length - 1].area_name
        }`;
      }
    }



    return (
      <div className={`${styles.container} ${styles.gridSm}`}>
        <div
          className={styles.columns}
          style={{
            background: "#fff",
            margin: "0.6rem",
            border: "1px solid rgba(86, 39, 255, .2)",
            boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
          }}
        >
          <div className={`${styles.column} ${styles.col12}`}>
            <div
              className={styles.panel}
              style={{
                border: "none",
                borderRadius: "0.3rem"
              }}
            >
              <div
                style={{
                  margin: "1.3rem 0 0 0"
                }}
                className={styles.panelBody}
              >
                <ServiceDetail
                  name={name}
                  id={id}
                  url_slug={url_slug}
                  offeredIn={orgHieComp}
                  info={contact_details}
                  serDelLinks={service_del_links}
                />
              </div>

              <div
                className={styles.panelFooter}
                style={{
                  borderTop: "1px solid rgba(48,55,66,.05)",
                  margin: "0.5rem 1rem 0.6rem 1rem",
                  padding: "0.4rem 0 0 0",
                  display: "flex",
                  justifyContent: "right"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "140px",
                    fontSize: "12px"
                  }}
                >
                  <div className={`${styles.textGray}`}> powered by</div>
                  <a
                    className={`${styles.textBold}`}
                    href="https://papergov.com"
                  >
                    papergov
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default ServiceDetailTemplate;

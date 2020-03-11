import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Link from "gatsby-link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LocationCity from "@material-ui/icons/LocationCity";

import Img from "gatsby-image";

import iconStyles from "./typicons.min.module.css";
import styles from "./spectre.min.module.css";
import { trackClick } from "./common/tracking";

class OrgHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      copied: false,
      hover: false
    };
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.trackClickSocialIcon = this.trackClickSocialIcon.bind(this);
  }

  handleShareClick(event) {
    this.setState({ anchorEl: event.currentTarget });
    // this.props.trackClick('external', 'share', '', '', 0);
  }

  handleClose(type) {
    this.setState({ anchorEl: null, copied: false });

    const { trackClick } = this.props;
    if (type) trackClick("social_share", type, "", "", 0);
  }

  handleCopy() {
    const { trackClick } = this.props;
    this.setState({ copied: true });
    trackClick("social_share", "copy", "", "", 0);
  }

  handleMouseEnter(orgId, orgName) {
    this.setState({ hover: true });
    this.props.trackClick("claim", "org_page", orgId, orgName, 0);
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  trackClickSocialIcon(type, url) {
    this.props.trackClick("external", "social_icon", type, url, 0);
  }

  render() {
    const {
      classes,
      id,
      name,
      parent,
      info,
      logoFluid,
      claimed,
      isMobile,
      displayShare = true
    } = this.props;
    const { anchorEl, copied } = this.state;

    const windowGlobal = typeof window !== "undefined" && window;
    const windowLocation = windowGlobal.location ? windowGlobal.location : {};
    const shareLink = windowLocation.href + "/";

    let contactAddress;
    if (info)
      contactAddress = info.find(detail => detail.contact_type === "ADDRESS");
    let contactAddressValue = null;
    if (contactAddress)
      contactAddressValue = contactAddress.contact_value || null;

    const sortedInfo = [];
    const sortInfo = info => {
      info.forEach(detail => {
        let type = detail.contact_type;
        if (type === "FACEBOOK") {
          sortedInfo[0] = detail;
        } else if (type === "TWITTER") {
          sortedInfo[1] = detail;
        } else if (type === "EMAIL") {
          sortedInfo[2] = detail;
        } else if (type === "PHONE") {
          sortedInfo[3] = detail;
        } else if (type === "ADDRESS") {
          sortedInfo[4] = detail;
        }
      });
    };
    if (info) sortInfo(info);

    const contactDetailButtons = sortedInfo.map((cd, idx, arr) => {
      const icons = {
        phone: (
          <span
            style={{ padding: "0", fontSize: "0.75rem" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnPhone}`}
          ></span>
        ),
        address: (
          <span
            style={{ padding: "0" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnLocation}`}
          ></span>
        ),
        email: (
          <span
            style={{ padding: "0" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnMail}`}
          ></span>
        ),
        facebook: (
          <span
            style={{ padding: "0" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnSocialFacebookCircular}`}
          ></span>
        ),
        twitter: (
          <span
            style={{ padding: "0" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnSocialTwitterCircular}`}
          ></span>
        )
      };

      let value = cd.contact_value;
      if (!value) value = cd.value;

      const contactType = cd.contact_type.toLowerCase();
      if (contactType.toLowerCase() === "phone") {
        value = (
          <div key={idx} style={{ marginBottom: "0.5rem" }}>
            <a
              href={`tel:${value}`}
              className={`${styles.textLinkGray} ${styles.textSemibold}`}
              onClick={() =>
                this.trackClickSocialIcon(contactType, cd.contact_value)
              }
              target="_blank"
            >
              {icons[contactType]} {value}
            </a>
          </div>
        );
      } else if (contactType.toLowerCase() === "address") {
        value = (
          <div key={idx} style={{ marginBottom: "0.5rem" }}>
            <a
              href={`http://maps.google.com/?q=${value}`}
              className={`${styles.textLinkGray} ${styles.textSemibold}`}
              onClick={() =>
                this.trackClickSocialIcon(contactType, cd.contact_value)
              }
              target="_blank"
            >
              {icons[contactType]} {value}
            </a>
          </div>
        );
      } else if (contactType.toLowerCase() === "email") {
        value = (
          <div key={idx} style={{ marginBottom: "0.5rem" }}>
            <a
              href={`mailto:${value}`}
              className={`${styles.textLinkGray} ${styles.textSemibold}`}
              onClick={() =>
                this.trackClickSocialIcon(contactType, cd.contact_value)
              }
              target="_blank"
            >
              {icons[contactType]} {value}
            </a>
          </div>
        );
      } else {
        value = (
          <div key={idx} style={{ marginBottom: "0.5rem" }}>
            <a
              href={`${value}`}
              className={`${styles.textLinkGray} ${styles.textSemibold}`}
              onClick={() =>
                this.trackClickSocialIcon(contactType, cd.contact_value)
              }
              target="_blank"
            >
              {icons[contactType]} {value}
            </a>
          </div>
        );
      }

      return <div key={`ser-cd-${idx}`}>{value} </div>;
    });

    return (
      <>
        <div className={`${styles.columns} ${styles.hideMd}`}>
          <div
            style={{ marginBottom: "0.5rem" }}
            className={`${styles.column} ${styles.col12} ${styles.textLeft}`}
          >
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
                <a
                  itemProp="item"
                  itemType="https://schema.org/WebPage"
                  href="/"
                >
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
                  href="/locations"
                >
                  <span itemProp="name">Locations</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
            </ul>
          </div>
          <div
            className={`${styles.column} ${styles.col1} ${styles.textRight}`}
            style={{ overflow: "hidden" }}
          >
            {logoFluid ? (
              <Img
                title={`logo${name}`}
                alt={`logo of ${name}`}
                style={{ width: "72px" }}
                sizes={logoFluid}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#AB93FF",
                  width: "64px",
                  height: "64px",
                  flexGrow: "0",
                  flexShrink: "0",
                  flex: "20",
                  borderRadius: "0.5rem",
                  marginRight: "1rem",
                  borderRadius: ".8rem",

                  border: "1px solid #AB93FF"
                }}
              >
                <LocationCity
                  fontSize="large"
                  style={{ width: "72px", color: "#fff" }}
                />
              </div>
            )}
          </div>
          <div
            className={`${styles.column} ${styles.col11} ${styles.textLeft}`}
          >
            <div>
              <h1>{name} </h1>
            </div>
            <div
              style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
              className={`${styles.textLinkGray}`}
            >
              <div
                style={{ marginRight: "1rem" }}
                className={`${styles.textLinkGray} ${styles.textSemibold}`}
              >
                {parent}
              </div>
            </div>
            <div style={{ marginBottom: "2rem", marginTop: "1rem" }}>
              {contactDetailButtons && contactDetailButtons}
            </div>
          </div>
        </div>
        <div className={`${styles.columns} ${styles.showMd}`}>
          <div
            style={{ marginBottom: "0.5rem" }}
            className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          >
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
                <a
                  itemProp="item"
                  itemType="https://schema.org/WebPage"
                  href="/"
                >
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
                  href="/locations"
                >
                  <span itemProp="name">Locations</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
            </ul>
          </div>

          <div
            className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          >
            <div
   
              style={{ display: "flex" }}
            >
              {logoFluid ? (
                <Img
                  title={`logo${name}`}
                  alt={`logo of ${name}`}
                  style={{ width: "48px" }}
                  sizes={logoFluid}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#AB93FF",
                    width: "48px",
                    height: "48px",
                    flexGrow: "0",
                    flexShrink: "0",
                    flex: "20",
                    borderRadius: "0.5rem",
                    margin: "1rem 1rem 0 0",
                    borderRadius: ".8rem",

                    border: "1px solid #AB93FF"
                  }}
                >
                  <LocationCity
                    fontSize="large"
                    style={{ width: "48px", color: "#fff" }}
                  />
                </div>
              )}

              <h1>{name} </h1>
            </div>
            <div
              style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
              className={`${styles.textLinkGray}`}
            >
              <div
                style={{ marginRight: "1rem" }}
                className={`${styles.textLinkGray} ${styles.textSemibold}`}
              >
                {parent}
              </div>
            </div>
            <div style={{ marginBottom: "2rem", marginTop: "1rem" }}>
              {contactDetailButtons && contactDetailButtons}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    trackClick: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex));
    }
  };
};

const mapStateToProps = function(state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnOrgHeader = connect(mapStateToProps, mapDispatchToProps)(OrgHeader);

export default ConnOrgHeader;

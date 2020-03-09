import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Link from "gatsby-link";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
        <div className={`${styles.column} ${styles.col12} ${styles.textLeft}`}>
          hie
        </div>
        <div className={`${styles.column} ${styles.col9} ${styles.textLeft}`}>
          <div>
            <h1>{name} </h1>
          </div>
          <div
            style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
            className={`${styles.textLinkGray}`}
          >
            <div
              style={{ marginRight: "1rem" }}
              className={`${spStyles.textLinkGray} ${spStyles.textSemibold}`}
            >
       
              {parent}
            </div>
          </div>
          <div style={{ marginBottom: "2rem", marginTop: "1.5rem" }}>
            {contactDetailButtons && contactDetailButtons}
          </div>
        </div>
        <div
          className={`${styles.column} ${styles.col3} ${styles.textRight}`}
          style={{ overflow: "hidden" }}
        >
          {logoFluid ? (
            <Img
              title={`logo${name}`}
              alt={`logo of ${name}`}
              style={{ width: "100px" }}
              sizes={logoFluid}
            />
          ) : null}
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

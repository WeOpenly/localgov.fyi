import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

import Img from "gatsby-image";

import iconStyles from "../typicons.min.module.css";
import spStyles from "../spectre.min.module.css";

import ServiceDeliveryLink from "./ServiceDeliveryLink";

import { hideResultHelperMsg } from "../SearchPage/actions";
import { trackClick } from "../common/tracking";
import { toggleNotifyDialog } from "../UserRequests/actions.js";


class ServiceHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      copied: false
    };
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleOrgClick = this.handleOrgClick.bind(this);
    this.trackClickSocialIcon = this.trackClickSocialIcon.bind(this);
    this.handleNotifyClick = this.handleNotifyClick.bind(this);
    this.toggleServiceFlow = this.toggleServiceFlow.bind(this);
  }

  componentWillUnmount() {
    this.props.hideResultHelperMsg();
  }

  handleNotifyClick() {
    this.props.openNotifyDialog(true);
  }

  toggleServiceFlow() {
    this.props.openServiceFlowDialog();
  }

  handleShareClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose(type) {
    const { trackClick } = this.props;
    this.setState({ anchorEl: null, copied: false });
    if (type) trackClick("social_share", type, "", "", 0);
  }

  handleCopy() {
    const { trackClick } = this.props;
    this.setState({ copied: true });
    trackClick("social_share", "copy", "", "", 0);
  }

  handleOrgClick() {
    const { orgSlug } = this.props;
    navigate(`/${orgSlug}/`);
  }

  trackClickSocialIcon(type, url) {
    this.props.trackClick("external", "social_icon", type, url, 0);
  }

  render() {
    const {
      classes,
      name,
      offeredIn,
      info,
      serDelLinks,
      id,
      logoSizes,
      service_delivery_enabled,
      views,
      orgLogoSvg,
      orgHieComp,
      orgNameOnly,
      is_parent_ser,
      is_assoc_ser,
      selectedAddr,
      areaAddr,
      assoc_orig_name,
      hieLinks
    } = this.props;

    let origLocationText = areaAddr;
    if (selectedAddr) {
      origLocationText = selectedAddr;
    }

    if (!(name && offeredIn && info && serDelLinks)) {
      return null;
    }

    const windowGlobal = typeof window !== "undefined" && window;
    const windowLocation = windowGlobal.location ? windowGlobal.location : {};
    const shareLink = windowLocation.href + "/";

    // if (!info) return null;
    // if (!info.length > 0) return null;

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
            style={{ padding: "0", fontSize: '0.75rem' }}
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
              className={`${spStyles.textLinkGray} ${spStyles.textSemibold}`}
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
              className={`${spStyles.textLinkGray} ${spStyles.textSemibold}`}
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
              className={`${spStyles.textLinkGray} ${spStyles.textSemibold}`}
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
              className={`${spStyles.textLinkGray} ${spStyles.textSemibold}`}
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

      return (
        <div
          key={`ser-cd-${idx}`}
        >
          {value}{" "}
        </div>
      );
    });

    const actionButton = null;

    const sdl = (
      <ServiceDeliveryLink
        orgNameOnly={orgNameOnly}
        views={views}
        id={id}
        service_name={name}
        org_name={offeredIn}
        serDelLinks={serDelLinks}
      />
    );

    let extraMessage = null;
    if (is_parent_ser) {
      extraMessage = (
        <div >
        icon
          <p
           
          >
            This service in {origLocationText} is handled by {orgHieComp}
          </p>
        </div>
      );
    } else if (is_assoc_ser) {
      extraMessage = (
        <div >
        icon
          <p
        
          >
            Showing related service to {assoc_orig_name} in {origLocationText}
          </p>
        </div>
      );
    }

    return (
      <>
        <div className={spStyles.hideMd}>
          <div className={spStyles.columns}>
            <div className={`${spStyles.column} ${spStyles.col12}`}>
              {hieLinks ? hieLinks : null}
            </div>
            <div className={`${spStyles.column} ${spStyles.col12}`}>
              {extraMessage}
            </div>
            <div className={`${spStyles.column} ${spStyles.col8}`}>
              <h1>{name}</h1>

              <div
                style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                className={`${spStyles.textLinkGray}`}
              >
                Offered by <span> {orgHieComp} </span>
              </div>
              <div style={{ marginBottom: "2rem", marginTop: "1.5rem" }}>
                {contactDetailButtons && contactDetailButtons}
              </div>
            </div>

            <div className={`${spStyles.column} ${spStyles.col4}`}>{sdl}</div>
            <div className={`${spStyles.column} ${spStyles.col12}`}>
              <div className={spStyles.divider} />
            </div>
          </div>
        </div>
        <div className={spStyles.showMd}>
          <div className={`${spStyles.columns} ${spStyles.textCenter}`}>
            <div className={`${spStyles.column} ${spStyles.col12}`}>
              {hieLinks ? hieLinks : null}
            </div>
            <div className={`${spStyles.column} ${spStyles.col12}`}>
              {extraMessage}
            </div>
            <div className={`${spStyles.column} ${spStyles.col12}`}>
              <h1>{name}</h1>

              <div
                style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                className={`${spStyles.textLinkGray}`}
              >
                Offered by <span> {orgHieComp} </span>
              </div>
              <div style={{ marginBottom: "0.5rem", marginTop: "1.5rem" }}>
                {contactDetailButtons && contactDetailButtons}
              </div>
            </div>

            <div
              style={{ marginBottom: "2rem", marginTop: "0.5rem" }}
              className={`${spStyles.column} ${spStyles.col12}`}
            >
              {sdl}
            </div>
            <div className={`${spStyles.column} ${spStyles.col12}`}>
              <div className={spStyles.divider} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    trackClick: (click_type, resultType, id, title, listIndex, extra) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex, extra));
    },
    openServiceFlowDialog: () => {
      
    },
    hideResultHelperMsg: () => {
      dispatch(hideResultHelperMsg());
    }
  };
};

const mapStateToProps = function(state, ownProps) {
  return {
    ...ownProps,
    ...state.searchPage,
    selectedAddr: state.indexPage.selectedLocationLatLng
      ? state.indexPage.selectedLocationLatLng.addr
      : null,
    areaAddr: state.indexPage.areaGuessResult
      ? state.indexPage.areaGuessResult.city_name
      : null
  };
};

const ConnSerHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceHeader);

export default ConnSerHeader;

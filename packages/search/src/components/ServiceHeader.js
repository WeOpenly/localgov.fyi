import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

import Img from "gatsby-image";

import iconStyles from "./typicons.min.module.css";
import spStyles from "./spectre.min.module.css";
import HighLightOutlined from "@material-ui/icons/HighlightOutlined";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


import IconButton from "@material-ui/core/IconButton";

import ServiceDeliveryLink from "./ServiceDeliveryLink";

import { hideResultHelperMsg } from "./SearchPage/actions";
import { trackClick } from "./common/tracking";
import { toggleNotifyDialog } from "./UserRequests/actions.js";

import { toggleDeliveryDialog } from "./Delivery/actions";

const styles = theme => ({
  service_header_main: {
    // marginRight: theme.spacing.unit,
    boxShadow: "0 0 0 0",
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2
  },
  service_header_mainMobile: {
    boxShadow: "0 0 0 0",
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  service_header_cardTop: {
    display: "flex",
    justifyContent: "left",
    paddingTop: theme.spacing.unit,
    flexWrap: "wrap"
  },
  service_header_cardTop_mob: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    flexWrap: "wrap"
  },
  service_header_logoName: {
    display: "flex"
  },
  service_header_title: {
    marginRight: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 2
  },
  service_header_title_mob: {},
  service_header_in: {
    cursor: "pointer",

    color: theme.palette.primary["400"]
  },

  service_header_menuItem: {
    display: "flex",
    justifyContent: "center"
  },
  service_header_shareButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  service_header_buttonContent: {
    display: "flex",
    alignItems: "space-between"
  },
  service_header_contactButton: {
    marginTop: theme.spacing.unit * 2
  },
  service_header_notifyButton: {
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  },
  service_header_serDelLink: {
    display: "flex",
    alignSelf: "center",
    width: "100%"
  },
  service_header_menuButtonIcon: {
    marginRight: theme.spacing.unit
  },
  service_header_menuButtonNotify: {
    width: "152px"
  },
  service_header_svgIcon: {
    width: 18,
    color: theme.palette.primary["400"]
  },
  service_header_contactIcons: {
    marginTop: theme.spacing.unit /2,
  },
  service_header_serviceNotify: {},
  org_header_avatar: {
    alignSelf: "center",
    display: "flex",
    height: theme.spacing.unit * 4,
    width: theme.spacing.unit * 4,
    boxShadow: `0 0 1px 1px ${theme.palette.primary["200"]}`,
    border: "1px solid #fff",
    margin: theme.spacing.unit
  },
  ser_del_link_icymi: {
    display: "flex",
    alignItems: "center"
  },
  ser_del_link_icymi_icon: {
    color: theme.palette.primary["600"],
    margin: theme.spacing.unit,
    marginLeft: 0
  },
  ser_del_link_icymi_text: {
    paddingTop: 2,
    color: theme.palette.primary["500"]
  },
  service_header_serviceShare: {},
  service_header_cardActions_mob: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 2
  },
  service_header_deliveryLinkWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.unit
    // marginRight: -theme.spacing.unit,
    // borderLeft: '1px solid #e4e4e4',
  },
  ser_header_offered_in_org: {
    paddingTop: "2px",
    fontSize: "1rem"
  },
  svgIcon: {
    fontSize: "16px",
    color: theme.palette.primary["400"]
  },
  service_header_serviceActions: {
    display: "flex",
    justifyContent: "center",
    padding: `0 ${theme.spacing.unit * 2}`
  },
  service_header_deliveryLinkWrapperMobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.unit
    // marginRight: -theme.spacing.unit,
    // borderLeft: '1px solid #e4e4e4',
  }
});

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
            style={{ padding: "0" }}
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
          <div key={idx} style={{ marginBottom: "0.1rem" }}>
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
          <div key={idx} style={{ marginBottom: "0.1rem" }}>
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
          <div key={idx} style={{ marginBottom: "0.1rem" }}>
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
          <div key={idx} style={{ marginBottom: "0.1rem" }}>
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
          className={classes.service_header_contactIcons}
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
        <div className={classes.ser_del_link_icymi}>
          <HighLightOutlined
            style={{ fontSize: "20px" }}
            className={classes.ser_del_link_icymi_icon}
          />{" "}
          <Typography
            variant="caption"
            className={classes.ser_del_link_icymi_text}
          >
            This service in {origLocationText} is handled by {orgHieComp}
          </Typography>
        </div>
      );
    } else if (is_assoc_ser) {
      extraMessage = (
        <div className={classes.ser_del_link_icymi}>
          <HighLightOutlined
            style={{ fontSize: "20px" }}
            className={classes.ser_del_link_icymi_icon}
          />{" "}
          <Typography
            variant="caption"
            className={classes.ser_del_link_icymi_text}
          >
            Showing related service to {assoc_orig_name} in {origLocationText}
          </Typography>
        </div>
      );
    }

    return (
      <Grid
        container
        spacing={0}
        className={
          !this.props.isMobile
            ? classes.service_header_main
            : classes.service_header_mainMobile
        }
      >
        {hieLinks ? (
          <Grid item xs={12} align={this.props.isMobile ? `center` : `left`}>
            {hieLinks}
          </Grid>
        ) : null}
        <Grid item xs={12} md={9}>
          {extraMessage}

          <div
            className={
              !this.props.isMobile
                ? classes.service_header_cardTop
                : classes.service_header_cardTop_mob
            }
          >
            <div
              className={
                !this.props.isMobile
                  ? classes.service_header_title
                  : classes.service_header_title_mob
              }
            >
              <h2>{name}</h2>

              <p style={{marginBottom: '0.5rem', marginTop: '0.5rem'}} className={`${spStyles.textSemibold}`}>
                Offered by{" "}
                <span className={classes.service_header_in}>
                  {" "}
                  {orgHieComp}{" "}
                </span>
              </p>
            </div>
          </div>

          <div
            className={
              !this.props.isMobile
                ? classes.service_header_cardActions
                : classes.service_header_cardActions_mob
            }
          >
            {contactDetailButtons && contactDetailButtons}
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className={classes.service_header_serviceActions}>
            <div className={classes.service_header_serDelLink}>{sdl}</div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    trackClick: (click_type, resultType, id, title, listIndex, extra) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex, extra));
    },
    openServiceFlowDialog: () => {
      dispatch(toggleDeliveryDialog(true));
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
)(withStyles(styles)(ServiceHeader));

export default ConnSerHeader;

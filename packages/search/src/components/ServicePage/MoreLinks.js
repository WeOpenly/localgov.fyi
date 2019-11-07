import React, { Component } from "react";
import spStyles from "../spectre.min.module.css";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  more_links: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 5
  },
  more_links_container: {
    display: "flex",
    alignSelf: "center",
    justifyContent: "space-between"
  },
  more_links_container_mob: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center"
  },
  disco_footer: {
    padding: theme.spacing.unit * 2,
  },
  ser_more_links_header: {
    marginBottom: theme.spacing.unit
  }
});

class MoreLinks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      state_name,
      org_name,
      stateServices,
      otherServices
    } = this.props;
    let glossaries = [
      {
        name: "Pay Property Taxes ",
        link: "pay-property-taxes/"
      },
      {
        name: "Pay Parking Citation",
        link: "pay-parking-citation/"
      },
      {
        name: "Register for Recreational Classes",
        link: "register-for-recreational-activity-or-class/"
      },
      {
        name: "Pay Utility Bill",
        link: "pay-utility-bill/"
      },
      {
        name: "Renew Business License",
        link: "renew-business-license/"
      }
    ];

    const glosaaryLinks = glossaries.map((gl, idx) => (
      <div key={idx} style={{ marginBottom: "0.2rem" }}>
        <a
          href={`/services/${gl.link}`}
          className={`${spStyles.textLinkGray} ${spStyles.textSemibold}`}
          target="_blank"
        >
          {gl.name}
        </a>
      </div>
    ));

    const otherSers = otherServices.slice(0, 4).map((ser, idx) => (
      <div key={idx} style={{ marginBottom: "0.2rem" }}>
        <a
          href={`/${ser.url_slug}`}
          className={`${spStyles.textLinkGray} ${spStyles.textSemibold}`}
          target="_blank"
        >
          {ser.service_name}
        </a>
      </div>
    ));

    const additionalServices = (
      <div className={classes.disco_footer}>
        <div style={{ paddingBottom: "0.5rem" }}>
          <h6>Popular in {org_name}</h6>
        </div>

        <div className={classes.disco_footer_links}>{otherSers}</div>
      </div>
    );

    const stateSerLinks = stateServices.map((ss, idx) => (
      <div key={idx} style={{ marginBottom: "0.2rem" }}>
        <a
          href={`/${ss.url_slug}`}
          className={`${spStyles.textLinkGray} ${spStyles.textSemibold}`}
          target="_blank"
        >
          {ss.name}
        </a>
      </div>
    ));

    const stateSers = (
      <div className={classes.disco_footer}>
        <div style={{ paddingBottom: "0.5rem" }}>
          <h6>Services in {state_name}</h6>
        </div>

        <div className={classes.disco_footer_links}>{stateSerLinks}</div>
      </div>
    );

    const glossLinks = (
      <div className={classes.disco_footer}>
        <div style={{ paddingBottom: "0.5rem" }}>
          <h6>Trending on papergov</h6>
        </div>

        <div className={classes.disco_footer_links}>{glosaaryLinks}</div>
      </div>
    );

    return (
      <div className={classes.more_links}>
        <div
          className={
            this.props.isMobile
              ? classes.more_links_container_mob
              : classes.more_links_container
          }
        >
          {glossLinks}
          {additionalServices}
          {stateSers}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MoreLinks);

import React, { Component } from "react";

import ProptaxSvg from "../../svgIcons/PropTaxIl.js";
import ParkingcitSvg from "../../svgIcons/ParkingCitIl.js";
import RecreationSvg from "../../svgIcons/RecreationIl.js";
import Utilitybill from "../../svgIcons/utbIl.js";
import BusinessLic from "../../svgIcons/businessLic.js";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class FooterNew extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { contact_details, service_name, learn_more_url, quickpay_url, org_name, org_logo } = this.props;

    return (
      <div
        className={`${styles.tile} ${styles.textLeft}`}
        style={{
          background: "#fdfdfd",
          margin: "0.2rem 0.5rem",
          border: "1px solid rgba(48,55,66,.10)",
          borderRadius: "0.6rem",
          padding: "1rem 1rem 0.6rem 1.2rem",
        
        }}
      >
        <div className={styles.tileIcon}>
          <figure
            className={`${styles.avatar} ${styles.avatarXl}`}
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 0.1rem 0.1rem rgba(48,55,66,.30)",
              border: "1px solid #fff",
              width: "64px",
              height: "64px"
            }}
          >
            <img src={org_logo} />
          </figure>
        </div>
        <div
          className={styles.tileContent}
          style={{
            margin: "0 0 0 0.5rem",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div>
            <h5 >{service_name}</h5>
            <p
              style={{ marginBotton: "0.2rem", paddingRight: "1rem", }}
              className={`${styles.cardSubitle} ${styles.textGray}`}
            >
              {org_name}
            </p>
          </div>
          <div
            className={styles.tileAction}
            style={{
              display: "flex",
              justifyContent: "right",
              padding: "0.2rem"
            }}
          >
            <a
              className={` ${styles.btn} ${styles.btnLink}`}
              href={`https://papergov.com/${learn_more_url}`}
              target="_blank"
            >
              Learn more
            </a>
            <a
              className={`${styles.btn} ${styles.btnLink}`}
              href={quickpay_url}
              target="_blank"
            >
              Apply now
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterNew;

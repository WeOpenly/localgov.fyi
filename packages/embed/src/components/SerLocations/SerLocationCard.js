import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";


class SerLocationCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      area,
      organization,
      ser_url_slug,
      highlight,
    } = this.props;

    let state = null;
    let areaName = null;

    if (area.hierarchy.length === 1) {
      areaName = `State of ${
        area.hierarchy[area.hierarchy.length - 1].area_name
      }`;
    } else {
      areaName = area.name || organization.org_name;
      state = `State of ${area.hierarchy[area.hierarchy.length - 1].area_name}`;
    }

    let logoUrl = null;

    if (organization.logo_url) {
      const filename = organization.logo_url.replace(/^.*[\\\/]/, "");
      logoUrl = `/org_images/${filename}_128_thumb.jpg`;
    }

    if (!(areaName && ser_url_slug)) {
      return null;
    }


    const border = highlight ? `#d782d9` : `#AB93FF`;

    return (
      <a
        className={`${styles.tile} ${styles.textLeft}`}
        style={{
          minWidth: "340px",
          maxWidth: "360px",
          background: "#fefefe",
          margin: "0.2rem 0.5rem",
          border: "1px solid rgba(48,55,66,.30)",
          borderRadius: "0.4rem",
          padding: "1.5rem 1rem 0.6rem 1.2rem"
        }}
      >
        <div className={styles.tileIcon}>
          <figure
            className={`${styles.avatar} ${styles.avatarXl}`}
            style={{
              backgroundColor: "#f6f7f8",
              boxShadow: "0 0.1rem 0.1rem rgba(48,55,66,.30)",
              border: "2px solid #fff",
              width: "64px",
              height: "64px"
            }}
          >
            <img src={logoUrl} />
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
            <h5>{areaName}</h5>
            <p
              style={{ marginBotton: "0.2rem", paddingRight: "1rem" }}
              className={`${styles.cardSubitle} ${styles.textGray}`}
            >
              {state}
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
              className={`${styles.btn} ${styles.btnLink} ${styles.textLinkGray} ${styles.textSemibold}`}
              href={`https://papergov.com/${ser_url_slug}`}
              target="_blank"
            >
              Learn more
            </a>
          </div>
        </div>
      </a>
    );
  }
}

export default SerLocationCard;

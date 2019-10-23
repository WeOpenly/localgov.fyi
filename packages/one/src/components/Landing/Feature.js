import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class FeatureCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { icon, heading, description } = this.props;
    return (
      <div
        className={`${styles.card} ${styles.textLeft}`}
        style={{
          border: "1px solid rgba(48,55,66,.10)",
          background: "#fff",
          minHeight: "190px",

          marginBottom: "4rem",
          marginTop: "1rem",
          padding: "0.4rem",
          borderRadius: "0.3rem"
        }}
      >
        <div className={styles.cardHeader}>
          <h5 className={`${styles.cardTitle}`}>
            {icon}
            {heading}
          </h5>
        </div>
        <div className={styles.cardBody}>
          <p
            style={{ lineHeight: "1.1rem" }}
            className={`${styles.cardSubitle} ${styles.textGray}`}
          >
            {description}
          </p>
        </div>
      </div>
    );
  }
}

export default FeatureCard;

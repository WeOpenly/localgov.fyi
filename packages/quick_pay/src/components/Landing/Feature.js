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
          background: "#fff",
          minHeight: "160px",
          marginBottom: "2rem",
          marginTop: "1rem",
          padding: "0.4rem",
          border: "none",
          borderRadius: "0.3rem"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "160px"
          }}
          className={styles.cardImage}
        >
          {icon}
        </div>
        <div className={`${styles.cardHeader} ${styles.textCenter}`}>
          <h5 className={`${styles.cardTitle}`}>{heading}</h5>
        </div>
        <div className={`${styles.cardBody} ${styles.textCenter}`}>
          <p
            style={{ lineHeight: "1.1rem" }}
            className={`${styles.cardSubitle} ${styles.textGray} ${styles.textSemibold}`}
          >
            {description}
          </p>
        </div>
      </div>
    );
  }
}

export default FeatureCard;

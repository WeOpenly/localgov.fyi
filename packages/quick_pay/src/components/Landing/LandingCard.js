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
          border: "none",
          background: "#fff",
          marginBottom: "0.5rem",
          marginTop: "0.5rem",
          padding: "0.4rem",
          borderRadius: "0.3rem"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={styles.cardImage}
        >
          {icon}
        </div>
        <div className={`${styles.cardHeader} ${styles.textCenter}`}>
          <h6 className={`${styles.cardTitle}`}>{heading}</h6>
        </div>
      </div>
    );
  }
}

export default FeatureCard;

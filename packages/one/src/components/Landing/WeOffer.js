import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class WeOffer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { services } = this.props;
    return (
      <div
        className={`${styles.card} ${styles.textLeft}`}
        style={{
          border: "1px solid rgba(48,55,66,.10)",
          background: "#fff",
          minHeight: "200px",

          marginBottom: "4rem",
          marginTop: "1rem",
          padding: "0.4rem",
          borderRadius: "0.3rem",
          boxShadow: "0 .3rem 0.8rem rgba(48,55,66,.10)"
        }}
      >
        <div className={styles.cardHeader}>WeOffer</div>
      </div>
    );
  }
}

export default WeOffer;

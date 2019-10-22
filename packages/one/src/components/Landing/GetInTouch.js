import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class GetInTouch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className={`${styles.column} ${styles.col2} ${styles.hideXs}`} />
        <div
          className={`${styles.column} ${styles.col8} ${styles.colXs12} ${styles.textCenter}`}
        >
          <div>
            <span className={`${styles.textGray}`}>
              <h5>Get in touch</h5>
            </span>
          </div>
          <div>
            <h3>team@papergov.com</h3>
            <h5>650-667-0070</h5>
          </div>
        </div>

        <div className={`${styles.column} ${styles.col2} ${styles.hideXs}`} />
      </Fragment>
    );
  }
}

export default GetInTouch;

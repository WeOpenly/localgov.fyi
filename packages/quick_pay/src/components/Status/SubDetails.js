import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import currency from "currency.js";

import { navigate } from "@reach/router";
import PropTypes from "prop-types";


import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class SubDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { guessPrice, userPrice } = this.props;
    let price = "NA";

    if (guessPrice && guessPrice !== "NA") {
        price = guessPrice;
        price = String(currency(price).value);
    }
    if (userPrice) {
        price = userPrice;
    }

    const finalAmt = currency(price).add(currency(price).multiply("0.05"));
    const finalAmtShow = finalAmt.value;

    return (
      <div
        className={styles.card}
        style={{
          marginBottom: "1rem"
        }}
      >
        <ul style={{ margin: "0.8rem" }}>
          <div style={{ paddingBottom: "0.5rem", textAlign: "left" }}>
            <h5> Transaction Summary </h5>
          </div>
          <li
            className={styles.menuItem}
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <p
              style={{ marginBottom: "0.2rem", fontStyle: "bold" }}
              className={styles.textBold}
            >
              Amount to pay
            </p>

            <div className={`${styles.menuItem} ${styles.textBold}`}>
              {`$`}
              {price}
            </div>
          </li>

          <li
            className={styles.menuItem}
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <p
              style={{ marginBottom: "0.2rem" }}
              data-tooltip="papergov performs this on your behalf for a small
              fee"
            >
              Service Fee
              <sup>
                <span
                  className={`${iconStyles.typcn} ${iconStyles.typcnInfoLarge}`}
                ></span>
              </sup>
            </p>

            <div className={styles.menuItem}>5%</div>
          </li>

          <li className={styles.divider}></li>
          <li
            className={styles.menuItem}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 4px"
            }}
          >
            <div style={{ fontWeight: "bold" }}>Total</div>

            <div className={styles.menuItem} style={{ fontWeight: "bold" }}>
              {"$"}
              {finalAmtShow}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default SubDetails;


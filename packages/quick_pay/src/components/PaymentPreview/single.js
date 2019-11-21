import React, { Component } from "react";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;

class SinglePayment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { price, finalAmtShow } = this.props;

    return (
      <>
        <li
          className={styles.menuItem}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "16px 8px"
          }}
        >
          <h5>Payment Summary</h5>
        </li>
        <li
          className={styles.menuItem}
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div>
            <span
              className={`${iconStyles.typcn} ${iconStyles.typcnCreditCard}`}
            ></span>
            Amount to pay
          </div>

          <div className={styles.menuItem}>
            {`$`}
            {price}
          </div>
        </li>
        <li className={styles.divider}></li>
        <li
          className={styles.menuItem}
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div
            className={`${styles.tooltip} ${styles.tooltipRight}`}
            data-tooltip="papergov performs this on your behalf for a small fee"
          >
            <span
              className={`${iconStyles.typcn} ${iconStyles.typcnSupport}`}
            ></span>
            Service Fee
            <sup>
              <span
                className={`${iconStyles.typcn} ${iconStyles.typcnInfoLarge}`}
              ></span>
            </sup>
          </div>

          <div className={styles.menuItem}>5%</div>
        </li>
        <li className={styles.divider}></li>

        <li
          className={styles.menuItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 10px"
          }}
        >
          <div style={{ fontWeight: "bold" }}>Total</div>

          <div className={styles.menuItem} style={{ fontWeight: "bold" }}>
            {"$"}
            {finalAmtShow}
          </div>
        </li>

        <li
          className={styles.menuItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 8px 0 8px"
          }}
        >
          <button
            style={{
              marginTop: "16px",
              width: "100%",
              fontSize: "14px"
            }}
            className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} ${styles.textUppercase} ${styles.textBold}`}
            type="submit"
          >
            {" "}
            <span
              className={`${iconStyles.typcn} ${iconStyles.typcnThumbsUp}`}
            ></span>
            Pay {"$"}
            {finalAmtShow}
          </button>
        </li>
        <li
          className={styles.menuItem}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "8px 8px",
            alignItems: "center"
          }}
        >
          <small style={{ fontSize: "12px" }}>
            <span
              className={`${iconStyles.typcn} ${iconStyles.typcnInfoLarge}`}
            ></span>
            You accept terms by cicking this
          </small>
        </li>
      </>
    );
  }
}

export default SinglePayment;

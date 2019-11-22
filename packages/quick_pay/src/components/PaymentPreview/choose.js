import React, { Component } from "react";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

import SinglePayment from './single';
import SubscriptionPayment from './subsciption';

const windowGlobal = typeof window !== "undefined" && window;

class ChoosePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: null
    };
    this.setChoice = this.setChoice.bind(this);
  }

  setChoice(choice) {
    const {createCharge, createChargeAndSub, sub_packages} = this.props;
    const stripePlanId = sub_packages[0].stripe_pack_id;

    this.setState({
      choice
    });
    if (choice === 'single'){
      createCharge();
    } else if (choice === 'sub'){
      createChargeAndSub(stripePlanId);
    }
  }

  render() {
    const { sub_prompt, sub_packages, finalAmtShow } = this.props;

    const yearlyCost = sub_packages[0].cost_yearly

    const single = (
      <div
        className={`${styles.tile} ${styles.textLeft}`}
        onClick={() => this.setChoice("single")}
        style={{
          border: "1px solid rgba(48,55,66,.10)",
          background: "#fff",
          cursor: "pointer",
          marginBottom: "1rem",
          marginTop: "1rem",
          padding: "1rem 0.4rem 0rem 0.4rem",
          borderRadius: "0.3rem"
        }}
      >
        <div className={styles.tileIcon}>
          <span
            style={{ color: "rgba(86, 39, 255, .6)", fontSize: "1.7rem" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnFlash}`}
          />
        </div>
        <div className={styles.tileContent} style={{ padding: "0 0.1rem" }}>
          <div>
            <h5 style={{ color: "#455060" }}>Single Payment</h5>
            <p
              style={{ marginBotton: "0.2rem", paddingRight: "1rem" }}
              className={`${styles.cardSubitle} ${styles.textGray}`}
            >
              Unlock silver privileges on all of the week
            </p>
          </div>
        </div>
        <div
          className={styles.tileAction}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.2rem"
          }}
        >
          <h6>
            <small> $ </small> {finalAmtShow}
          </h6>
          <small className={styles.textGray}> per month </small>
        </div>
      </div>
    );

    const sub = (
      <div
        className={`${styles.tile} ${styles.textLeft}`}
        onClick={() => this.setChoice("sub")}
        style={{
          border: "1px solid rgba(50, 182, 67, .4)",
          cursor: "pointer",
          background: "#fff",
          marginBottom: "1rem",
          marginTop: "1rem",
          padding: "1rem 0.4rem 0rem 0.4rem",
          borderRadius: "0.3rem"
        }}
      >
        <div className={styles.tileIcon}>
          <span
            style={{ color: "#39c94b", fontSize: "1.7rem" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnGift}`}
          />
        </div>
        <div className={styles.tileContent} style={{ padding: "0 0.1rem" }}>
          <div>
            <h5 className={`${styles.cardTitle}`} style={{ color: "#2da23c" }}>
              Full Membership
            </h5>
            <p
              style={{
                marginBotton: "0.2rem",
                paddingRight: "1rem",
                color: "#2da23c"
              }}
            >
              Unlock gold privileges on all of the week
            </p>
          </div>
        </div>
        <div
          className={styles.tileAction}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.2rem"
          }}
        >
          <h6>{yearlyCost}</h6>
          <small className={styles.textGray}> per month </small>
        </div>
      </div>
    );

    return (
      <div className={`${styles.columns}`}>
        {/* desktop */}
        <div
          className={`${styles.column} ${styles.col2} ${styles.hideXs} ${styles.textLeft}`}
        ></div>
        <div
          style={{ padding: "0.5rem" }}
          className={`${styles.column} ${styles.col4} ${styles.hideXs} ${styles.textLeft}`}
        >
          {single}
        </div>
        <div
          style={{ padding: "0.5rem" }}
          className={`${styles.column} ${styles.col4} ${styles.hideXs} ${styles.textLeft}`}
        >
          {sub}
        </div>
        <div
          className={`${styles.column} ${styles.col2} ${styles.hideXs} ${styles.textLeft}`}
        ></div>
        {/* mobile */}
        <div
          style={{ padding: "0.5rem 0.8rem 1rem 0.8rem" }}
          className={`${styles.column} ${styles.col12} ${styles.showXs} ${styles.textCenter}`}
        >
          {single}
          <div className={styles.divider} />
          {sub}
          {this.state.choice === "single" ? <SinglePayment /> : null}
          {this.state.choice === "sub" ? <SubscriptionPayment /> : null}
        </div>
      </div>
    );
  }
}

export default ChoosePayment;

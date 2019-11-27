import React, { Component, Fragment } from "react";

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
    const { createCharge, onCreateSub, sub_packages } = this.props;
    const stripePlanId = sub_packages[0].stripe_pack_id;

    this.setState({
      choice
    });
    if (choice === 'single'){
      createCharge();
    } else if (choice === 'sub'){
      onCreateSub(stripePlanId);
    }
  }

  render() {
    const {
      sub_prompt,
      sub_packages,
      finalAmtShow,
      price,
      withSubCost
    } = this.props;

    const yearlyCost = sub_packages[0].cost_yearly

    const single = (
      <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <div
          className={`${styles.tile} ${styles.textLeft}`}
          style={{
            display: "flex",
            border: "1px solid rgba(48,55,66,.10)",
            background: "#fff",
            cursor: "pointer",

            padding: "1rem 0.4rem 0rem 0.4rem",
            borderRadius: "0.3rem"
          }}
        >
          <div className={styles.tileIcon} style={{ flex: "15%" }}>
            <span
              style={{ color: "rgba(86, 39, 255, .4)", fontSize: "1.7rem" }}
              className={`${iconStyles.typcn} ${iconStyles.typcnFlash}`}
            />
          </div>
          <div
            className={styles.tileContent}
            style={{ flex: "85%", padding: "0.2rem 0.3rem 1rem 0" }}
          >
            <div>
              <h5 style={{ color: "rgba(86, 39, 255, .6)" }}>
                One Time Payment
              </h5>
              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    margin: "0 0",
        
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                  className={`${styles.textGray}`}
                >
                  <div> Just pay this one time </div>
                  <div>
                    <small> $</small>
                    {price}
                  </div>
                </div>
                <div
                  style={{
                    margin: "0 0",
             
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                  className={`${styles.textGray}`}
                >
                  <div> Transaction fee </div>
                  <div> 5%</div>
                </div>
                <div
                  style={{
                    margin: "0 0",
             
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                  className={`${styles.textGray}`}
                >
                  <div> Estimated wait </div>
                  <div> 1 day</div>
                </div>

                <button
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    fontSize: "14px"
                  }}
                  onClick={() => this.setChoice("single")}
                  className={`${styles.btn} ${styles.btnSecondary} ${styles.btnLg} ${styles.textUppercase} ${styles.textBold}`}
                >
                  Pay {"$"}
                  {finalAmtShow}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const sub = (
      <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <div
          className={`${styles.tile} ${styles.textLeft}`}
          style={{
            border: "1px solid rgba(50, 182, 67, .4)",
            cursor: "pointer",
            background: "#fff",

            padding: "1rem 0.4rem 0rem 0.4rem",
            borderRadius: "0.3rem"
          }}
        >
          <div className={styles.tileIcon} style={{ flex: "15%" }}>
            <span
              style={{ color: "#39c94b", fontSize: "1.7rem" }}
              className={`${iconStyles.typcn} ${iconStyles.typcnGift}`}
            />
          </div>
          <div
            className={styles.tileContent}
            style={{ flex: "85%", padding: "0.2rem 0.3rem 1rem 0" }}
          >
            <div>
              <h5 style={{ color: "#2da23c" }}> Setup Autopay</h5>
              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    margin: "0 0",

                    display: "flex",
                    justifyContent: "space-between"
                  }}
                  className={`${styles.textGray}`}
                >
                  <div> Amount for this bill </div>
                  <div>
                    <small> $</small>
                    {price}
                  </div>
                </div>
                <div
                  style={{
                    margin: "0 0",

                    display: "flex",
                    justifyContent: "space-between"
                  }}
                  className={`${styles.textGray}`}
                >
                  <div> Transaction fee </div>
                  <div> 5%</div>
                </div>
                <div
                  style={{
                    margin: "0 0",

                    display: "flex",
                    justifyContent: "space-between"
                  }}
                  className={`${styles.textSemibold}`}
                >
                  <div> Your future bills on autopay *</div>
                  <div>
                    <small> $</small>
                    {yearlyCost}
                    <small className={styles.textGray}> / mo</small>
                  </div>
                </div>
                <button
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    fontSize: "14px"
                  }}
                  onClick={() => this.setChoice("sub")}
                  className={`${styles.btn} ${styles.btnSuccess} ${styles.textUppercase} ${styles.textBold}`}
                >
                  Pay {"$"}
                  {withSubCost}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <small className={styles.textGray}>*billed yearly </small>
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

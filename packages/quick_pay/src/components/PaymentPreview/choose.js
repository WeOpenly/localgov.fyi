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
    this.setState({
      choice
    });
  }

  render() {
    const { price, finalAmtShow } = this.props;

    const single = (
      <div
        className={`${styles.card} ${styles.textLeft}`}
        onClick={() => this.setChoice("sub")}
        style={{
          border: "1px solid rgba(48,55,66,.10)",
          background: "#fff",
          marginBottom: "1rem",
          marginTop: "1rem",
          padding: "0.4rem",
          borderRadius: "0.3rem"
        }}
      >
        <div className={styles.cardHeader}>
          <h5 className={`${styles.cardTitle}`}>Single Pay</h5>
        </div>
        <div className={styles.cardBody}>
          <p
            style={{ lineHeight: "1.1rem" }}
            className={`${styles.cardSubitle} ${styles.textGray}`}
          ></p>
        </div>
      </div>
    );

    const sub = (
      <div
        className={`${styles.card} ${styles.textLeft}`}
        onClick={() => this.setChoice("sub")}
        style={{
          border: "1px solid rgba(48,55,66,.10)",
          background: "#fff",
          marginBottom: "1rem",
          marginTop: "1rem",
          padding: "0.4rem",
          borderRadius: "0.3rem"
        }}
      >
        <div className={styles.cardHeader}>
          <h5 className={`${styles.cardTitle}`}>Sub Pay</h5>
        </div>
        <div className={styles.cardBody}>
          <p
            style={{ lineHeight: "1.1rem" }}
            className={`${styles.cardSubitle} ${styles.textGray}`}
          ></p>
        </div>
      </div>
    );

    return (
      <>
        <div>choose it</div>
        {single}
        <div className={styles.divider} />
        {sub}
        {this.state.choice === "single" ? <SinglePayment /> : null}
        {this.state.choice === "sub" ? <SubscriptionPayment /> : null}
      </>
    );
  }
}

export default ChoosePayment;

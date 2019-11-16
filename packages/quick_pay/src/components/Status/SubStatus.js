import React, { Component } from "react";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class SubStatus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        className={`${styles.card} ${styles.textLeft}`}
        style={{
          marginBottom: "1rem"
        }}
      >
        <div className={styles.cardHeader}>
          <h5 className={`${styles.cardTitle}`}>Transaction Status</h5>
        </div>

        <div className={styles.cardBody}>
          We just sent a confirmation email for your payment
        </div>
      </div>
    );
  }
}

export default SubStatus;

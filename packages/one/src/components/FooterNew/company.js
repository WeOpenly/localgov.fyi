import React, { Component } from "react";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class FooterCompany extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={`${styles.columns}`}>
        <div
          className={`${styles.column} ${styles.col12}  ${styles.hideXs} ${styles.textLeft}`}
        >
          <div style={{ paddingBottom: "0.5rem" }}>
            <h6> Company</h6>
          </div>

          <div>
            <a className={styles.textGray} href={`/about`} target="_blank">
              About
            </a>
          </div>

          <div>
            <a
              className={styles.textGray}
              href={`https://papergov.com/blog`}
              target="_blank"
            >
              Blog
            </a>
          </div>
        </div>
        <div
          className={`${styles.column} ${styles.col12}  ${styles.showXs} ${styles.textCenter}`}
        >
          <div style={{ paddingBottom: "0.5rem" }}>
            <h6> Company</h6>
          </div>

          <div>
            <a className={styles.textGray} href={`/about`} target="_blank">
              About
            </a>
          </div>

          <div>
            <a
              className={styles.textGray}
              href={`https://papergov.com/blog`}
              target="_blank"
            >
              Blog
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterCompany;

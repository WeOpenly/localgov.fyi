import React, { Component } from "react";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";


class FooterSupport extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        const { classes, } = this.props;

        return (
          <div className={`${styles.columns}`}>
            <div
              className={`${styles.column} ${styles.col12}  ${styles.hideXs} ${styles.textLeft}}`}
            >
              <div style={{ paddingBottom: "0.5rem" }}>
                <h6> Support</h6>
              </div>

              <div>
                <a
                  href={`https://papergov.zendesk.com/hc/en-us`}
                  className={styles.textGray}
                  target="_blank"
                >
                  Help & FAQ
                </a>
              </div>

              <div>
                <a
                  href={`https://papergov.com/terms`}
                  className={styles.textGray}
                  target="_blank"
                >
                  Terms
                </a>
              </div>

              <div>
                <a
                  className={styles.textGray}
                  href={`https://papergov.com/privacy`}
                  target="_blank"
                >
                  Privacy
                </a>
              </div>
            </div>
            <div
              className={`${styles.column} ${styles.col12}  ${styles.showXs} ${styles.textCenter}`}
            >
              <div style={{ paddingBottom: "0.5rem" }}>
                <h6> Support</h6>
              </div>

              <div>
                <a
                  href={`https://papergov.zendesk.com/hc/en-us`}
                  className={styles.textGray}
                  target="_blank"
                >
                  Help & FAQ
                </a>
              </div>

              <div>
                <a
                  href={`https://papergov.com/terms`}
                  className={styles.textGray}
                  target="_blank"
                >
                  Terms
                </a>
              </div>

              <div>
                <a
                  className={styles.textGray}
                  href={`https://papergov.com/privacy`}
                  target="_blank"
                >
                  Privacy
                </a>
              </div>
            </div>
          </div>
        );
    }
}

export default FooterSupport;

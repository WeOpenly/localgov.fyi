import React, { Component } from 'react';

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";


class CommonNav extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes, location, isMobile } = this.props;

        return (
          <div className={styles.columns}>
            <div
              className={`${styles.column} ${styles.col6} ${styles.textLeft}`}
              style={{ display: "flex", paddingTop: "0.2rem" }}
            >
              <a style={{ textDecoration: "none" }} href="/">
                <h4>papergov</h4>
              </a>
            </div>

            <div
              className={`${styles.column} ${styles.col6} ${styles.textRight}`}
              style={{ display: "flex", justifyContent: 'right' }}
            >
              <a
          
                href={`https://papergov.com/locations`}
                style={{ padding: "0.5rem" }}
                target="_blank"
              >
                Locations
              </a>

              <a
         
                href={`https://papergov.com/services`}
                style={{ padding: "0.5rem" }}
                target="_blank"
              >
                Services
              </a>
              <a
        
                href={`https://papergov.com/help`}
                style={{ padding: "0.5rem" }}
                target="_blank"
              >
                Help
              </a>
            </div>
          </div>
        );
    }
}


export default CommonNav;

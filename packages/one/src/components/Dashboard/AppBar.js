import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";

import styles from "../spectre.min.module.css"
import iconStyles from '../typicons.min.module.css';

class AppBar extends Component {
    constructor(props) {
        super(props);
      
    }


    render() {
        const {
            displayName,
            photoURL,
            showCrumbs,
            onMenuClick
        } = this.props;

        return (
          <div>
            <header
              className={styles.navbar}
              style={{
                background: "#fff",
                padding: "0.6rem 0.5rem",
                boxShadow: "0 0 0.5rem 0.3rem rgba(50,50,93,.04)"
              }}
            >
              <section
                className={styles.navbarSection}
                style={{ marginLeft: "1rem" }}
              >
                {showCrumbs ? (
                  <div onClick={() => onMenuClick(true)}>
                    <span
                      className={`${iconStyles.typcn} ${iconStyles.typcnThMenu}`}
                      style={{
                        fontSize: "1rem",
                        cursor: "pointer",
                        marginRight: "1rem"
                      }}
                    />
                  </div>
                ) : null}
          
              </section>
              <section className={styles.navbarSection}>
                <a
                  href={`https://evergov.com/terms`}
                  style={{ padding: "0.5rem" }}
                  target="_blank"
                >
                  Terms
                </a>

                <a
                  href={`https://evergov.com/privacy`}
                  style={{ padding: "0.5rem" }}
                  target="_blank"
                >
                  Privacy
                </a>
              </section>
            </header>
          </div>
        );
    }
}

export default AppBar;


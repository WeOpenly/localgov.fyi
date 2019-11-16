import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Elements, StripeProvider } from "react-stripe-elements";
import Link from "gatsby-link";

import SubStatusPage from "../../components/Status/SubStatusPage";

import { Router } from "@reach/router";

import styles from "../../components/spectre.min.module.css";
import FirebaseContext from "../../common/firebase/context.js";
import getFirebse from "../../common/firebase/firebase.js";


const windowGlobal = typeof window !== "undefined" && window;

class QPStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: windowGlobal.innerWidth };
  }

  render() {
    const isMobile = this.state.width <= 500;
    return (
      <Fragment>
        <Helmet>
          <title>{`Papergov Quickpay`}</title>
        </Helmet>

        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div className={`${styles.column} ${styles.col10}`}>
            <header className={styles.navbar}>
              <section
                style={{ padding: "0.5rem 0" }}
                className={styles.navbarSection}
              >
                <Link to="/">
                  <a href="#" style={{ textDecoration: "none" }}>
                    <h3>
                      papergov
                      <sub
                        className={styles.textUppercase}
                        style={{
                          color: "#455060",
                          fontSize: "0.5rem",
                          letterSpacing: "0.1rem",
                          fontWeight: "bold"
                        }}
                      >
                        QuickPay
                      </sub>
                    </h3>
                  </a>
                </Link>
              </section>

              <section className={styles.navbarSection}>
                <a
                  href={`https://papergov.com/terms`}
                  style={{ padding: "0.5rem" }}
                  target="_blank"
                >
                  Terms
                </a>

                <a
                  href={`https://papergov.com/privacy`}
                  style={{ padding: "0.5rem" }}
                  target="_blank"
                >
                  Privacy
                </a>
              </section>
            </header>
          </div>
          <div className={`${styles.column} ${styles.col1}`}></div>
        </div>

        <FirebaseContext.Provider value={getFirebse}>
    
            <Router>
              <SubStatusPage isMobile={isMobile} path="/status/:subId" />
            </Router>
  
        </FirebaseContext.Provider>
      </Fragment>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...ownProps
  };
};

export default connect(mapStateToProps)(QPStatus);

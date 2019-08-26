import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { updateUserType } from "../actions";

import styles from "../spectre.min.module.css";


class UserTypeChoice extends Component {
  constructor(props) {
    super(props);
    this.chooseUserType = this.chooseUserType.bind(this);
  }

  chooseUserType(type){
    const { dispatch, userDetails } = this.props;
    const { uid } = userDetails;
    dispatch(updateUserType(uid, type));
  }

  render() {
    const {userDetails} = this.props;
    const {displayName} = userDetails;

    return (
      <Fragment>
        <header
          className={styles.navbar}
          style={{
            background: "#fff",
            padding: "10px 16px",
            boxShadow: "0 2px 4px rgba(50,50,93,.04)"
          }}
        >
          <section className={styles.navbarSection}>
            <a
              href="/"
              style={{ fontSize: "1.2rem" }}
              className={`${styles.btn} ${styles.btnLink} ${styles.h1}`}
            >
              evergov
            </a>
            <sub
              className={styles.textUppercase}
              style={{
                fontSize: "0.5rem",
                paddingTop: "4px",
                letterSpacing: "0.1rem",
                fontWeight: "bold"
              }}
            >
              One
            </sub>
          </section>

          <section className={styles.navbarSection}>
            <a
              href="/"
              style={{ fontSize: "14px" }}
              className={`${styles.btn} ${styles.btnLink}`}
            >
              Terms
            </a>
            <a
              href="/"
              style={{ fontSize: "14px" }}
              className={`${styles.btn} ${styles.btnLink}`}
            >
              Privacy
            </a>
          </section>
        </header>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col12}`}>
            <div className={styles.empty} style={{ height: "100vh" }}>
              <h3 className={`${styles.emptyTitle} ${styles.h3}`}>
                Welcome, {displayName}
              </h3>
              <p className={`${styles.emptySubTitle}`}>
                We're passionate about providing delightful gov service
                interactions
                <br />
                Let’s do this :)
              </p>

              <p style={{ paddingBottom: "4px" }}>
                {" "}
                What best defines you?
              </p>
              <div
                className={styles.emptyAction}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ display: "flex", alignSelf: "center" }}>
                  <div
                    onClick={() =>
                      this.chooseUserType({ isIndividual: true })
                    }
                    className={`${styles.formRadio} ${styles.formInline}  ${
                      styles.card
                    }`}
                    style={{
                      cursor: "pointer",
                      width: "160px",
                      height: "160px",
                      border: 0,
                      boxShadow: "0 .25rem 1rem rgba(48,55,66,.15)",
                      padding: "1rem",
                      margin: "0.5rem"
                    }}
                  >
                    Individual
                  </div>
                  <div
                    onClick={() =>
                      this.chooseUserType({ isBusiness: true })
                    }
                    className={`${styles.formRadio} ${styles.formInline} ${
                      styles.card
                    }`}
                    style={{
                      cursor: "pointer",
                      width: "160px",
                      height: "160px",
                      border: 0,
                      boxShadow: "0 .25rem 1rem rgba(48,55,66,.15)",
                      padding: "1rem",
                      margin: "0.5rem"
                    }}
                  >
                    Business
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.oneUser
  };
};

export default connect(mapStateToProps)(UserTypeChoice);

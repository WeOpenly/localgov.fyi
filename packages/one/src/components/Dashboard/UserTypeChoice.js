import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { updateUserPackage, updateServerOnboardingStep } from "../User/actions";

import styles from "../spectre.min.module.css"
import iconStyles from '../typicons.min.module.css';

class UserTypeChoice extends Component {
  constructor(props) {
    super(props);
    this.chooseUserType = this.chooseUserType.bind(this);
  }


  chooseUserType(type){
    const { dispatch, oneUser } = this.props;
    const {details} = oneUser;
    const { uid } = details;
    dispatch(updateUserPackage(uid, type));
    dispatch(updateServerOnboardingStep(uid, 'add_services'));
  }

  render() {
    const { details } = this.props.oneUser;
    const { displayName } = details;

    return (
      <Fragment>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col12}`}>
            <div className={styles.empty} style={{ height: "100vh" }}>
              <h3 className={`${styles.emptyTitle}`}>Welcome, {displayName}</h3>
              <p className={`${styles.emptySubTitle} ${styles.textGray}`}>
                We're passionate about providing delightful gov service
                interactions
                <br />
                Let’s do this 😃
              </p>

              <div style={{ paddingBottom: "0.5rem", marginTop: "2.5rem" }}>
                {" "}
                <h6> What best defines you?</h6>
              </div>
              <div
                className={styles.emptyAction}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ display: "flex", alignSelf: "center" }}>
                  <div
                    className={`${styles.card} ${styles.textCenter}`}
                    onClick={() => this.chooseUserType({ packType: "ind" })}
                    style={{
                      border: "1px solid rgba(86, 39, 255, .2)",
                      background: "#fff",
                      cursor: "pointer",
                      padding: "1rem",
                      margin: "0.5rem",
                      borderRadius: "0.3rem",
                      boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
                    }}
                  >
                    <div
                      className={styles.cardImage}
                      style={{
                        margin: "1.1rem 0 0.6rem 0"
                      }}
                    >
                      <span
                        style={{
                          background: "#3500f3",
                          color: "#fff",
                          padding: "0.4rem",
                          fontSize: "1.5rem",
                          borderRadius: "0.3rem",
                          boxShadow: "0 0.1rem 1rem rgba(86, 39, 255, .2)"
                        }}
                        className={`${iconStyles.typcn} ${iconStyles.typcnUserOutline}`}
                      ></span>
                    </div>

                    <div className={styles.cardHeader}>
                      <h5 className={`${styles.cardTitle}`}>Individual</h5>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignSelf: "center" }}>
                  <div
                    className={`${styles.card} ${styles.textCenter}`}
                    onClick={() => this.chooseUserType({ packType: "starter" })}
                    style={{
                      border: "1px solid rgba(86, 39, 255, .2)",
                      background: "#fff",
                      margin: "0.5rem",
                      padding: "1rem",
                      cursor: "pointer",
                      borderRadius: "0.3rem",
                      boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
                    }}
                  >
                    <div
                      className={styles.cardImage}
                      style={{
                        margin: "1.1rem 0 0.6rem 0"
                      }}
                    >
                      <span
                        style={{
                          background: "#3500f3",
                          color: "#fff",
                          padding: "0.4rem",
                          fontSize: "1.5rem",
                          borderRadius: "0.3rem",
                          boxShadow: "0 0.1rem 1rem rgba(86, 39, 255, .2)"
                        }}
                        className={`${iconStyles.typcn} ${iconStyles.typcnBriefcase}`}
                      ></span>
                    </div>

                    <div className={styles.cardHeader}>
                      <h5 className={`${styles.cardTitle}`}>Business</h5>
                    </div>
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
    oneUser: state.oneUser
  };
};

export default connect(mapStateToProps)(UserTypeChoice);

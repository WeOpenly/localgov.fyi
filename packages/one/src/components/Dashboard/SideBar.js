import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

import { Router, Link, Match } from "@reach/router";

import Drawer from "@material-ui/core/Drawer";

import styles from "../spectre.min.module.css"
import iconStyles from '../typicons.min.module.css';
const windowGlobal = typeof window !== "undefined" && window;

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            displayName,
            photoURL,
            onMenuClick
        } = this.props;

        return (
          <Drawer open={this.props.open} onClose={() => onMenuClick(false)}>
            <section
              className={styles.navbarSection}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                width: "240px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "1rem"
                }}
              >
                <Link
                  to="/one"
                  className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}
                  style={{ textDecoration: "none", color: "#5627ff" }}
                >
                  <h3>
                    {" "}
                    papergov{" "}
                    <sub
                      className={styles.textUppercase}
                      style={{
                        color: "#455060",
                        fontSize: "0.5rem",
                        paddingTop: "4px",
                        letterSpacing: "0.1rem",
                        fontWeight: "bold"
                      }}
                    >
                      One
                    </sub>{" "}
                  </h3>
                </Link>
                <div
                  onClick={() => onMenuClick(false)}
                  className={`${styles.btn} ${styles.btnClear}`}
                />
              </div>
              <div
                style={{
                  marginTop: "4rem",
                  margin: "4rem 1rem",
                  display: "flex",

                  flexDirection: "column"
                }}
              >
                <div
                  className={`${styles.navItem} ${styles.textBold}`}
                  onClick={() => {
                    navigate("/dashboard");
                    onMenuClick(false);
                  }}
                >
                  <div
                    className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}
                  >
                    <span
                      className={`${iconStyles.typcn} ${iconStyles.typcnHome}`}
                      style={{
                        fontSize: "0.8rem",
                        padding: "0 1rem 0 0",
                        cursor: "pointer"
                      }}
                    />
                    Dashboard
                  </div>
                </div>

                <div className={styles.divider} />
                <div
                  className={`${styles.navItem}`}
                  onClick={() => {
                    navigate("/dashboard/services");
                    onMenuClick(false);
                  }}
                >
                  <div
                    className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}
                  >
                    <span
                      className={`${iconStyles.typcn} ${iconStyles.typcnPuzzle}`}
                      style={{
                        fontSize: "0.8rem",
                        padding: "0 1rem 0 0",
                        cursor: "pointer"
                      }}
                    />
                    Services
                  </div>
                </div>
                <div className={styles.divider} />
                <div
                  className={`${styles.navItem}`}
                  onClick={() => {
                    navigate("/dashboard/receipts");
                    onMenuClick(false);
                  }}
                >
                  <div
                    className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}
                  >
                    <span
                      className={`${iconStyles.typcn} ${iconStyles.typcnDocumentText}`}
                      style={{
                        fontSize: "0.8rem",
                        padding: "0 1rem 0 0",
                        cursor: "pointer"
                      }}
                    />
                    Receipts
                  </div>
                </div>
                <div className={styles.divider} />
                <div className={`${styles.navItem}`}>
                  <div
                    className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}
                    onClick={() => {
                      if (windowGlobal && windowGlobal.drift) {
                        windowGlobal.drift.api.startInteraction({
                          interactionId: 105621
                        });
                      }
                      onMenuClick(false);
                    }}
                  >
                    <span
                      className={`${iconStyles.typcn} ${iconStyles.typcnSupport}`}
                      style={{
                        fontSize: "0.8rem",
                        padding: "0 1rem 0 0",
                        cursor: "pointer"
                      }}
                    />
                    Support
                  </div>
                </div>
                <div className={styles.divider} />
                <div className={`${styles.navItem}`}>
                  <div
                    className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}
                    onClick={() => {
                      navigate("/dashboard/faqs");
                      onMenuClick(false);
                    }}
                  >
                    <span
                      className={`${iconStyles.typcn} ${iconStyles.typcnMessages}`}
                      style={{
                        fontSize: "0.8rem",
                        padding: "0 1rem 0 0",
                        cursor: "pointer"
                      }}
                    />
                    FAQ
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "1.2rem 1.2rem"
                }}
              >
                <div className={styles.divider} style={{ padding: "0.2rem" }} />
                <div
                  className={`${styles.tile} ${styles.tileCentered}`}
                  style={{ overflow: "visible" }}
                >
                  <div className={`${styles.tileIcon} `}>
                    <figure
                      className={`${styles.avatar} ${styles.avatarLg}`}
                      data-initial="EG"
                      style={{ backgroundColor: "#3500f3" }}
                    >
                      <img src={photoURL} alt={displayName} />
                    </figure>
                  </div>

                  <div className={styles.tileContent}>
                    <div style={{ maxWidth: "120px" }}>
                      <h6>{displayName}</h6>

                      <div
                        onClick={() => {
                          navigate("/dashboard/account");
                          onMenuClick(false);
                        }}
                      >
                        <small
                          style={{
                            color: "#3500f3",
                            cursor: 'pointer'
                          }}
                        >
                          Settings
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Drawer>
        );
    }
}



const mapStateToProps = function (state, ownProps) {
    return {
        oneUser: state.oneUser,
        oneServices: state.oneServices
    };
};

export default connect(mapStateToProps)(Home);
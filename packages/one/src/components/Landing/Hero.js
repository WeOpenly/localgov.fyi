import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "gatsby-link";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    this.changeEmail = this.changeEmail.bind(this);
  }

  changeEmail(ev) {
    this.setState({
      email: ev.target.value
    });
  }

  render() {
    const { authInProgress, onGetStartedClick } = this.props;

    return (
      <Fragment>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div className={`${styles.column} ${styles.col10}`}>
            <header className={styles.navbar}>
              <section
                style={{ padding: "0.5rem" }}
                className={styles.navbarSection}
              >
                <Link to="/">
                  <a href="#" style={{ textDecoration: "none" }}>
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
        <div
          className={`${styles.columns}`}
          style={{ margin: "4rem 0 4rem 0" }}
        >
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div
            className={`${styles.column} ${styles.colMd6} ${styles.colSm12}`}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "40px"
              }}
            >
              <h1
                style={{
                  margin: "1rem 1rem 1rem 0",
                  fontSize: "2.1rem",
                  lineHeight: "2.5rem"
                }}
              >
                {" "}
                {this.props.heroTitle}
              </h1>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.3rem"
                }}
              >
                {this.props.heroSubtitle}
              </p>

              <div style={{ maxWidth: "400px" }}>
                {authInProgress ? (
                  <div className={styles.loading} />
                ) : (
                  <div className={styles.inputGroup}>
                    <input
                      onChange={this.changeEmail}
                      type="email"
                      className={`${styles.formInput} ${styles.inputLg}`}
                      style={{ height: "2.1rem", marginRight: "0.5rem" }}
                      placeholder="your@email.com"
                    />
                    <button
                      onClick={() => onGetStartedClick(this.state.email)}
                      className={`${styles.btn} ${styles.btnSecondary} ${styles.inputGroupButton}`}
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`${styles.column} ${styles.colMd6} ${styles.hideSm}`}
            style={{ display: "flex", justifyContent: "right" }}
          >
            {this.props.illustration}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Hero;

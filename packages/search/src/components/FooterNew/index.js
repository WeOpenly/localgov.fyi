import React, { Component } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaMedium,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";

import FooterDiscover from "./discover";
import FooterSupport from "./support";
import FooterCompany from './company';

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class FooterNew extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, isMobile } = this.props;
    const date = new Date().getFullYear();

    const facebookLogo = (
      <a href="https://facebook.com/papergov">
        <FaFacebook />
      </a>
    );

    const twitterLogo = (
      <a href="https://twitter.com/papergov">
        <FaTwitter />
      </a>
    );

    const mediumLogo = (
      <a href="https://www.medium.com/papergov/">
        <FaMedium />
      </a>
    );

    const igLogo = (
      <a href="https://www.instagram.com/papergov/">
        <FaInstagram />
      </a>
    );


    const LiLogo = (
      <a href="https://www.linkedin.com/company/papergov/">
        <FaLinkedin />
      </a>
    );

    return (
      <div className={`${styles.columns}`} style={{ background: "#f9fafc" }}>
        <div className={`${styles.column}  ${styles.col1} $ `}></div>
        <div className={`${styles.column}  ${styles.col10} `}>
          <div
            className={`${styles.columns}`}
            style={{ borderTop: "rgba(48,55,66,.15)", paddingTop: "4rem" }}
          >
            <div
              className={`${styles.column} ${styles.col8} ${styles.colLg8}  ${styles.colSm8} ${styles.colXs12} ${styles.textCenter}`}
              style={{ margin: "1rem 0" }}
            >
              <div className={`${styles.columns}`}>
                <div
                  style={{ margin: "0 0 1.5rem 0" }}
                  className={`${styles.column}  ${styles.col6} ${styles.colLg6}  ${styles.colSm6} ${styles.colXs12} `}
                >
                  <FooterDiscover isMobile={isMobile} />
                </div>
                <div
                  style={{ margin: "0 0 1.5rem 0" }}
                  className={`${styles.column} ${styles.col3} ${styles.colLg3}  ${styles.colSm3} ${styles.colXs12} ${styles.textLeft}`}
                >
                  <FooterSupport isMobile={isMobile} />
                </div>
                <div
                  style={{ margin: "0 0 1.5rem 0" }}
                  className={`${styles.column} ${styles.col3} ${styles.colLg3}  ${styles.colSm3} ${styles.colXs12} ${styles.textLeft}`}
                >
                  <FooterCompany isMobile={isMobile} />
                </div>
              </div>
            </div>
            <div
              className={`${styles.column} ${styles.col4}  ${styles.colLg4} ${styles.hideXs}  ${styles.colSm4} ${styles.colXs12} ${styles.textRight}`}
              style={{
                margin: "0.5rem 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
              }}
            >
              <div>
                <h1>papergov</h1>
              </div>

              <div>
                <p> Papergov is the leading place to discover & act on all local government services. </p>
              </div>

              <div
                style={{
                  paddingTop: "0.2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "120px"
                }}
              >
                {facebookLogo}
                {twitterLogo}
                {mediumLogo}
                {igLogo}
                {LiLogo}
              </div>
            </div>
            <div
              className={`${styles.column} ${styles.col4}  ${styles.colLg4} ${styles.showXs} ${styles.hideLg} ${styles.hideMd} ${styles.hideXl} ${styles.colSm4} ${styles.colXs12}
          ${styles.textCenter}`}
              style={{
                margin: "0.5rem 0 0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div>
                <h1>papergov</h1>
              </div>

              <div>
                <p> Papergov is the leading place to discover & act on all local government services. </p>
              </div>

              <div
                style={{
                  paddingTop: "0.2rem",
                  display: "flex",
                  margin: "0 4rem",
                  justifyContent: "space-evenly"
                }}
              >
                {facebookLogo}
                {twitterLogo}
                {mediumLogo}
                {igLogo}
                {LiLogo}
              </div>
            </div>
            <div
              style={{ margin: "2rem 0 1rem 0" }}
              className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
            >
              <div className={styles.textGray}>
                © {date}, Openly Technologies, Inc.
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.column}  ${styles.col1} $ `}></div>
      </div>
    );
  }
}

export default FooterNew;

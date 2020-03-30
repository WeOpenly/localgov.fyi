import React, { Component } from "react";
import { SocialIcon } from "react-social-icons";

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
      <SocialIcon
        url="https://facebook.com/papergov"
        network="facebook"
  
        style={{ height: 20, width: 20 }}
      />
    );

    const twitterLogo = (
      <SocialIcon
        url="https://twitter.com/papergov"
        network="twitter"
    
        style={{ height: 20, width: 20 }}
      />
    );

    const mediumLogo = (
      <SocialIcon
        url="https://www.medium.com/papergov/"
        network="medium"

        style={{ height: 20, width: 20 }}
      />
    );
    const igLogo = (
      <SocialIcon
        url="https://www.instagram.com/papergov/"
        network="instagram"

        style={{ height: 20, width: 20 }}
      />
    );

    const LiLogo = (
      <SocialIcon
        url="https://www.linkedin.com/company/papergov/"
        network="linkedin"
        style={{ height: 20, width: 20 }}
      />
    );
    return (
      <div
        className={`${styles.columns}`}
        style={{ borderTop: "rgba(48,55,66,.15)", paddingTop: "2rem" }}
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
            <h1 className={styles.textGray}>papergov</h1>
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
            <h1 className={styles.textGray}>papergov</h1>
          </div>

          <div
            style={{
              paddingTop: "0.2rem",
              display: "flex",
              margin: '0 4rem',
              justifyContent: "space-evenly",
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
    );
  }
}

export default FooterNew;

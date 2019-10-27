import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "gatsby-link";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;

class Testimony extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`${styles.card} ${styles.textLeft}`}
        style={{
          margin: "0.5rem 0.2rem",
          padding: "0.2rem 0.5rem",
          minHeight: "300px",

          border: "1px solid rgba(86, 39, 255, .1)",
          background: "#fff",
          marginBottom: "4rem",

          borderRadius: "0.3rem",
          boxShadow: "0 .1rem 0.7rem rgba(48,55,66,.10)"
        }}
      >
        <div
          className={styles.cardBody}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ textAlign: "left", color: "rgba(86, 39, 255)" }}>❝</h3>

            <p style={{ lineHeight: "1.1rem" }}>{this.props.comment}</p>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <div
            style={{
              display: "flex",
              margin: "0px 0.2rem",
              textAlign: "center",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div style={{ marginBottom: "0.8rem" }}>
              <figure
                className={`${styles.avatar} ${styles.avatarXl}`}
                data-initial="EG"
                style={{
                  backgroundColor: "#3500f3",
                  boxShadow: "0 0.2rem 0.5rem rgba(48,55,66,.30)",
                  border: "1px solid #fff",
                  width: "72px",
                  height: "72px"
                }}
              >
                {this.props.picture}
              </figure>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "0.8rem"
              }}
            >
              <h6>{this.props.userName}</h6>
              <p className={styles.textGray}>{this.props.userDesc}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Testimony;

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "gatsby-link";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

import CreateAccount from "../../illus/CreateAccount.js";
import AddDetails from "../../illus/AddDetails.js";
import Relax from "../../illus/Relax.js";

const windowGlobal = typeof window !== "undefined" && window;

class GetStarted extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className={`${styles.columns}  ${styles.textCenter}`}>
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div className={`${styles.column} ${styles.colXs10}}`} style={{marginBottom: '2rem'}}>
            <h3>Get started in a few minutes</h3>
            <p>
              We cover a variety of the most popular recurring services you will
              need.
            </p>
          </div>
          <div className={`${styles.column} ${styles.col1}`}></div>
        </div>
    <div className={`${styles.columns} `}>
        <div className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}>
          <div style={{ border: "none" }} className={` ${styles.textCenter}`}>
            <div
              className={styles.cardImage}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CreateAccount />
            </div>
            <div className={styles.cardHeader}>
              <h6 className={`${styles.cardTitle}`}>Create an account</h6>
            </div>
          </div>
        </div>
        <div className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}>
          <div style={{ border: "none" }} className={` ${styles.textCenter}`}>
            <div
              className={styles.cardImage}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <AddDetails />
            </div>
            <div className={styles.cardHeader}>
              <h6 className={`${styles.cardTitle}`}>
                Add your service details <br /> & link your payment info
              </h6>
            </div>
          </div>
        </div>
        <div className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}>
          <div style={{ border: "none" }} className={` ${styles.textCenter}`}>
            <div
              className={styles.cardImage}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Relax />
            </div>
            <div className={styles.cardHeader}>
              <h6 className={`${styles.cardTitle}`}>Sit back & relax</h6>
            </div>
          </div>
        </div>
        </div>
      </Fragment>
    );
  }
}

export default GetStarted;

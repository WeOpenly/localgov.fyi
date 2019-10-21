


import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "gatsby-link";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";


import {fetchSpecificPlans} from './actions';
const windowGlobal = typeof window !== "undefined" && window;


class Pricing extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Fragment>
        <div className={styles.columns} style={{ marginTop: "6rem" }}>
          <div className={`${styles.column} ${styles.col2}`} />
          <div className={`${styles.column}  ${styles.col8}`}>
            <div className={styles.textCenter}>
              <h3> Simple & Transparent Pricing </h3>
              <div className={`${styles.cardSubitle} ${styles.textGray}`}>
                Set it and forget it
              </div>
            </div>
          </div>
          <div className={`${styles.column} ${styles.col2}`} />
        </div>
        <div className={styles.columns} style={{ marginTop: "2rem" }}>
          <div className={`${styles.column} ${styles.col2}`} />
          <div className={`${styles.column}  ${styles.col8}`}>
            <div className={`${styles.columns}`}>
              <PaymentPlans onSelectPlan={this.loginGoogWplan} />
            </div>
          </div>
          <div className={`${styles.column} ${styles.col2}`} />
        </div>
      </Fragment>
    );
  }
}


export default GetStarted;

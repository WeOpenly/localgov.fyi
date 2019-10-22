


import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "gatsby-link";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

import PaymentPlans from './PaymentPlans';

const windowGlobal = typeof window !== "undefined" && window;


class Pricing extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {loading, plans, failed, onSelectPlan} = this.props;


    if (loading){
        return (
            <div className={styles.columns} style={{ marginTop: "1rem" }}>
            <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
            <div
                style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: "1rem"
                }}
                className={`${styles.column} ${styles.col10} ${styles.colXs12}`}
            >
                <div className={styles.loading} />
            </div>

            <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
            </div>
        );
    }

    return (
      <Fragment>
        <div
          className={`${styles.columns}`}
          style={{
            margin: "8rem 0 2rem 0"
          }}
        >
          <div className={`${styles.column} ${styles.col2}`} />
          <div className={`${styles.column}  ${styles.col8}`}>
            <div className={styles.textCenter}>
              <h3> Simple & Transparent Pricing </h3>
          
            </div>
          </div>
          <div className={`${styles.column} ${styles.col2}`} />
        </div>
        <div
          className={`${styles.columns}`}
          style={{
            margin: "2rem 0 8rem 0"
          }}
        >
         
        <div className={`${styles.column} ${styles.col1}`} />
        <div className={`${styles.column}  ${styles.col10}`}>
        
            <PaymentPlans plans={plans} onSelectPlan={onSelectPlan} />
       
        </div>
        <div className={`${styles.column} ${styles.col1}`} />
    
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = function (state, ownProps) {
    return {
      oneService: state.oneServices,
    };
};

export default connect(mapStateToProps)(Pricing);

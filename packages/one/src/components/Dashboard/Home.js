import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";


import styles from "../spectre.min.module.css"
import iconStyles from '../typicons.min.module.css';


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      const { oneUser, oneServices} = this.props;
      const {paymentSetupDone, isBusiness, userDetails} = oneUser;
      const { allAvailableServices, selectedServices} = oneServices;

      let availableSers = allAvailableServices.individual;
      if (isBusiness) {
        availableSers = allAvailableServices.business;
      }


      let selectedSerLen = 0;
    const finalizedSers = Object.values(selectedServices).map(selected => {
      if ("formData" in selectedServices[selected.id]) {
        selectedSerLen = selectedSerLen +1;
      }
    });

      const selectedLen = selectedSerLen;
      const avLen = availableSers.length;

      return (
      <div style={{height: '100%'}}>
        <div className={styles.columns}>
        <div
          className={`${styles.column} ${styles.col8}`}
          style={{ margin: "3rem 0 1rem 1rem" }}
        >
          <h2
            className={` ${
              styles.textLeft
              }`}
          >
            Hello, {userDetails.displayName}
          </h2>
          <div className={styles.divider} />
        </div>
        <div className={`${styles.column} ${styles.col4}`} />
        <div className={`${styles.column} ${styles.col12}`} style={{ margin: "0.5rem" }}>
         
          <div
            className={styles.emptyAction}
            style={{ display: "flex", justifyContent: "left" }}
          >
            <div style={{ display: "flex"}}>

              <div
                className={`${styles.tile} ${styles.btn} ${
                  styles.textLeft
                  }`}
                onClick={() => navigate('/dashboard/services/')}
                style={{
                  padding: "1.5rem 2rem 1rem 1rem",
                  margin: '0 1rem',
                  boxShadow: "none",
                  height: "auto",
                  boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
                }}
              >
                <div className={styles.tileIcon} >
                  <span style={{
                    background: "#3500f3",
                    color: "#fff",

                    fontSize: '1.5rem',
                    borderRadius: "0.3rem",
                    boxShadow: "0 0.1rem 0.5rem rgba(86, 39, 255, .2)"
                  }} className={`${iconStyles.typcn} ${iconStyles.typcnPuzzle}`}></span>
                </div>
                <div className={styles.tileContent}>
                  <h5 className={styles.tileTitle}>  {selectedLen}/ {avLen} services setup </h5>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignSelf: "center" }}>

            <div
              className={`${styles.tile} ${styles.btn} ${
                styles.textLeft
                }`}
                onClick={() => navigate('/dashboard/services/add_payment')}
              style={{
                padding: "1.5rem 2rem 1rem 1rem",
                margin: '0 1rem',
          
                boxShadow: "none",
                height: "auto",
                boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
              }}
            >
              <div className={styles.tileIcon} >
                <span style={{
                    background: paymentSetupDone ? "#30ae40": "#3500f3",
                    color: "#fff",
                    
                    fontSize: '1.5rem',
                    borderRadius: "0.3rem",
                    boxShadow: "0 0.1rem 0.5rem rgba(86, 39, 255, .2)"
                }} className={`${iconStyles.typcn} ${iconStyles.typcnCreditCard}`}></span>
                </div>
              <div className={styles.tileContent}>
                <h5 className={styles.tileTitle}>  Payment Setup is {paymentSetupDone ? `complete`: `incomplete`} </h5>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
</div>
      )
    }
}


const mapStateToProps = function (state, ownProps) {
  return {
    oneUser: state.oneUser,
    oneServices: state.oneServices
  };
};

export default connect(mapStateToProps)(Home);
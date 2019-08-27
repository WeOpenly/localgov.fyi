import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";

import ServiceList from '../Services/ServiceList';
import ServiceDetails from '../Services/ServicesDetails';
import Payment from '../Services/Payment';

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

import { setupPayment, updateStep} from '../actions';


class Services extends Component {
  constructor(props) {
    super(props);
    this.submitPayment = this.submitPayment.bind(this);
  }


  submitPayment(plaidToken, accountId, planId){
    const {dispatch, uid} = this.props;
    dispatch(setupPayment(uid, plaidToken, accountId, planId));
  }

  render() {
    const {
      selectedServices,
      currentStep,
      loadingSelectedServicesFailed,
      loadingSelectedServices,
    } = this.props;

    if (loadingSelectedServices) {
      return <div className={styles.loading} />;
    }

    if (loadingSelectedServicesFailed) {
      return null; // msg here
    }

    const hasProgress = selectedServices.length !== 0;
     const tabs = (
       <ul className={styles.step} style={{ margin: "16px 0px" }}>
         <li
           className={`${styles.stepItem} ${
             currentStep === "add_services" ? styles.active : ""
           }`}
         >
           <a href="#" onClick={this.returnToSnap}>
             Pick Services
           </a>
         </li>
         <li
           className={`${styles.stepItem} ${
             currentStep === "update_services_details" ? styles.active : ""
           }`}
         >
           <a href="#">Add Service Details</a>
         </li>
         <li
           className={`${styles.stepItem} ${
             currentStep === "add_payment" ? styles.active : ""
           }`}
         >
           <a href="#">Setup Payment</a>
         </li>
       </ul>
     );
    
    let currentStepMsg = "We will need some info from you to make the most of Evergov One"

    if (currentStep === 'add_payment'){
        currentStepMsg = "One last thing! Please choose the plan that would best suit your need"
    }

    return (
      <Fragment>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col3}`} />
          <div
            className={`${styles.column} ${styles.col6}`}
            style={{ marginTop: "2rem" }}
          >
            <p
              className={`${styles.emptyTitle} ${styles.h5} ${
                styles.textCenter
              }`}
            >
              {currentStepMsg}
            </p>
          </div>
          <div className={`${styles.column} ${styles.col3}`} />
          <div className={`${styles.column} ${styles.col12}`}>{tabs}</div>
        </div>
        <Router>
          <ServiceList path="/" />
          <ServiceDetails path="/update_services_details" />
          <Payment path="/add_payment" submitPayment={this.submitPayment} paymentSetupDone={this.props.paymentSetupDone} paymentSetupInProgress={this.props.paymentSetupInProgress}/>
        </Router>
      </Fragment>
    );
  }
}



const mapStateToProps = function (state, ownProps) {
    return {
        ...state.oneServices,
      paymentSetupDone: state.oneUser.paymentSetupDone,
      paymentSetupInProgress: state.oneUser.paymentSetupInProgress,
        uid: state.oneUser.userDetails.uid,
    };
};

export default connect(mapStateToProps)(Services);
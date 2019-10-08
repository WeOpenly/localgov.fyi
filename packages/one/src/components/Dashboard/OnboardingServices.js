import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";

import ServiceList from '../Services/ServiceList';
import ServiceDetails from '../Services/ServicesDetails';
import Payment from '../Payment/Payment';

import UserTypeChoice from "./UserTypeChoice";
import styles from "../spectre.min.module.css"
import iconStyles from '../typicons.min.module.css';
import ServiceActionBar from '../Services/ServiceActionBar';

import { setupBankPayment, setupCardPayment, updateStep} from '../actions';
import {toggleStripeModal} from '../Services/actions'

class OnboardingServices extends Component {
  constructor(props) {
    super(props);
    this.submitBankPayment = this.submitBankPayment.bind(this);
    this.setupCardPayment = this.setupCardPayment.bind(this);
  }

  submitBankPayment(plaidToken, accountId, planId) {
    const { dispatch, uid } = this.props;
    dispatch(setupBankPayment(uid, plaidToken, accountId, planId));
  }

  setupCardPayment(str_tok, planId) {
    const { dispatch, uid } = this.props;
    dispatch(setupCardPayment(uid, str_tok, planId));
  }

  render() {
    const {
      currentOnboardingStep,
      details,
      landingPlan,
      landingType
    } = this.props.user;

    const {
      packName,
      paymentSetupDone
    } = details;

    const { fetching, updating, selectedServices, failed } = this.props.userServices;

    const {email} = details;

    if (fetching || updating) {
      return <div className={styles.loading} />;
    }

    if (failed) {
      return null; // msg here
    }

    console.log("currentOnboardingStep", currentOnboardingStep);

    const tabs = (
      <ul className={styles.step} style={{ margin: "16px 0px" }}>
        <li
          className={`${styles.stepItem} ${
            currentOnboardingStep === "add_services" ? styles.active : ""
          }`}
        >
          <a href="#" onClick={this.returnToSnap}>
            Pick Services
          </a>
        </li>
        <li
          className={`${styles.stepItem} ${
            currentOnboardingStep === "update_services_details"
              ? styles.active
              : ""
          }`}
        >
          <a href="#">Add Service Details</a>
        </li>
        <li
          className={`${styles.stepItem} ${
            currentOnboardingStep === "add_payment" ? styles.active : ""
          }`}
        >
          <a href="#">Setup Payment</a>
        </li>
      </ul>
    );

    let currentStepMsg =
      "We will need some info from you to make the most of Evergov One";

    if (currentOnboardingStep === "add_payment") {
      currentStepMsg =
        "One last thing! Please choose the plan that would best suit your need";
    }

    const doNotShowTabs =
      currentOnboardingStep === "user_type" ||
      currentOnboardingStep === "payment_added";
    console.log(currentOnboardingStep, "currentOnboardingStep");
    return (
      <div style={{ height: "100%" }}>
        {doNotShowTabs ? null : (
          <div className={styles.columns}>
            <div className={`${styles.column} ${styles.col3}`} />
            <div
              className={`${styles.column} ${styles.col6}`}
              style={{ marginTop: "2rem" }}
            >
              <p
                className={`${styles.emptyTitle} ${styles.h5} ${styles.textCenter}`}
              >
                {currentStepMsg}
              </p>
            </div>
            <div className={`${styles.column} ${styles.col3}`} />
            <div className={`${styles.column} ${styles.col12}`}>{tabs}</div>
          </div>
        )}
        <Router>
          <UserTypeChoice path="/user_type" />
          <ServiceList path="/add_services" />
          <ServiceDetails path="/update_services_details" />
          <Payment
            path="/add_payment"
            submitBankPayment={this.submitBankPayment}
            setupCardPayment={this.setupCardPayment}
            paymentSetupDone={false}
            paymentSetupInProgress={false}
            isBusiness={false}
            landingPlan={landingPlan}
            landingType={landingType}
            email={email}
          />
        </Router>
      </div>
    );
  }
}



const mapStateToProps = function (state, ownProps) {
    return {
      user: state.oneUser,
      userServices: state.oneUserServices,
      landingPlan: state.oneUser.landingPlan,
      landingType: state.oneUser.landingType
    };
};

export default connect(mapStateToProps)(OnboardingServices);
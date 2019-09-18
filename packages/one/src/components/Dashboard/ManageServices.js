import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";

import ServiceList from "../Services/ServiceList";
import ServiceDetails from "../Services/ServicesDetails";
import Payment from "../Services/Payment";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import ServiceActionBar from "../Services/ServiceActionBar";

import { setupBankPayment, setupCardPayment, updateStep } from "../actions";
import { toggleStripeModal } from "../Services/actions";

class Services extends Component {
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
      selectedServices,
      currentStep,
      stripeCardModalOpen,
      loadingSelectedServicesFailed,
      loadingSelectedServices
    } = this.props;

    if (loadingSelectedServices) {
      return <div className={styles.loading} />;
    }

    if (loadingSelectedServicesFailed) {
      return null; // msg here
    }

    const hasProgress = selectedServices.length !== 0;


    return (
      <Fragment>
        <Router>
          <ServiceList path="/" />
          <ServiceDetails path="/update_services_details" />
          <Payment
            path="/add_payment"
            submitBankPayment={this.submitBankPayment}
            setupCardPayment={this.setupCardPayment}
            paymentSetupDone={this.props.paymentSetupDone}
            paymentSetupInProgress={this.props.paymentSetupInProgress}
            isBusiness={this.props.isBusiness}
            landingPlan={this.props.landingPlan}
            landingType={this.props.landingType}
            email={this.props.email}
          />
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.oneServices,
    paymentSetupDone: state.oneUser.paymentSetupDone,
    isBusiness: state.oneUser.isBusiness,
    paymentSetupInProgress: state.oneUser.paymentSetupInProgress,
    uid: state.oneUser.userDetails.uid,
    email: state.oneUser.userDetails.email,
    landingPlan: state.oneUser.landingPlan,
    landingType: state.oneUser.landingType
  };
};

export default connect(mapStateToProps)(Services);

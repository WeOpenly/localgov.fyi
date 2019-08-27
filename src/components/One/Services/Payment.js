import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import PlaidLink from "react-plaid-link";
import PaymentSetupDone from './PaymentSetupDone';
import PaymentPlans from "./PaymentPlans";


const PaymentPlan = props => (
  <div className={`${styles.column} ${styles.colSm3} ${styles.colXs12}`}>
    <div
      className={styles.card}
      style={{
        border: `${props.focus ? "1px solid rgba(86, 39, 255, .6)" : "0"}`,
        background: `${props.focus ? "#fff" : "#fbfcfe"}`,
        borderRadius: "0.2rem",
        boxShadow: "0 .25rem 1rem rgba(48,55,66,.15)"
      }}
    >
      <div className={styles.cardHeader}>
        {props.tag ? (
          <span
            className={`${styles.label} ${styles.labelRounded} ${styles.labelSecondary} ${
              styles.floatRight
            }`}
          >
            {props.tag}
          </span>
        ) : null}
        <div className={styles.h3}>{" "}<small>$</small>{props.price}</div>
        <div className={`${styles.cardSubitle} ${styles.textGray}`}>
          <span className={`${iconStyles.typcn} ${iconStyles.typcnCalendar}`}></span>{props.duration}
        </div>
      </div>
      <div className={styles.cardBody} />
      <div className={styles.cardFooter}>
        <button
          onClick={() => props.selectPaymentPlan(props.id)}
          className={`${styles.btn} ${props.focus ? `${styles.btnPrimary}` : `${styles.btnSecondary}`}`}
        >
          Select this plan
        </button>
      </div>
    </div>
  </div>
);


class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: null
    };
    this.selectPaymentPlan = this.selectPaymentPlan.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
    this.handleOnExit = this.handleOnExit.bind(this);
  }

  selectPaymentPlan(plan) {
    this.setState({
      selectedPlan: plan
    });
  }

  handleOnSuccess(public_token, metadata) {
    console.log("handlesuccess", public_token, metadata);
    this.props.submitPayment(public_token, metadata.account_id, this.state.selectedPlan)
  }

  handleOnExit(err, metadata) {
    // handle the case when your user exits Link
    console.log(err, metadata);
  }

  render() {

    if (this.props.paymentSetupInProgress){
      return (
        <div className={styles.loading} />
      )
    }

    if (this.props.paymentSetupDone){
      return <PaymentSetupDone />
    }

    const { selectedPlan } = this.state;
    return (
      <Fragment>
        <div className={styles.columns} style={{ marginTop: "1rem" }}>
          <div className={`${styles.column} ${styles.col1}`} />
          <div className={`${styles.column} ${styles.col10}`}>
            <div className={styles.columns}>
              <PaymentPlans onSelectPlan={this.selectPaymentPlan} />
            </div>
          </div>
          <div className={`${styles.column} ${styles.col1}`} />
        </div>
        {selectedPlan ? (
          <div className={styles.columns} style={{ marginTop: "3rem" }}>
            <div className={`${styles.column} ${styles.col1}`} />
            <div className={`${styles.column} ${styles.col10}`}>
              <div className={styles.columns}>
            <div className={`${styles.column} ${styles.colSm5}`} />
            <div className={`${styles.column} ${styles.colSm2}`}>
              <PlaidLink
                clientName="Evergov One"
                  env={process.env.GATSBY_PLAID_ENV}
                className={`${styles.btn}  ${styles.btnPrimary}`}
                style={{ background: 'rgb(86, 39, 255)', color: "#fff", width: '100%'}}
                selectAccount={true}
                product={["auth"]}
                    publicKey={process.env.GATSBY_PLAID_PUBLIC_KEY}
                onExit={this.handleOnExit}
                onSuccess={this.handleOnSuccess}
              > 
                    <span className={`${iconStyles.typcn} ${iconStyles.typcnLockClosed}`}></span>  Connect your bank account
 
              </PlaidLink>
                  <div className={`${styles.textGray} ${styles.textCenter}`} style={{paddingTop: '0.1rem'}}><small>  <span className={`${iconStyles.typcn} ${iconStyles.typcnInfoLarge}`}></span><span style={{ fontSize: '14px' }}>You accept our terms by cicking this</span> </small></div>
            </div>
            <div className={`${styles.column} ${styles.colSm5}`} />
              </div>
            </div>
            <div className={`${styles.column} ${styles.col1}`} />
          </div>
        ) : null}
      </Fragment>
    );
  }
}



export default Payment;

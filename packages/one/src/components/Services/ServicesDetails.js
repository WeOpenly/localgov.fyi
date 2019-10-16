import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import ServiceForm from "./ServiceForm";
import ServiceActionBar from "./ServiceActionBar";
import {finalizeService, unSelectService, selectService, } from './actions';
import { updateServerOnboardingStep } from "../User/actions";
import ExpFinalizedServiceListItem from "./ExpFinalizedServiceListItem";

const windowGlobal = typeof window !== "undefined" && window;

class ServicesDetails extends Component {
  constructor(props) {
    super(props);
    this.addSelectedService = this.addSelectedService.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.updateService = this.updateService.bind(this);
  }

  componentDidMount(){
    if(windowGlobal){
        windowGlobal.scrollTo(0, 150);
    }
  }

  updateService(vals, ser) {
    const { dispatch, oneUser } = this.props;
    const { uid } = oneUser.details;
    dispatch(unSelectService(uid, ser));
    dispatch(selectService(uid, ser));
    dispatch(finalizeService(uid, vals, ser));
  }

  addSelectedService(vals, ser) {
 const { dispatch, oneUser } = this.props;
 const { uid } = oneUser.details;
    dispatch(finalizeService(uid, vals, ser));
  }

  updateStep(step) {
 const { dispatch, oneUser } = this.props;
 const { uid } = oneUser.details;
    dispatch(updateServerOnboardingStep(uid, step));
  }

  render() {
    const { oneSers, oneUserSers, oneUser } = this.props;

    const {
      fetching: allSersFetching,
      failed: allSersFailed,
      sers: allOneSers
    } = oneSers;
    const {
      txnDataLoading,
      txnData,
      txnDataFailed,
      fetching: selectedServicesFetching,
      failed: selectedServicesFailed,
      selectedServices
    } = oneUserSers;

    const { authInProgress, authFailure, details } = oneUser;

    if (allSersFetching || selectedServicesFetching) {
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

    const { packType } = details;

    const allSers = allOneSers[packType];

    let finalizedSerCount = 0;
    Object.values(selectedServices).map(ser => {
      if (ser.formData) {
        finalizedSerCount = finalizedSerCount + 1;
      }
    });

    const allSelectedForms = Object.values(selectedServices).map(selected => {
      if (!(selected.sid in selectedServices && 'formData' in selectedServices[selected.sid])) {
        return (
          <ServiceForm
            key={`service-form-${selected.sid}`}
            selectedService={selected}
            showName={true}
            showFaq={true}
            isFinalized={
              selected.sid in selectedServices &&
              "formData" in selectedServices[selected.sid]
            }
            onSubmit={this.addSelectedService}
          />
        );
      }
    });

    const allFinalizedForms = Object.values(selectedServices).map(selected => {
      if (selected.sid in selectedServices && 'formData' in selectedServices[selected.sid]){
        return (
            <ExpFinalizedServiceListItem
            key={selected.sid}
            isFinalized={
              selected.sid in selectedServices &&
              "formData" in selectedServices[selected.sid]
            }
            txnDataLoading={txnDataLoading}
            txnData={txnData}
            txnDataFailed={txnDataFailed}
            updateServiceDetails={this.updateService}
            ser={selectedServices[selected.sid]}
            />
        );
      }
    });

    return (
      <Fragment>
        <div className={styles.columns} style={{ marginTop: "1rem" }}>
          {allSelectedForms}
        </div>
        <div className={styles.columns} style={{ margin: "1rem 0" }}>
          <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
          <div
            style={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              paddingBottom: "1rem"
            }}
            className={`${styles.column} ${styles.col10} ${styles.colXs12}`}
          >
            {allFinalizedForms}
          </div>
          <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
        </div>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.colSm3}`} />
          <div
            className={`${styles.column} ${styles.colSm6} ${styles.colXs12} ${styles.textRight}`}
            style={{ margin: "2rem 0 4rem 0" }}
          ></div>
          <div className={`${styles.column} ${styles.col2} ${styles.hideXs}`} />
        </div>
        <ServiceActionBar
          action={
            <Fragment>
              <button
                onClick={() => this.updateStep("add_services")}
                className={`${styles.btn}`}
              >
                {" "}
                <span
                  className={`${iconStyles.typcn} ${iconStyles.typcnArrowLeft}`}
                ></span>{" "}
                Pick Services
              </button>

              <button
                onClick={() => this.updateStep("add_payment")}
                disabled={finalizedSerCount === 0}
                className={`${styles.btn}  ${styles.btnPrimary}`}
              >
                {this.props.paymentSetupDone
                  ? `Modify payment settings`
                  : `Setup Payment`}{" "}
                <span
                  className={`${iconStyles.typcn} ${iconStyles.typcnArrowRight}`}
                ></span>{" "}
              </button>
            </Fragment>
          }
        />
      </Fragment>
    );
  }
}


const mapStateToProps = function(state, ownProps) {
  return {
    oneSers: state.oneServices,
    oneUserSers: state.oneUserServices,
    oneUser: state.oneUser,
  };
};

export default connect(mapStateToProps)(ServicesDetails);
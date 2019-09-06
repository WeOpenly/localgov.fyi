import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import ServiceForm from "./ServiceForm";
import ServiceActionBar from "./ServiceActionBar";
import {finalizeService} from './actions';
import { updateStep } from "../actions";

class ServicesDetails extends Component {
  constructor(props) {
    super(props);
    this.addSelectedService = this.addSelectedService.bind(this);
    this.updateStep = this.updateStep.bind(this);
  }

  addSelectedService(vals, ser) {
    const { dispatch, uid } = this.props;
    dispatch(finalizeService(uid, vals, ser));
  }

  updateStep(step) {
    const { dispatch } = this.props;
    dispatch(updateStep(step));
  }

  render() {
    const { isBusiness, selectedServices, allAvailableServices } = this.props;
    let finalizedSerCount = 0;
    Object.values(selectedServices).map(ser => {
      if (ser.formData) {
        finalizedSerCount = finalizedSerCount + 1;
      }
    });

    const allSelectedForms = Object.values(selectedServices).map(selected => {
      if (!(selected.id in selectedServices && 'formData' in selectedServices[selected.id])) {
        return (
          <ServiceForm
            key={`service-form-${selected.id}`}
            selectedService={selected}
            isFinalized={(selected.id in selectedServices && 'formData' in selectedServices[selected.id])}
            onSubmit={this.addSelectedService}
          />
        );
      }
    });

    const allFinalizedForms = Object.values(selectedServices).map(selected => {
      if (selected.id in selectedServices && 'formData' in selectedServices[selected.id]){
        return (
          <ServiceForm
            key={`service-form-${selected.id}`}
            selectedService={selected}
            isFinalized={(selected.id in selectedServices && 'formData' in selectedServices[selected.id])}
            onSubmit={this.addSelectedService}
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
          {allFinalizedForms}
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
            <button
              onClick={() => this.updateStep("add_payment")}
              disabled={finalizedSerCount === 0}
              className={`${styles.btn}  ${styles.btnPrimary}`}
            >
              {this.props.paymentSetupDone
                ? `Modify payment settings`
                : `Setup Payment`}
            </button>
          }
        />
      </Fragment>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.oneServices,
    uid: state.oneUser.userDetails.uid,
    paymentSetupDone: state.oneUser.paymentSetupDone,
  };
};

export default connect(mapStateToProps)(ServicesDetails);

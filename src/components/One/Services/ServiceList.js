import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import { selectService, unSelectService } from "./actions";
import {updateStep} from "../actions";

const Tile = props => (
  <div
    className={`${styles.tile} ${styles.tileCentered}  ${
      styles.textLeft
    } ${styles.formCheckbox}`}
    style={{
      background: `${(props.isSelected && !props.isFinalized) ? '#ece6ff': '#fff'}`,
      padding: "1rem",
      border: "none",
      boxShadow: "none",
      height: "auto",
      textAlign: "none"
    }}
  >
    <div className={styles.tileIcon} />
    <div className={styles.tileContent}>
      <div className={styles.tileTitle}> {props.ser.name} </div>
    </div>

    <div className={styles.tileAction} style={{cursor: 'pointer'}} onClick={props.onItemClick}>
      {props.isFinalized ? (<span
        className={`${styles.label} ${styles.labelRounded} `}
      ><span
        className={`${iconStyles.typcn} ${styles.textSuccess} ${iconStyles.typcnTick}`}
      /></span>) : props.isSelected ? (<span
        className={`${styles.label} ${styles.labelRounded} `}
      ><span
          className={`${iconStyles.typcn}  ${styles.textError}  ${iconStyles.typcnMinus}`}
        /></span>): (
            <span
              className={`${styles.label} ${styles.labelRounded} `}
            >
              <span

                className={`${iconStyles.typcn} ${iconStyles.typcnPlus}`}
              />
            </span>
      )} 
    </div>
  </div>
);

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.addSelectedService = this.addSelectedService.bind(this);
    this.removeSelectedService = this.removeSelectedService.bind(this);
    this.updateStep = this.updateStep.bind(this);
  }

  updateStep(step) {
    const { dispatch } = this.props;
    dispatch(updateStep(step));
  }

  removeSelectedService(ser) {
    const { dispatch, uid } = this.props;
    dispatch(unSelectService(uid, ser));
  }

  addSelectedService(ser) {
    const { dispatch, uid } = this.props;
    dispatch(selectService(uid, ser));
  }

  render() {
    const { allAvailableServices, isBusiness, selectedServices } = this.props;

    let availableSers = allAvailableServices.individual;
    if (isBusiness) {
      availableSers = allAvailableServices.business;
    }

    const notSelected = Object.keys(selectedServices).length === 0;
 
    const serComps = availableSers.map(ser => (
      <Tile
        key={ser.id}
        isFinalized={(ser.id in selectedServices && 'formData' in selectedServices[ser.id])}
        isSelected={ser.id in selectedServices ? true : false}
        onItemClick={() => {
          if (ser.id in selectedServices) {
            this.removeSelectedService(ser);
          } else {
            this.addSelectedService(ser);
          }
        }}
        ser={ser}
      />
    ));

    return (
      <Fragment>
        <div className={styles.columns} style={{ marginTop: "1rem" }}>
          <div className={`${styles.column} ${styles.colSm3}`} />
          <div
            className={`${styles.column} ${styles.colSm6} ${styles.colXs12}`}
          >
            <div
              className={styles.card}
              style={{
                border: "1px solid rgba(86, 39, 255, .2)",
                background: "#fff",
                padding: '0.2rem',
                borderRadius: "0.3rem",
                boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
              }}
            >
              {serComps}
            </div>
          </div>
          <div className={`${styles.column} ${styles.colSm3}`} />
        </div>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.colSm3}`} />
          <div
            className={`${styles.column} ${styles.colSm6} ${styles.colXs12} ${
              styles.textRight
            }`}
            style={{ marginTop: "1rem" }}
          >
            <button
              onClick={() => this.updateStep("update_services_details")}
              disabled={notSelected}
              className={`${styles.btn}  ${styles.btnPrimary}`}
            >
              Add Details
            </button>
          </div>
          <div className={`${styles.column} ${styles.colSm3}`} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.oneServices,
    isBusiness: state.oneUser.isBusiness,
    uid: state.oneUser.userDetails.uid,
  };
};

export default connect(mapStateToProps)(ServiceList);

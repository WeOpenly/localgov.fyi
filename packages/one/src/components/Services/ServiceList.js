import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import Masonry from "react-masonry-css";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import { selectService, unSelectService } from "./actions";
import {updateStep} from "../actions";
import ServiceListItem from "./ServiceListItem";
import ServiceActionBar from "./ServiceActionBar";


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
    const breakpointColumnsObj = {
      default: 3,
      1380: 2,
      740: 1,
    };

    const serComps = availableSers.map(ser => (
      <ServiceListItem
        key={ser.id}
        isFinalized={
          ser.id in selectedServices && "formData" in selectedServices[ser.id]
        }
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
          <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
          <div style={{padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '12rem'}} className={`${styles.column} ${styles.col10} ${styles.colXs12}`}>

              {serComps}
          </div>
          <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
        </div>
       {notSelected ? null : (<ServiceActionBar action={(
              <button
                onClick={() => this.updateStep("update_services_details")}
                disabled={notSelected}
                className={`${styles.btn}  ${styles.btnPrimary}`}
              >
                Add Your Details
              </button>
            )}/>)}
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

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import Masonry from "react-masonry-css";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import AddCustomServiceDialog from './AddCustomService/Dialog'
import { selectService, unSelectService, finalizeService } from "./actions";
import {updateStep} from "../actions";
import ServiceListItem from "./ServiceListItem";
import ServiceActionBar from "./ServiceActionBar";
const windowGlobal = typeof window !== "undefined" && window;

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addSerModalOpen: false
    };
    this.finalizeService = this.finalizeService.bind(this);
    this.toggleSerAddDetails = this.toggleSerAddDetails.bind(this);
    this.addSelectedService = this.addSelectedService.bind(this);
    this.removeSelectedService = this.removeSelectedService.bind(this);
    this.updateStep = this.updateStep.bind(this);
  }

  toggleSerAddDetails(toggle) {
    this.setState({
      addSerModalOpen: toggle
    });
  }

  finalizeService(vals, ser) {
    const { dispatch, uid } = this.props;
    dispatch(selectService(uid, ser));
    dispatch(finalizeService(uid, vals, ser));
    this.toggleSerAddDetails(false);
  }

  componentDidMount() {
    if (windowGlobal) {
      windowGlobal.scrollTo(200, 150);
    }
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
    // const isAddedandnotFinalized
    const notSelected = Object.keys(selectedServices).length === 0;

    const finalizedSers = Object.values(selectedServices).map(ser => {
      if ("formData" in selectedServices[ser.id]) {
        return (
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
        );
      }
    });

    const notFinalizedSers = availableSers.map(ser => {
      if (
        !(ser.id in selectedServices && "formData" in selectedServices[ser.id])
      ) {
        return (
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
        );
      }
    });

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

    const addService = (
      <div
        className={`${styles.card}`}
        style={{
          border: "1px solid rgba(48,55,66,.10)",
          background: "#fff",
          marginBottom: "4rem",
          margin: "0.4rem 0.1rem 0 0.1rem",
          padding: "0.3rem 0.5rem 0 0.5rem",
          display: "flex",
          justifyContent: "left",
          width: "100%",
          borderRadius: "0.3rem",
          boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
        }}
      >
 
     
            <div className={styles.cardHeader}>
              <h6 className={`${styles.cardTitle}`}>
                {" "}
                Not finding what you're looking for?{" "}
              </h6>
            </div>

            <div className={`${styles.cardBody}`}>
              You just need to give us some details about any service, and we
              will take care of the rest!
            </div>
            <div className={`${styles.cardFooter}`}>
              <button
                className={`${styles.btn}`}
                onClick={this.toggleSerAddDetails}
              >
                <span
                  className={`${iconStyles.typcn} ${iconStyles.typcnDocumentAdd}`}
                ></span>{" "}
                Add Service
              </button>
            </div>


      </div>
    );

    return (
      <Fragment>
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
            className={`${styles.column} ${styles.col6} ${styles.colXs12}`}
          >
            {notFinalizedSers}
          </div>
          <div className={`${styles.column} ${styles.col4} ${styles.colXs12}`}>
            {addService}
          </div>
          <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
        </div>
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
            {finalizedSers}
          </div>
          <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
        </div>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col1}`} />
          <div
            className={`${styles.column} ${styles.col10}`}
            style={{ margin: "3rem 0 1rem 1rem" }}
          >
            <AddCustomServiceDialog
              addSerModalOpen={this.state.addSerModalOpen}
              onSave={this.finalizeService}
              onClose={this.toggleSerAddDetails}
            />
          </div>
          <div className={`${styles.column} ${styles.col1}`} />
        </div>

        {notSelected ? null : (
          <ServiceActionBar
            action={
              <Fragment>
                <div></div>
                <button
                  onClick={() => this.updateStep("update_services_details")}
                  disabled={notSelected}
                  className={`${styles.btn}  ${styles.btnPrimary}`}
                >
                  Add Your Details{" "}
                  <span
                    className={`${iconStyles.typcn} ${iconStyles.typcnArrowRight}`}
                  ></span>{" "}
                </button>
              </Fragment>
            }
          />
        )}
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

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import Masonry from "react-masonry-css";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import AddCustomServiceDialog from './AddCustomService/Dialog'
import { selectService, unSelectService, finalizeService } from "./actions";
import { updateServerOnboardingStep } from "../User/actions";
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
    const { dispatch, oneUser } = this.props;
    const {uid} = oneUser.details;
    console.log(ser);
    dispatch(selectService(uid, ser));
    dispatch(finalizeService(uid, vals, ser));
    this.toggleSerAddDetails(false);
  }


  updateStep(step) {
   const { dispatch, oneUser } = this.props;
   const { uid } = oneUser.details;
    dispatch(updateServerOnboardingStep(uid, step));
  }

  removeSelectedService(ser) {
    const { dispatch, oneUser } = this.props;
     const { uid } = oneUser.details;
    dispatch(unSelectService(uid, ser));
  }

  addSelectedService(ser) {
    const { dispatch, oneUser } = this.props;
    const { uid } = oneUser.details;
    
    dispatch(selectService(uid, ser));
  }

  render() {
    const { oneSers, oneUserSers, oneUser } = this.props;
    const {
      fetching: selectedServicesFetching,
      failed: selectedServicesFailed,
      selectedServices
    } = oneUserSers;
    const {
      fetching: allSersFetching,
      failed: allSersFailed,
      sers: allOneSers
    } = oneSers;

    const { authInProgress, authFailure, details } = oneUser;

    if (allSersFetching || selectedServicesFetching) {
      return "loading";
    }

    const { packType } = details;

    const allSers = allOneSers[packType];


    const notSelected = Object.keys(selectedServices).length === 0;
    
    const finalizedSers = Object.values(selectedServices).map(ser => {
      if ("formData" in selectedServices[ser.sid]) {
        return (
          <ServiceListItem
            key={ser.sid}
            isFinalized={
              ser.sid in selectedServices && "formData" in selectedServices[ser.sid]
            }
            isSelected={ser.sid in selectedServices ? true : false}
            onItemClick={() => {
              if (ser.sid in selectedServices) {
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
    
    const notFinalizedSers = allSers.map(ser => {
      if (
        !(ser.sid in selectedServices && "formData" in selectedServices[ser.sid])
      ) {
        return (
          <ServiceListItem
            key={ser.sid}
            isFinalized={
              ser.sid in selectedServices &&
              "formData" in selectedServices[ser.sid]
            }
            isSelected={ser.sid in selectedServices ? true : false}
            onItemClick={() => {
              if (ser.sid in selectedServices) {
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

    const serComps = allSers.map(ser => (
      <ServiceListItem
        key={ser.sid}
        isFinalized={
          ser.sid in selectedServices && "formData" in selectedServices[ser.sid]
        }
        isSelected={ser.sid in selectedServices ? true : false}
        onItemClick={() => {
          if (ser.sid in selectedServices) {
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
              paddingBottom: "10rem"
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
    oneSers: state.oneServices,
    oneUserSers: state.oneUserServices,
    oneUser: state.oneUser,
  };
};

export default connect(mapStateToProps)(ServiceList);

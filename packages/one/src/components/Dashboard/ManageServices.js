import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import Masonry from "react-masonry-css";
import AddCustomServiceDialog from "../Services/AddCustomService/Dialog";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import { selectService, unSelectService, finalizeService } from "../Services/actions";


import ExpandableServiceListItem from "../Services/ExpandableServiceListItem";


class ManageServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addSerModalOpen: false
    };
    this.finalizeService = this.finalizeService.bind(this)
    this.toggleSerAddDetails = this.toggleSerAddDetails.bind(this);
    this.addSelectedService = this.addSelectedService.bind(this);
    this.removeSelectedService = this.removeSelectedService.bind(this);
    this.updateService = this.updateService.bind(this);
  }

  toggleSerAddDetails(toggle) {
    this.setState({
      addSerModalOpen: toggle
    });
  }

  updateService(vals, ser) {
    const { dispatch, uid } = this.props;
    dispatch(unSelectService(uid, ser));
    dispatch(selectService(uid, ser));
    dispatch(finalizeService(uid, vals, ser));
  }

  removeSelectedService(ser) {
    const { dispatch, uid } = this.props;
    dispatch(unSelectService(uid, ser));
  }

  finalizeService(vals, ser) {
    const { dispatch, uid } = this.props;
    dispatch(selectService(uid, ser));
    dispatch(finalizeService(uid, vals, ser));
    this.toggleSerAddDetails(false)
  }

  addSelectedService(ser) {
    const { dispatch, uid } = this.props;
    dispatch(selectService(uid, ser));
  }

  render() {
    const { allAvailableServices, isBusiness, selectedServices } = this.props;

    let availableSers = allAvailableServices;

    const notSelected = Object.keys(selectedServices).length === 0;

    const finalizedSers = Object.values(selectedServices).map(selected => {
      if ("formData" in selectedServices[selected.id]) {
        return (
          <ExpandableServiceListItem
            key={selected.id}
            isFinalized={
              selected.id in selectedServices &&
              "formData" in selectedServices[selected.id]
            }
            updateServiceDetails={this.updateService}
            removeServiceDetails={this.removeSelectedService}
            ser={selectedServices[selected.id]}
          />
        );
      }
    });

    let nonAddedSersLen = 0;
    const addedSersNotFinalized = availableSers.map(ser => {
      if (
        (ser.id in selectedServices) &&
          !("formData" in selectedServices[ser.id])
      ) {
        nonAddedSersLen +=1;
        return (
          <ExpandableServiceListItem
            key={ser.id}
            isFinalized={
              ser.id in selectedServices &&
              "formData" in selectedServices[ser.id]
            }
            updateServiceDetails={this.updateService}
            removeServiceDetails={this.removeSelectedService}
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
          <ExpandableServiceListItem
            key={ser.id}
            isFinalized={
              ser.id in selectedServices &&
              "formData" in selectedServices[ser.id]
            }
            updateServiceDetails={this.updateService}
            removeServiceDetails={this.removeSelectedService}
            ser={ser}
          />
        );
      }
    });

    return (
      <div style={{ height: "100%" }}>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col1}`} />
          <div
            className={`${styles.column} ${styles.col8}`}
            style={{ margin: "3rem 0 1rem 1rem" }}
          >
            <h2 className={` ${styles.textLeft}`}>Services</h2>
          </div>
          <div className={`${styles.column} ${styles.col2}`}>
            <button
              className={`${styles.btn}`}
              style={{
                background: "rgb(86, 39, 255)",
                color: "#fff",
                width: "100%",
                margin: "3rem 0 1rem 1rem"
              }}
              onClick={this.toggleSerAddDetails}
            >
              <span
                className={`${iconStyles.typcn} ${iconStyles.typcnDocumentAdd}`}
              ></span>{" "}
              Add Service
            </button>
          </div>
          <div className={`${styles.column} ${styles.col1}`} />
        </div>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col12}`}>
            <div className={styles.divider} />
          </div>
        </div>

        {finalizedSers.length > 0 ? (
          <div className={styles.columns}>
            <div
              className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                margin: "1rem 0 0 1rem"
              }}
              className={`${styles.column} ${styles.colXs10}`}
            >
              <h6>Linked Services</h6>
            </div>
            <div
              className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
            />
          </div>
        ) : null}
        <div className={styles.columns} style={{}}>
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
            {finalizedSers}
          </div>
          <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
        </div>

        {nonAddedSersLen.length > 0 ? (
          <Fragment>
            <div className={styles.columns}>
              <div
                className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  margin: "1rem 0 0 1rem"
                }}
                className={`${styles.column} ${styles.colXs10}`}
              >
                <h6>Added Services to Link</h6>
              </div>
              <div
                className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
              />
            </div>
            <div className={styles.columns} style={{}}>
              <div
                className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
              />
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
                {addedSersNotFinalized}
              </div>
              <div
                className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
              />
            </div>
          </Fragment>
        ) : null}

        {notFinalizedSers.length > 0 ? (
          <div className={styles.columns}>
            <div
              className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                margin: "1rem 0 0 1rem"
              }}
              className={`${styles.column} ${styles.colXs10}`}
            >
              <h6>Services to add</h6>
            </div>
            <div
              className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
            />
          </div>
        ) : null}
        <div className={styles.columns} style={{}}>
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
            {notFinalizedSers}
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
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.oneServices,
    isBusiness: state.oneUser.isBusiness,
    uid: state.oneUser.details.uid
  };
};

export default connect(mapStateToProps)(ManageServiceList);

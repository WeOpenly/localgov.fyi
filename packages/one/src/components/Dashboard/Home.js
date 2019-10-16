import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

import ExpFinalizedServiceListItem from "../Services/ExpFinalizedServiceListItem";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { oneSers, oneUserSers, oneUser } = this.props;
    const {
      txnDataLoading,
      txnData,
      txnDataFailed,
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

    const currentDate = new Date(Date.now());
    let d = new Date(Date.now());
    d.setMonth(d.getMonth() + 1);

    const upNextMonth = Object.keys(txnData).filter((txn, idx) => {
      console.log(currentDate, d, new Date(txnData[txn].metadata.nextDue));
      return (
        currentDate <= new Date(txnData[txn].metadata.nextDue) &&
        new Date(txnData[txn].metadata.nextDue) < d
      );
    });

    const finalizedSersComp = Object.values(selectedServices).map(selected => {
      if (
        "formData" in selectedServices[selected.sid] &&
        upNextMonth.includes(selected.sid)
      ) {
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
            removeServiceDetails={this.removeSelectedService}
            ser={selectedServices[selected.sid]}
          />
        );
      }
    });
    // const upNext6Months = Object.keys(txnData).map((txn, idx) => {
    //   return (currentMonth + 1 >= Date(txnData[txn].metadata.nextDue).getMonth()) &&
    //     (Date(txnData[txn].metadata.nextDue).getMonth() <= currentMonth + 7);
    // });

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

    const { packType, paymentSetupDone } = details;

    const allAvailableServices = allOneSers[packType];

    let availableSers = allAvailableServices;
    let selectedSerLen = 0;
    const finalizedSers = Object.values(selectedServices).map(selected => {
      if ("formData" in selectedServices[selected.sid]) {
        selectedSerLen = selectedSerLen + 1;
      }
    });

    const selectedLen = selectedSerLen;
    const avLen = availableSers.length;

    return (
      <div style={{ height: "100%" }}>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col1}`} />
          <div
            className={`${styles.column} ${styles.col8}`}
            style={{ margin: "3rem 0 1rem 0" }}
          >
            <h2 className={` ${styles.textLeft}`}>
              {" "}
              Hello, {details.displayName}
            </h2>
          </div>
          <div className={`${styles.column} ${styles.col2}`}></div>
          <div className={`${styles.column} ${styles.col1}`} />
        </div>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col1}`} />
          <div
            className={`${styles.column} ${styles.col10}`}
            style={{ margin: "1rem 0 1rem 0" }}
          >
            <div
              className={styles.emptyAction}
              style={{ display: "flex", justifyContent: "left" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div
                  className={`${styles.tile}  ${styles.textLeft}`}
                  onClick={() => navigate("/dashboard/services/")}
                  style={{
                    background: "#6a41ff",
                    color: "#fff",
                    padding: "1.5rem 2rem 1rem 1rem",
                    width: "280px",
                    height: "180px",
                    margin: "0.1rem 1rem",
                    boxShadow: "0 .5rem 0.8rem rgba(48,55,66,.10)"
                  }}
                >
                  <div className={styles.tileIcon}>
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "5rem",
                        borderRadius: "0.3rem"
                      }}
                      className={`${iconStyles.typcn} ${iconStyles.typcnPuzzle}`}
                    ></span>
                  </div>
                  <div
                    className={styles.tileContent}
                    style={{
                      margin: "2rem 0"
                    }}
                  >
                    <h2 className={styles.tileTitle}>
                      {" "}
                      {selectedLen} <small>/</small> {avLen}
                    </h2>
                    <p className={`${styles.tileSubtitle}`}>Services setup</p>
                  </div>
                </div>
                <div
                  className={`${styles.tile}  ${styles.textLeft}`}
                  onClick={() => {
                    paymentSetupDone ? navigate("/dashboard/onboard/add_payment") : navigate("/dashboard")
                  }}
                  style={{
                    background: paymentSetupDone ? "#30ae40" : "#db535c",
                    cursor: paymentSetupDone ? 'pointer': 'none',
                    color: "#fff",
                    padding: "1.5rem 2rem 1rem 1rem",
                    width: "280px",
                    height: "180px",
                    margin: "0.1rem 1rem",
                    boxShadow: "0 .5rem 0.8rem rgba(48,55,66,.10)"
                  }}
                >
                  <div className={styles.tileIcon}>
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "5rem",
                        borderRadius: "0.3rem"
                      }}
                      className={`${iconStyles.typcn} ${iconStyles.typcnCreditCard}`}
                    ></span>
                  </div>
                  <div
                    className={styles.tileContent}
                    style={{
                      margin: "2rem 0"
                    }}
                  >
                    <p className={`${styles.tileSubtitle}`}>
                      {" "}
                      Payment Setup is{" "}
                      {paymentSetupDone ? `complete` : `incomplete`}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.column} ${styles.col1}`} />
        </div>

        {upNextMonth.length > 0 ? (
          <Fragment>
            >
            <div className={styles.columns}>
              <div className={`${styles.column} ${styles.col1}`} />
              <div
                className={`${styles.column} ${styles.col8}`}
                style={{ margin: "3rem 0 1rem 0" }}
              >
                <h2 className={` ${styles.textLeft}`}>Upcoming</h2>
              </div>
              <div className={`${styles.column} ${styles.col2}`}></div>
              <div className={`${styles.column} ${styles.col1}`} />
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
                {finalizedSersComp}
              </div>
              <div
                className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
              />
            </div>{" "}
          </Fragment>
        ) : (
          <div className={styles.columns}>
            <div className={`${styles.column} ${styles.col1}`} />
            <div
              className={`${styles.column} ${styles.col10}`}
              style={{ margin: "3rem 0 1rem 0" }}
            >
              <h4 className={` ${styles.textCenter}`}>No Upcoming Dues</h4>
              <p className={`${styles.textGray} ${styles.textCenter}`}>We will update you the deadlines approach</p>
            </div>
          
            <div className={`${styles.column} ${styles.col1}`} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    oneSers: state.oneServices,
    oneUserSers: state.oneUserServices,
    oneUser: state.oneUser
  };
};

export default connect(mapStateToProps)(Home);

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";


import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

import ServiceForm from "./ServiceForm";
import classNames from "classnames/bind";


const windowGlobal = typeof window !== "undefined" && window;
let cx = classNames.bind(styles);


const TxnItem = props => (
  <div className={styles.tile}>
    <div className={styles.tileIcon}>
      <span
        className={`${iconStyles.typcn} ${iconStyles.typcnFolderOpen}`}
      ></span>
    </div>
    <div className={styles.tileContent}>
      <div className={styles.tileTitle}>{props.txn.txn_id}</div>
      <div className={styles.tileSubtitle} >
        <small className={styles.textGray}>{Date(props.txn.addedAt)}</small>
      </div>
      <div style={{margin: '0.2rem 0' }}>
        {props.txn.txn_files.map((file, idx) => (
          <a href={file}> Attachment {idx + 1}</a>
        ))}
      </div>
    </div>
  </div>
);

 

class UserSerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'details'
    }
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tab){
    this.setState({
      activeTab: tab
    })
  }

  render() {
    const { ser, serLogo, txnList, txnMetaComp } = this.props;


    let txnListComp = (
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
           No transactions yet
          </div>

          <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
        </div>)

    if (txnList) {
      txnListComp = txnList.map((txn, idx) => <TxnItem txn={txn} />);
    }

    let clsNamedetails = cx({
      tabItem: true,
      active: this.state.activeTab === "details"
    });

    let clsNamereceipts = cx({
      tabItem: true,
      active: this.state.activeTab === "receipts"
    });

    return (
      <div
        className={styles.panel}
        style={{
          background: "#fff",
          minWidth: "480px",
          padding: "0.2rem",
          borderRadius: "0.3rem"
        }}
      >
        <div className={`${styles.panelHeader} ${styles.textCenter}`}>
          <figure className={`${styles.avatar} ${styles.avatarLg}`}>
            {serLogo}
          </figure>

          <h5 style={{ paddingTop: "0.5rem" }} className={styles.panelTitle}>
            {ser.name}
          </h5>
          <div style={{ paddingTop: "0.5rem" }} className={styles.panelTitle}>
            {txnMetaComp}
          </div>
        </div>
        <nav className={styles.panelNav}>
          <ul className={`${styles.tab} ${styles.tabBlock}`}>
            <li
              onClick={() => this.changeTab("details")}
              className={clsNamedetails}
            >
              <a href="#details"> Saved Details</a>
            </li>
            <li
              onClick={() => this.changeTab("receipts")}
              className={clsNamereceipts}
            >
              <a href="#receipts">Receipts</a>
            </li>
          </ul>
        </nav>
        <div
          style={{
            marginTop: "0.5rem"
          }}
          className={styles.panelBody}
        >
          {this.state.activeTab === "details" ? (
            <div className={styles.columns} style={{ margin: "1rem 0" }}>
              <ServiceForm
                key={`service-form-${ser.sid}`}
                selectedService={ser}
                showName={false}
                showFaq={false}
                isFinalized={this.props.isFinalized}
                onSubmit={this.props.updateServiceDetails}
              />
            </div>
          ) : (
            txnListComp
          )}
        </div>
      </div>
    );
  }
}

export default UserSerDetails;
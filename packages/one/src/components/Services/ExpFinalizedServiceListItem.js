import React from "react";
import { Elements } from "react-stripe-elements";

import Drawer from "@material-ui/core/Drawer";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import classNames from "classnames/bind";
import ProptaxSvg from "../../svgIcons/PropTaxIl";
import UtilBill from "../../svgIcons/utbIl";
import BusinessLic from "../../svgIcons/businessLic";
import PetLic from "../../illus/Renew";
import Renew from "../../illus/Renew";
import CalFranchTax from "../../illus/CalFranchTax";
import DelFranchTax from "../../illus/DelFranchTax";

import UserSerDetail from './UserSerDetails';

const iconMap = {
  0: <ProptaxSvg style={{ width: "32px", height: "32px" }} />,
  1: <UtilBill style={{ width: "32px", height: "32px" }} />,
  2: <PetLic style={{ width: "32px", height: "32px" }} />,
  3: <Renew style={{ width: "32px", height: "32px" }} />,
  4: <BusinessLic style={{ width: "32px", height: "32px" }} />,
  5: <BusinessLic style={{ width: "32px", height: "32px" }} />,
  6: <UtilBill style={{ width: "32px", height: "32px" }} />,
  7: <DelFranchTax style={{ width: "32px", height: "32px" }} />,
  8: <CalFranchTax style={{ width: "32px", height: "32px" }} />
};

const defaultIcon = <DelFranchTax style={{ width: "32px ", height: "32px" }} />;

let cx = classNames.bind(styles);

class ExpFinalizedServiceListItem extends React.Component {
  constructor(props) {
    super(props);
    this.expandCard = this.expandCard.bind(this);
    this.state = {
      expanded: false
    };
  }

  expandCard() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    let icon = iconMap[this.props.ser.sid];
    if (!icon) {
      icon = defaultIcon;
    }

    let txnComp = null;
    let txnList = [];
    if (this.props.txnData && !this.props.txnDataFailed) {
      txnComp = (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "left"
          }}
        >
          <div style={{ margin: "0.5rem 0" }}>
            <div
              className={styles.chip}
              style={{ background: "rgba(255, 183, 0, .65)" }}
            >
              <span
                className={`${iconStyles.typcn} ${iconStyles.typcnArrowRepeat}`}
              />
              Processing
            </div>
          </div>

          <div className={styles.textGray}>
            We've received your data and will update this once we are done
            processing
          </div>
        </div>
      );

      if (this.props.txnData[this.props.ser.sid]) {
        const { txns, metadata } = this.props.txnData[this.props.ser.sid];
        txnList = txns;
        if (metadata) {
          let until = null;
          if (metadata.until){
            until = new Date(metadata.until)
            until = until.toDateString()
          }

          txnComp = (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "left"
              }}
            >
              <div style={{ margin: "0.2rem 0" }}>
                {metadata.every && metadata.freq ? (
                  <div
                    className={styles.chip}
                    style={{ background: "#f4f0ff" }}
                  >
                    <span
                      className={`${iconStyles.typcn} ${iconStyles.typcnStopwatch}`}
                    />
                    Recurs every {metadata.every} {metadata.freq}
                  </div>
                ) : null}
                {metadata.until ? (
                  <div
                    className={styles.chip}
                    style={{ background: "rgba(50, 182, 67, .6)", color: '#fff' }}
                  >
                    <span
                      className={`${iconStyles.typcn} ${iconStyles.typcnCalendarOutline}`}
                    />
                    Next due {until}
                  </div>
                ) : null}
              </div>
            </div>
          );
        }
      }
    }


    return (
      <div
        className={`${styles.column} ${styles.col12}`}
        style={{ margin: "1rem 0rem" }}
      >
        <Drawer
          anchor="right"
          open={this.state.expanded}
          onClose={() => this.expandCard(false)}
        >
          <UserSerDetail
            ser={this.props.ser}
            serLogo={icon}
            txnMetaComp={txnComp}
            txnList={txnList}
            updateServiceDetails={this.props.updateServiceDetails}
            isFinalized={this.props.isFinalized}
          />
        </Drawer>
        <div
          style={{
            display: "flex",
            border: "1px solid rgba(86, 39, 255, .1)",

            borderRadius: "0.3rem",
            boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)",
            justifyContent: "space-between",
            background: "#fff",

            padding: "1rem 1rem 0.5rem 1rem"
          }}
        >
          <div style={{ display: "flex", flex: "80" }}>
            <div style={{ padding: "0.2rem" }}>
              <h5 className={styles.tileTitle}>{this.props.ser.name}</h5>

              <div className={styles.titleSubtitle}>
                {this.props.isFinalized ? (
                  txnComp
                ) : (
                  <div className={styles.textGray}>
                    {this.props.ser.shortDescription}}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flex: "20" }}>
            {this.props.isFinalized ? (
              <button
                onClick={this.expandCard}
                className={`${styles.btn} ${styles.btnSm} ${styles.btnSecondary} ${styles.inputGroupButton}`}
              >
                <span
                  className={`${iconStyles.typcn}  ${iconStyles.typcnEdit}`}
                  style={{
                    fontSize: "0.8rem",

                    cursor: "pointer"
                  }}
                />
                Edit
              </button>
            ) : (
              <button
                onClick={this.expandCard}
                className={`${styles.btn}  ${styles.btnSm} ${styles.btnSecondary} ${styles.inputGroupButton}`}
              >
                <span
                  className={`${iconStyles.typcn}  ${iconStyles.typcnPlus}`}
                  style={{
                    fontSize: "0.8rem",

                    cursor: "pointer"
                  }}
                />
                Add
              </button>
            )}
            {txnList.length !== 0 ? (
              <button
                style={{ marginLeft: "0.2rem" }}
                onClick={this.expandCard}
                className={`${styles.btn}  ${styles.btnSm} ${styles.btnSecondary} ${styles.inputGroupButton}`}
              >
                <span
                  className={`${iconStyles.typcn}  ${iconStyles.typcnFolderOpen}`}
                  style={{
                    fontSize: "0.8rem",

                    cursor: "pointer"
                  }}
                />
                Receipts
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ExpFinalizedServiceListItem;

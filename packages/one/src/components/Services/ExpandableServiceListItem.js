import React from "react";
import { Elements } from "react-stripe-elements";

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
import ServiceForm from "../Services/ServiceForm";

const iconMap = {
  0: <ProptaxSvg style={{ width: "64px", height: "64px" }} />,
  1: <UtilBill style={{ width: "64px", height: "64px" }} />,
  2: <PetLic style={{ width: "64px", height: "64px" }} />,
  3: <Renew style={{ width: "64px", height: "64px" }} />,
  4: <BusinessLic style={{ width: "64px", height: "64px" }} />,
  5: <BusinessLic style={{ width: "64px", height: "64px" }} />,
  6: <UtilBill style={{ width: "64px", height: "64px" }} />,
  7: <DelFranchTax style={{ width: "64px", height: "64px" }} />,
  8: <CalFranchTax style={{ width: "64px", height: "64px" }} />
};

const defaultIcon = <DelFranchTax style={{ width: "100px", height: "64px" }} />;

let cx = classNames.bind(styles);

class ExpServiceListItem extends React.Component {
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
    let icon = iconMap[this.props.ser.id];
        if (!icon) {
          icon = defaultIcon;
        }


    return (
      <div
        className={`${styles.card}`}
        style={{
          border: "1px solid rgba(48,55,66,.10)",
          background: `${
            this.props.isSelected && !this.props.isFinalized
              ? "#ece6ff"
              : "#fff"
          }`,
          marginBottom: "2rem",
          minHeight: "80px",
          margin: "0.5rem",
          padding: "0.2rem 0.5rem",
          display: "flex",
          justifyContent: "left",
          width: "100%",
          borderRadius: "0.3rem",
          boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0.8rem 0",
              flex: "10"
            }}
          >
            {icon}
          </div>

          <div style={{ display: "flex", flex: "90", flexDirection: "column" }}>
            <div className={styles.cardHeader}>
              <button
                onClick={this.expandCard}
                className={`${styles.btn} ${styles.floatRight} ${styles.btnLink}`}
              >
                {this.props.isFinalized ? (
                  <span
                    className={`${iconStyles.typcn} ${iconStyles.typcnArrowDownThick}`}
                    style={{
                      fontSize: "0.8rem",

                      cursor: "pointer"
                    }}
                  />
                ) : (
                  <span
                    className={`${iconStyles.typcn} ${iconStyles.typcnPlus}`}
                    style={{
                      fontSize: "0.8rem",

                      cursor: "pointer"
                    }}
                  />
                )}
              </button>
              <div className={`${styles.cardHeader}`}>
                <h6> {this.props.ser.name} </h6>
              </div>
              <div
                className={styles.cardSubtitle}
                style={{ paddingLeft: "0.9rem" }}
              >
                <div className={styles.textGray}>
                  {this.props.ser.shortDescription}
                </div>
              </div>
              <div className={`${styles.cardBody}`}>
                {this.state.expanded ? (
                  <div className={styles.columns} style={{ margin: "1rem 0" }}>
                    <ServiceForm
                      key={`service-form-${this.props.ser.id}`}
                      selectedService={this.props.ser}
                      showName={false}
                      isFinalized={this.props.isFinalized}
                      showFaq={false}
                      onSubmit={this.props.updateServiceDetails}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpServiceListItem;

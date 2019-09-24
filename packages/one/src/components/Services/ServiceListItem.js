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

const iconMap = {
  0: <ProptaxSvg style={{ width: "64px", height: "64px" }} />,
  1: <UtilBill style={{ width: "64px", height: "64px" }} />,
  2: <PetLic style={{ width: "64px", height: "64px" }} />,
  3: <Renew style={{ width: "64px", height: "64px" }} />,
  4: <BusinessLic style={{ width: "64px", height: "64px" }} />,
  5: <BusinessLic style={{ width: "64px", height: "64px" }} />,
  6: <UtilBill style={{ width: "64px", height: "64px" }} />,
  7: <DelFranchTax style={{ width: "64px", height: "40px" }} />,
  8: <CalFranchTax style={{ width: "64px", height: "80px" }} />
};

const defaultIcon = <DelFranchTax style={{ width: "64px", height: "64px" }}/>

let cx = classNames.bind(styles);

class ServiceListItem extends React.Component {
  constructor(props) {
    super(props);
    this.expandCard = this.expandCard.bind(this);
    this.state = {
      expanded: false
    };
  }

  expandCard(){
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    let icon = iconMap[this.props.ser.id];
    
    if (!icon){
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
          marginBottom: "4rem",
          maxHeight: "340px",
          minHeight: "120px",
          margin: "0.5rem",
          padding: "0.2rem 1rem",
          display: "flex",
          justifyContent: "left",
          width: "100%",
          borderRadius: "0.3rem",
          boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: 'center',
              margin: "0.2rem",
              cursor: "pointer",
              width: "24px"
            }}
          >
            {this.props.isFinalized ? (
              <span className={`${styles.label} ${styles.labelRounded} `}>
                <span
                  className={`${iconStyles.typcn} ${styles.textSuccess} ${iconStyles.typcnTick}`}
                />
              </span>
            ) : (
              <div>
                <label className={styles.formCheckbox}>
                  {this.props.isSelected ? (
                    <input
                      type="checkbox"
                      checked
                      onChange={this.props.onItemClick}
                    />
                  ) : (
                    <input type="checkbox" onChange={this.props.onItemClick} />
                  )}
                  <i className={styles.formIcon}></i>
                </label>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              margin: "0.8rem",
  
              width: "64px"
            }}
          >
            {icon}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              className={styles.cardHeader}
            >
              <h6 className={`${styles.cardTitle}`}>{this.props.ser.name} </h6>
            </div>

            <div
              className={`${styles.cardBody}`}
              style={{ cursor: "pointer" }}
              onClick={this.expandCard}
            >
              {this.props.ser.shortDescription}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ServiceListItem;

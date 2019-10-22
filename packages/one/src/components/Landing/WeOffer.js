import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import ProptaxSvg from "../../svgIcons/PropTaxIl";
import UtilBill from "../../svgIcons/utbIl";
import BusinessLic from "../../svgIcons/businessLic";
import PetLic from "../../illus/Renew";
import Renew from "../../illus/Renew";
import CalFranchTax from "../../illus/CalFranchTax";
import DelFranchTax from "../../illus/DelFranchTax";
import ServiceForm from "../Services/ServiceForm";

const iconMap = {
  SER_PROP_TAX_IND: <ProptaxSvg style={{ width: "80px", height: "64px" }} />,
  SER_PET_LIC_INDIV: <PetLic style={{ width: "80px", height: "64px" }} />,
  SER_REN_BUS_LIC_BIZ: <Renew style={{ width: "80px", height: "64px" }} />,
  SER_REN_DBA_BIZ: <BusinessLic style={{ width: "80px", height: "64px" }} />,
  SER_STA_OF_INF_FIL_BUS_CAL: (
    <BusinessLic style={{ width: "80px", height: "64px" }} />
  ),
  "SER_UTIL_BILL_INDEV": (
    <UtilBill style={{ width: "80px", height: "64px" }} />
  ),
  SER_DEL_FRA_TAX_BIZ: (
    <DelFranchTax style={{ width: "80px", height: "64px" }} />
  ),
  SER_CAL_FRA_TAX_BIZ: (
    <CalFranchTax style={{ width: "50px", height: "64px" }} />
  )
};
const defaultIcon = <DelFranchTax style={{ width: "100px", height: "64px" }} />;


class WeOffer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {packName, services, loading } = this.props;

      if (loading) {
        return (
          <div className={styles.columns} style={{ marginTop: "1rem" }}>
            <div
              className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
            />
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

            <div
              className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
            />
          </div>
        );
      }

    const sers = services[packName] || []

    const serComps = sers.map((ser, idx) => {
      return (
        <div
          className={`${styles.card} ${styles.textLeft}`}
          style={{
            border: "1px solid rgba(48,55,66,.10)",
            background: "#fff",
            width: "18rem",
            height: "18rem",
            marginBottom: "1rem",
            marginTop: "1rem",
            padding: "0.4rem",
            borderRadius: "0.3rem",
            boxShadow: "0 .3rem 0.8rem rgba(48,55,66,.10)"
          }}
        >
          <div
            className={styles.cardImage}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0.7rem"
            }}
          >
            {iconMap[ser.sid] ? iconMap[ser.sid] : defaultIcon}
          </div>
          <div className={styles.cardHeader}>
            <h5 className={`${styles.cardTitle}`}>{ser.name}</h5>
          </div>
          <div className={styles.cardBody}>
            <p className={`${styles.cardSubitle} ${styles.textGray}`}>
              {ser.shortDescription}
            </p>
          </div>
        </div>
      );
    });

    return (
      <Fragment>
        <div
          className={`${styles.columns}`}
          style={{
            margin: "8rem 0 2rem 0"
          }}
        >
          <div className={`${styles.column} ${styles.col2}`} />
          <div className={`${styles.column}  ${styles.col8}`}>
            <div className={styles.textCenter}>
              <h3> Services we offer </h3>
            </div>
          </div>
          <div className={`${styles.column} ${styles.col2}`} />
        </div>
        <div
          className={`${styles.columns}`}
          style={{
            margin: "2rem 0 8rem 0"
          }}
        >
          <div className={`${styles.column} ${styles.col1}`} />
          <div
            className={`${styles.column}  ${styles.col10}`}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: 'space-evenly' }}
          >
            {serComps}
          </div>
          <div className={`${styles.column} ${styles.col1}`} />
        </div>
      </Fragment>
    );
  }
}

export default WeOffer;

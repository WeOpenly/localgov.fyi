import React, { Component, Fragment } from "react";

import ProptaxSvg from "../../svgIcons/PropTaxIl.js";
import ParkingcitSvg from "../../svgIcons/ParkingCitIl.js";
import RecreationSvg from "../../svgIcons/RecreationIl.js";
import Utilitybill from "../../svgIcons/utbIl.js";
import BusinessLic from "../../svgIcons/businessLic.js";

import ServiceCard from './ServiceCard';

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class FooterNew extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
        serPack
    } = this.props;
    const {driv_lic_loading,veh_reg_loading,  veh_reg_results, driv_lic_results, veh_reg_failed, driv_lic_failed} = serPack;

    const loading = driv_lic_loading || veh_reg_loading;
    const failed = driv_lic_failed && veh_reg_failed;

    let details = []
    if (loading) {
        details = <div className={styles.loading} />
    } else if (failed) {
        details = (
          <div
            className={styles.empty}
            style={{
         
              borderRadius: "0.6rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h5 className={styles.emptyTitle}>Couldn't find General Requirements</h5>
            <p className={styles.emptySubtitle}>
              We'll add these details soon
            </p>
          </div>
        );
    } else {
        if (veh_reg_results && veh_reg_results.length > 0){
            const result = veh_reg_results[0]
            const {location_sers} = result;
            if (location_sers && location_sers.length > 0){
                const cardDetails = {
                  contact_details: location_sers[0].contact_details,
                  service_name: location_sers[0].service_name,
                  org_logo: location_sers[0].organization.logo_url,
                  org_name: location_sers[0].organization.org_name,
                  learn_more_url: location_sers[0].url_slug,
                  quickpay_url:
                    "https://pay.papergov.com/renew-vehicle-registration"
                };
                details.push(<ServiceCard {...cardDetails} />)
            }
        }
        if (driv_lic_results && driv_lic_results.length > 0) {
          const result = driv_lic_results[0];
          const { location_sers } = result;
          if (location_sers && location_sers.length > 0) {
            const cardDetails = {
              contact_details: location_sers[0].contact_details,
              service_name: location_sers[0].service_name,
              org_logo: location_sers[0].organization.logo_url,
              org_name: location_sers[0].organization.org_name,
              learn_more_url: location_sers[0].url_slug,
              quickpay_url: "https://pay.papergov.com/"
            };
            details.push(<ServiceCard {...cardDetails} />);
          }
        }
    }


    return (
      <Fragment>
        <div
          className={`${styles.tile} ${styles.textCenter}`}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
            marginTop: "1rem",
            padding: "1rem 0.4rem 0rem 0.4rem"
          }}
        >
          <div
            className={styles.tileContent}
            style={{
              padding: "0 4rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            <div className={styles.tileIcon} style={{ marginRight: "0.5rem" }}>
              <span
                style={{ color: "rgba(50, 182, 67, .95)", fontSize: "1.6rem" }}
                className={`${iconStyles.typcn} ${iconStyles.typcnFolder}`}
              />
            </div>

            <div className={styles.textLeft}>
              <h4 style={{ color: "rgba(50, 182, 67, .95)" }}>
                General Requirements
              </h4>
              <p style={{ lineHeight: "1.1rem", paddingRight: "4rem" }}>
                Driver-partners need to submit copies of driver’s license,
                vehicle registration, proof of insurance, your photo, and some
                information for a background check.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div
            className={`${styles.column} ${styles.col10}`}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap"
            }}
          >
            {details}
          </div>
          <div className={`${styles.column} ${styles.col1}`}></div>
        </div>
      </Fragment>
    );
  }
}

export default FooterNew;

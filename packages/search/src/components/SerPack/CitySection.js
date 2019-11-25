import React, { Component, Fragment } from "react";

import ProptaxSvg from "../../svgIcons/PropTaxIl.js";
import ParkingcitSvg from "../../svgIcons/ParkingCitIl.js";
import RecreationSvg from "../../svgIcons/RecreationIl.js";
import Utilitybill from "../../svgIcons/utbIl.js";
import BusinessLic from "../../svgIcons/businessLic.js";


import ServiceCard from "./ServiceCard";


import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class CitySection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { serPack } = this.props;
   
    const {
      bus_lic_loading,
      bus_lic_results,
      bus_lic_failed,
    } = serPack;

    const loading = bus_lic_loading;

    const failed = bus_lic_failed;

    let details = [];
    if (loading) {
      details = <div className={styles.loading} />;
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
          <h5 className={styles.emptyTitle}>
            Couldn't find Local Requirements
          </h5>
          <p className={styles.emptySubtitle}>We'll add these details soon</p>
        </div>
      );
    } else {
      if (bus_lic_results && bus_lic_results.length > 0) {
        const result = bus_lic_results[0];
        const { location_sers } = result;
        if (location_sers && location_sers.length > 0) {
          const cardDetails = {
            contact_details: location_sers[0].contact_details,
            service_name: 'Business License Renewal',
            org_logo: location_sers[0].organization.logo_url,
            org_name: location_sers[0].organization.org_name,
            learn_more_url: location_sers[0].url_slug,
            quickpay_url:
              "https://pay.papergov.com/pay-business-tax-license-renewal"
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
            marginBottom: "2rem",
            marginTop: "1rem",
            padding: "1rem 0.4rem 0rem 0.4rem"
          }}
        >
          <div
            className={styles.tileContent}
            style={{
              padding: "0 0.1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            <div className={styles.tileIcon} style={{ marginRight: "0.5rem" }}>
              <span
                style={{ color: "rgba(255, 183, 0, .95)", fontSize: "1.5rem" }}
                className={`${iconStyles.typcn} ${iconStyles.typcnLocationArrowOutline}`}
              />
            </div>

            <div className={styles.textLeft}>
              <h4 style={{ color: "rgba(255, 183, 0, .99)" }}>
                Local Requirements
              </h4>
              <p className={` `} style={{lineHeight: '1.1rem'}}>
                Driver-partners operating on the Uber app may be required by
                local governments to obtain a business license (or related local
                business tax liabilities) and pay associated fees. Business
                Licenses need to be renewed annually in most cases.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div
            className={`${styles.column} ${styles.col10}`}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            {details}
          </div>
          <div className={`${styles.column} ${styles.col1}`}></div>
        </div>
      </Fragment>
    );
  }
}

export default CitySection;

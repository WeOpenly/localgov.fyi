import React, { Component, Fragment } from "react";

import ProptaxSvg from "../../svgIcons/PropTaxIl.js";
import ParkingcitSvg from "../../svgIcons/ParkingCitIl.js";
import RecreationSvg from "../../svgIcons/RecreationIl.js";
import Utilitybill from "../../svgIcons/utbIl.js";
import BusinessLic from "../../svgIcons/businessLic.js";

import ServiceCard from "./ServiceCard";


import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class FooterNew extends Component {
  constructor(props) {
    super(props);
  }

  render() {

const { serPack } = this.props;

const {
  parking_tik_loading,
  parking_tik_results,
  parking_tik_failed,
  toll_tik_loading,
  toll_tik_results,
  toll_tik_failed
} = serPack;

const loading = parking_tik_loading || toll_tik_loading;

const failed = toll_tik_failed && parking_tik_failed;

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
        {" "}
        Couldn't find Violation Payment Details
      </h5>
      <p className={styles.emptySubtitle}>We'll add these details soon</p>
    </div>
  );
} else {
  if (parking_tik_results && parking_tik_results.length > 0) {
    const result = parking_tik_results[0];
    const { location_sers } = result;
    if (location_sers && location_sers.length > 0) {
      const cardDetails = {
        contact_details: location_sers[0].contact_details,
        service_name: 'Pay Parking Ticket or Citation',
        buttonText: 'Pay now',
        org_logo: location_sers[0].organization.logo_url,
        org_name: location_sers[0].organization.org_name,
        learn_more_url: location_sers[0].url_slug,
        quickpay_url: "https://pay.papergov.com/pay-parking-ticket-citation"
      };
      details.push(<ServiceCard {...cardDetails} />);
    }
  }
    if (toll_tik_results && toll_tik_results.length > 0) {
      const result = toll_tik_results[0];
      const { location_sers } = result;
      if (location_sers && location_sers.length > 0) {
        const cardDetails = {
          contact_details: location_sers[0].contact_details,
          service_name: "Pay Traffic Citation or Ticket",
          buttonText: 'Pay now',
          org_logo: location_sers[0].organization.logo_url,
          org_name: location_sers[0].organization.org_name,
          learn_more_url: location_sers[0].url_slug,
          quickpay_url: "pay-toll-bill-violation"
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
                style={{ color: "rgba(215, 62, 72, .5)", fontSize: "1.4rem" }}
                className={`${iconStyles.typcn} ${iconStyles.typcnTag}`}
              />
            </div>

            <div className={styles.textLeft}>
              <h4 style={{ color: "rgba(215, 62, 72, .7)" }}>
                Tickets, tolls & violations
              </h4>
              <p style={{ lineHeight: "1.1rem", paddingRight: '4rem' }}>
                Handling unforeseen parking tickets, traffic tickets, tolls or
                other notices/violations couldn't be eaiser. Just snap a picture
                of the ticket/notice & we take care of the rest for you.
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

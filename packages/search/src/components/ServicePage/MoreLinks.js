import React, { Component } from "react";
import styles from "../spectre.min.module.css";


class MoreLinks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      state_name,
      org_name,
      stateServices,
      otherServices
    } = this.props;
    let glossaries = [
      {
        name: "Pay Property Taxes ",
        link: "pay-property-taxes/"
      },
      {
        name: "Pay Parking Citation",
        link: "pay-parking-citation/"
      },
      {
        name: "Apply for Unemployment Insurance",
        link: "apply-for-unemployment-insurance/"
      },
      {
        name: "Pay Utility Bill",
        link: "pay-utility-bill/"
      },
      {
        name: "Renew Business License",
        link: "renew-business-license/"
      }
    ];

    const glosaaryLinks = glossaries.map((gl, idx) => (
      <div key={idx} style={{ marginBottom: "0.2rem" }}>
        <a
          href={`/services/${gl.link}`}
          className={`${styles.textLinkGray} ${styles.textSemibold}`}
          target="_blank"
        >
          {gl.name}
        </a>
      </div>
    ));

    const otherSers = otherServices.slice(0, 4).map((ser, idx) => (
      <div key={idx} style={{ marginBottom: "0.2rem" }}>
        <a
          href={`/${ser.url_slug}`}
          className={`${styles.textLinkGray} ${styles.textSemibold}`}
          target="_blank"
        >
          {ser.service_name}
        </a>
      </div>
    ));

    const additionalServices = (
      <div >
        <div style={{ paddingBottom: "0.5rem" }}>
          <h6>Popular in {org_name}</h6>
        </div>

        <div>{otherSers}</div>
      </div>
    );

    const stateSerLinks = stateServices.map((ss, idx) => (
      <div key={idx} style={{ marginBottom: "0.2rem" }}>
        <a
          href={`/${ss.url_slug}`}
          className={`${styles.textLinkGray} ${styles.textSemibold}`}
          target="_blank"
        >
          {ss.name}
        </a>
      </div>
    ));

    const stateSers = (
      <div>
        <div style={{ paddingBottom: "0.5rem" }}>
          <h6>Services in {state_name}</h6>
        </div>

        <div >{stateSerLinks}</div>
      </div>
    );

    const glossLinks = (
      <div >
        <div style={{ paddingBottom: "0.5rem" }}>
          <h6>Trending on papergov</h6>
        </div>

        <div >{glosaaryLinks}</div>
      </div>
    );

    return (
      <div className={`${styles.columns}`}>
        <div
          style={{ margin: "1rem 0" }}
          className={`${styles.column} ${styles.colSm12} ${styles.colMd3}`}
        >
          {glossLinks}
        </div>
        <div
          style={{ margin: "1rem 0" }}
          className={`${styles.column} ${styles.colSm12} ${styles.colMd3}`}
        >
          {additionalServices}
        </div>
        <div
          style={{ margin: "1rem 0" }}
          className={`${styles.column} ${styles.colSm12} ${styles.colMd3}`}
        >
          {stateSers}
        </div>
      </div>
    );
  }
}

export default MoreLinks;

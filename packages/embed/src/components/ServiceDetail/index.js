import React, { Component, Fragment } from "react";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class ServiceDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, id, url_slug, offeredIn, info, serDelLinks } = this.props;
    const windowGlobal = typeof window !== "undefined" && window;
    const windowLocation = windowGlobal.location ? windowGlobal.location : {};

    let serButtons = null;
    if (serDelLinks) {
      serButtons = serDelLinks.map((link, idx) => {
        return (
          <a
            href={link.url}
            target="_blank"
            style={{ margin: "0 0.2rem" }}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            {link.link_name}
          </a>
        );
      });
    }

    let contactAddress;
    if (info)
      contactAddress = info.find(detail => detail.contact_type === "ADDRESS");
    let contactAddressValue = null;
    if (contactAddress)
      contactAddressValue = contactAddress.contact_value || null;

    const sortedInfo = [];
    const sortInfo = info => {
      info.forEach(detail => {
        let type = detail.contact_type;
        if (type === "FACEBOOK") {
          sortedInfo[0] = detail;
        } else if (type === "TWITTER") {
          sortedInfo[1] = detail;
        } else if (type === "EMAIL") {
          sortedInfo[2] = detail;
        } else if (type === "PHONE") {
          sortedInfo[3] = detail;
        } else if (type === "ADDRESS") {
          sortedInfo[4] = detail;
        }
      });
    };
    if (info) sortInfo(info);

    const contactDetailButtons = sortedInfo.map((cd, idx, arr) => {
      const icons = {
        phone: (
          <span
            style={{ padding: "0" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnPhone}`}
          ></span>
        ),
        address: (
          <span
            style={{ padding: "0" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnLocation}`}
          ></span>
        ),
        email: (
          <span
            style={{ padding: "0" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnMail}`}
          ></span>
        ),
        facebook: (
          <span
            style={{ padding: "0" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnSocialFacebook}`}
          ></span>
        ),
        twitter: (
          <span
            style={{ padding: "0" }}
            className={`${iconStyles.typcn} ${iconStyles.typcnSocialTwitter}`}
          ></span>
        )
      };

      let value = cd.contact_value;
      if (!value) value = cd.value;

      const contactType = cd.contact_type.toLowerCase();
      if (contactType.toLowerCase() === "phone") {
        value = (
          <div key={idx} style={{ marginBottom: "0.2rem" }}>
            <a
              href={`tel:${value}`}
              className={`${styles.textGray} ${styles.textSemibold}`}
              target="_blank"
            >
              {icons[contactType]} {value}
            </a>
          </div>
        );
      } else if (contactType.toLowerCase() === "address") {
        value = (
          <div key={idx} style={{ marginBottom: "0.2rem" }}>
            <a
              href={`http://maps.google.com/?q=${value}`}
              className={`${styles.textGray} ${styles.textSemibold}`}
              target="_blank"
            >
              {icons[contactType]} {value}
            </a>
          </div>
        );
      } else if (contactType.toLowerCase() === "email") {
        value = (
          <div key={idx} style={{ marginBottom: "0.2rem" }}>
            <a
              href={`mailto:${value}`}
              className={`${styles.textGray} ${styles.textSemibold}`}
              target="_blank"
            >
              {icons[contactType]} {value}
            </a>
          </div>
        );
      } else {
        value = (
          <div key={idx} style={{ marginBottom: "0.2rem" }}>
            <a
              href={`${value}`}
              className={`${styles.textGray} ${styles.textSemibold}`}
              target="_blank"
            >
              {icons[contactType]} {value}
            </a>
          </div>
        );
      }

      return <div key={`ser-cd-${idx}`}>{value} </div>;
    });

    return (
      <div
        className={`${styles.card} ${styles.textLeft}`}
        style={{
          border: "none",
          background: "#fff",
          minHeight: "120px",
          padding: "0rem"
        }}
      >
        <div className={styles.cardHeader} style={{ marginLeft: "0.1rem" }}>
          <h3 className={`${styles.cardTitle}`}>{name}</h3>
          <h6> {offeredIn}</h6>
        </div>
        <div className={styles.cardBody}>
          <p
            style={{ lineHeight: "1.1rem" }}
            className={`${styles.cardSubtitle} ${styles.textGray}`}
          >
            {contactDetailButtons && contactDetailButtons}
          </p>
        </div>
        <div
          className={styles.cardFooter}
          style={{
            display: "flex",

            justifyContent: "right"
          }}
        >
          <a
            href={url_slug}
            target="_blank"
            style={{ color: "#5627ff", margin: "0 0.5rem" }}
            className={`${styles.btn}`}
          >
            Learn More
          </a>
          {serButtons}
        </div>
      </div>
    );
  }
}

export default ServiceDetail;

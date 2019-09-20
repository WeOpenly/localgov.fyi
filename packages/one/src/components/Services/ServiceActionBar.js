import React from "react";
import { Elements } from "react-stripe-elements";

import StrIpeCheckoutForm from "./StrIpeCheckoutForm";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

class ServiceActionBar extends React.Component {
  render() {
    const { action } = this.props;
    if (!action){
        return null
    }

    let className = cx({
        floatingBar: true,
    });
    return (
      <div
        className={className}
        style={{
          background: "#fff",
          display: "flex",
          justifyContent: "right",
          boxShadow: "0 0 0.5rem 0.3rem rgba(50,50,93,.04)"
        }}
      >
        <div className={`${styles.container} ${styles.gridXl}`}>
          <div className={`${styles.columns}`}>
            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
            <div
              className={`${styles.column} ${styles.col7} ${styles.colXs12} ${styles.textCenter}`}
            >
              <div
                style={{
                  padding: "1rem 0",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                {action}
              </div>
            </div>
            <div
              className={`${styles.column} ${styles.col3} ${styles.hideXs}`}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceActionBar;

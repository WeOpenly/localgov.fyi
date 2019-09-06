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

          boxShadow: "0 0 0.5rem 0.3rem rgba(50,50,93,.04)"
        }}
      >
        <div
          style={{
            padding: "1rem 0",
            display: "flex",
            justifyContent: "right",
            marginRight: "300px"
          }}
        >
          {action}
        </div>
      </div>
    );
  }
}

export default ServiceActionBar;

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

import FeatureCard from './Feature';

import GoodBye from "../../illus/GoodBye";
import Safety from "../../illus/Safety";
import Register from "../../illus/Register";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class FeatureGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { icon, heading, description } = this.props;
    return (
      <Fragment>
        <div className={`${styles.column} ${styles.colSm4} ${styles.colXs12}`}>
          <FeatureCard
            icon={<GoodBye />}
            heading={"Simple"}
            description="Say goodbye to filling old fashioned forms or sending in paper checks to pay"
          />
        </div>

        <div className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}>
          <FeatureCard
            icon={<Safety />}
            heading={"Secure"}
            description="We use industry-standard encryption for all transactions."
          />
        </div>

        <div className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}>
          <FeatureCard
            icon={<Register />}
            heading={"Surety"}
            description="Guaranteed on-time payment or we pay your late fees."
          />
        </div>
      </Fragment>
    );
  }
}

export default FeatureGrid;

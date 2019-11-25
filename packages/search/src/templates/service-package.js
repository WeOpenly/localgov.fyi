import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Link from "gatsby-link";
import queryString from "query-string";

import { navigate } from "@reach/router";

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";

import Helmet from "react-helmet";

import {
  fetchAutoLocSers,
  fetchSeachedLocSers
} from "../components/SerPack/actions";

import Index from "../components/SerPack/Index";
import GeneralSection from "../components/SerPack/GeneralSection";
import CitySection from "../components/SerPack/CitySection";
import PaySection from '../components/SerPack/PaySection';

import FooterNew from "../components/FooterNew";

class ServicePackage extends Component {
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentWillMount(){
    const {dispatch} = this.props;
    const sers_map = {
      VEH_REG: "4b169939-ca8d-4289-9a53-2a6d211423c2",
      DRIV_LIC: "b04f7338-53b2-40af-a295-f0c736c16f97",
      BUS_LIC: "b6a31bb0-90d7-4806-8a05-6e45c5485215",
      PARK_TIK: "0bbec7f3-7c54-4ce8-8356-8494835e2ef3",
      TOLL_TIK: "f250a144-69d0-416c-94f3-dffb58fd895a"
    };
    Object.keys(sers_map).forEach(ser =>
      dispatch(fetchAutoLocSers(ser, sers_map[ser]))
    );
  }

  onSearchChange(lat, lng) {
   
    const { dispatch } = this.props;
    const sers_map = {
      VEH_REG: "4b169939-ca8d-4289-9a53-2a6d211423c2",
      DRIV_LIC: "b04f7338-53b2-40af-a295-f0c736c16f97",
      BUS_LIC: "b6a31bb0-90d7-4806-8a05-6e45c5485215",
      PARK_TIK: "0bbec7f3-7c54-4ce8-8356-8494835e2ef3",
      TOLL_TIK: "f250a144-69d0-416c-94f3-dffb58fd895a"
    };
    Object.keys(sers_map).forEach(ser =>
      dispatch(fetchSeachedLocSers(ser, sers_map[ser], lat, lng))
    );
  }

  render() {
    const { pack_name } = this.props.pageContext;

    const {serPack} = this.props;


    return (
      <Fragment>
        <Helmet>
          <title>{`${pack_name} | papergov`}</title>
        </Helmet>

        <div
          className={`${styles.container} ${styles.gridXl}`}
          style={{ background: "#f9fafc" }}
        >
          <div className={`${styles.columns} `}>
            <div className={`${styles.column} ${styles.col3}`}></div>
            <div className={`${styles.column} ${styles.col6}`}>
              <Index serPack={serPack} onSearchChange={this.onSearchChange} />
            </div>
            <div className={`${styles.column} ${styles.col3}`}></div>

            <div className={`${styles.column} ${styles.col2}`}></div>
            <div className={`${styles.column} ${styles.col8}`}>
              <div
                style={{ background: "#eef0f3" }}
                className={styles.divider}
              ></div>
            </div>
            <div className={`${styles.column} ${styles.col2}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ marginBottom: "4rem" }}
              className={`${styles.column} ${styles.col10}`}
            >
              <GeneralSection serPack={serPack} />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col2}`}></div>
            <div className={`${styles.column} ${styles.col8}`}>
              <div
                style={{ background: "#eef0f3" }}
                className={styles.divider}
              ></div>
            </div>
            <div className={`${styles.column} ${styles.col2}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ marginBottom: "4rem" }}
              className={`${styles.column} ${styles.col10}`}
            >
              <CitySection serPack={serPack} />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col2}`}></div>
            <div className={`${styles.column} ${styles.col8}`}>
              <div
                style={{ background: "#eef0f3" }}
                className={styles.divider}
              ></div>
            </div>
            <div className={`${styles.column} ${styles.col2}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ marginBottom: "4rem" }}
              className={`${styles.column} ${styles.col10}`}
            >
              <PaySection serPack={serPack} />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col12}`}>
              <FooterNew />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

ServicePackage.propTypes = {
  classes: PropTypes.object.isRequired
};



const mapStateToProps = function(state, ownProps) {
  return {
    serPack: state.serPack,
    ...ownProps
  };
};

const ConnServiceGlossary = connect(
  mapStateToProps
)(ServicePackage);

export default ConnServiceGlossary;

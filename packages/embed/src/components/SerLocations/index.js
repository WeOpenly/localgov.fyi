import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import queryString from "query-string";

import SerLocationCard from './SerLocationCard';

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

import {fetchAutoLoc} from './actions'

class SerLocationShell extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    const searchValues = queryString.parse(location.search);

    // if (searchValues && searchValues.ser_temp_id) {
    //   dispatch(fetchAutoLoc(searchValues.ser_temp_id));
    // }
    dispatch(fetchAutoLoc("f26d145a-8058-4ec3-bb44-7baa82d3fa21"));

  }

  render() {
    const {
      autoLocLoading,
      autoLocResults,
      autoLocFailed,
      autoLocRegion,

    } = this.props;

    console.log(this.props, "SerlocShell")
    if (autoLocLoading) {
      return 'loading';
    }

    if (autoLocFailed){
      return null;
    }

    let allLocSers = []
    allLocSers = autoLocResults.map((locResult, item) => {
       const locsHere = locResult.location_sers.map((res, idx) => {
         return (
           <SerLocationCard
             key={idx}
             idx={idx}
             organization={res.organization}
             ser_url_slug={res.url_slug}
             area={res.area}
           />
         );
       });
       return (
         <Fragment>
           <h4 style={{paddingBottom: '1rem'}}>{locResult.header}</h4>
           <div>{locsHere}</div>
         </Fragment>
       );
    })

    return (
      <div className={`${styles.columns}`}>
        <div
          className={`${styles.column} ${styles.col12} ${styles.hideXs} ${styles.textLeft}`}
        >
          <div></div>
          <div>{allLocSers}</div>
        </div>
        <div
          className={`${styles.column} ${styles.col12} ${styles.showXs} ${styles.textCenter}`}
        >
          <div></div>
          <div>{allLocSers}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.SerLocations
  };
};

export default connect(mapStateToProps)(SerLocationShell);

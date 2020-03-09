import React, { Component } from "react";
import { connect } from "react-redux";

import SuggestedRow from "./SuggestedRow";
import Fuse from "fuse.js";

import styles from "../spectre.min.module.css";


class OtherStateLocations extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
           autoLocLoading,
          autoLocRegion,
         } = this.props;

    const { classes, allOrgs, isMobile} = this.props;
    
    const {
           googLocLoading,
           googleLocRegion
         } = this.props;


    if (autoLocLoading || googLocLoading) {
      return (
        <div className={`${styles.columns}`}>
          <div
            className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
            style={{ padding: "2rem " }}
          >
            <div className={styles.loading} />
          </div>
        </div>
      );
    }

     let filteredOrgs = allOrgs;


     const stateOptions = {
       shouldSort: true,
       tokenize: false,
       threshold: 0,
       location: 0,
       distance: 5,
       maxPatternLength: 32,
       minMatchCharLength: 1,
       keys: ["area.hierarchy.area_name"]
     };

    let locationCards = null;
    if (googleLocRegion){  
        const stateFuse = new Fuse(allOrgs, stateOptions);
        filteredOrgs = stateFuse.search(googleLocRegion);

        if (filteredOrgs.length === 0){
            return null;
        }
         return (
           <SuggestedRow
             isMobile={isMobile}
             key={`goog-STATE-LOC`}
             header={`Suggestions from ${googleLocRegion}`}
             results={filteredOrgs}
           />
         );
    }

    if (autoLocRegion){
         const stateFuse = new Fuse(allOrgs, stateOptions);
         filteredOrgs = stateFuse.search(autoLocRegion);
       if (filteredOrgs.length === 0){
            return null;
        }
          return (
            <SuggestedRow
              isMobile={isMobile}
              key={`AUTO-state-LOC`}
              header={`Suggestions from ${autoLocRegion}`}
              results={filteredOrgs}
            />
          );
    }

    return locationCards
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.serTemplate,
    ...ownProps
  };
};

export default connect(mapStateToProps)(OtherStateLocations);

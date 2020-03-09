import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "../spectre.min.module.css";

import SuggestedRow from './SuggestedRow';
import LocationCard from '../UserRequests/LocationCard';


class Suggested extends Component {
    constructor(props) {
        super(props);
    }


    render() { 
        const { service_name, isMobile} = this.props;
        const { autoLocLoading, autoLocResults, autoLocFailed, handleOrgClick} = this.props;
        const { googLocLoading, googLocResults, googlLocFailed, noGoogSuggestsFound, searchText} = this.props;
   
        if (autoLocLoading || googLocLoading){
            return (
              <div className={`${styles.columns}`}>
                <div
                  className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
                  style={{padding: '2rem '}}
                >
                <div className={styles.loading} />
                </div>
              </div>
            );
        }

      
        if (autoLocFailed){
            return null;
        }

        let locationCards = null;

        if (autoLocResults && autoLocResults.length > 0){
            locationCards = autoLocResults.map((result, idx) => {
                const header = result.header;
                const results = result.location_sers;
                return (<SuggestedRow isMobile={isMobile} key={`auto-loc-${result.header}-${idx}`} header={header} results={results} handleOrgClick={handleOrgClick} />)
            });
        }

        if (googLocResults && googLocResults.length > 0) {
            locationCards = googLocResults.map((result, idx) => {
                const header = result.header;
                const results = result.location_sers;
                return (<SuggestedRow isMobile={isMobile} searchText={searchText} service_name={service_name} showingRelated={result.showing_related} showingParent={result.showing_parent}  key={`goog-loc-${result.header}-${idx}`} header={header} results={results} handleOrgClick={handleOrgClick} />)
            });
        }

        if ((noGoogSuggestsFound || googlLocFailed) && searchText) {
            return (
              <div className={`${styles.columns}`}>
                <div
                  className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
                  style={{ padding: "2rem " }}
                >
                  <LocationCard
                    isMobile={isMobile}
                    compact
                    message={`Sorry, we couldn't find any results for '${searchText}'`}
                  />
                </div>
              </div>
            );
        }

        return locationCards
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.serTemplate,
        ...ownProps
    };
};

export default connect(mapStateToProps)(Suggested);

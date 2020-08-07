import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Fuse from 'fuse.js';
import OtherStateLocations from './OtherStateLocations';

import styles from "../spectre.min.module.css";


import LocationSerCard from './LocationSerCard';
import StateSuggest from './StateSuggest';
import GoogleAds from "../components/GoogleAds";


class OtherLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateName: null,
            showMore: false,
        }
        this.toggleShowMore = this.toggleShowMore.bind(this)
        this.setStateFilter = this
            .setStateFilter
            .bind(this);
        this.clearStateName = this
            .clearStateName
            .bind(this);
    }

    toggleShowMore(toggle){
      this.setState({
        showMore: !toggle,
      })
    }

    clearStateName() {
        const { location } = this.props;
        this.setState({
            stateName: ''
        })
    }


    setStateFilter(stateSuggestion) {
        const { label } = stateSuggestion;
        this.setState({
            stateName: label
        })
    }



    render() {
      const { classes, allOrgs, isMobile } = this.props;
        const { stateName} = this.state;

   
        let filteredOrgs = allOrgs;

        const allStatesSet = new Set();

        const stateOptions = {
            shouldSort: true,
            tokenize: false,
            threshold: 0,
            location: 0,
            distance: 5,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ['area.hierarchy.area_name']
        }


 
        if (stateName) {
            const stateFuse = new Fuse(allOrgs, stateOptions)
            filteredOrgs = stateFuse.search(stateName);
        }

        
        allOrgs.map((org, idx) => {
                allStatesSet.add(org.area.hierarchy[org.area.hierarchy.length - 1].area_name)
            })

        allOrgs.sort((a, b) => a.organization.org_name.localeCompare(b.organization.org_name));

        let allStates = [];
        const sortedAllStates = Array
            .from(allStatesSet)
            .sort()
        sortedAllStates.forEach((org) => {
            allStates.push({ 'label': org })
        })

        const locs = filteredOrgs.map((org, idx) => {
            const organization = org.organization;
            return (
                <LocationSerCard key={idx} idx={idx} organization={organization} ser_url_slug={org.url_slug} area={org.area}  />
            )
        })


      let moreLocs = null;
      if (!this.state.showMore){
        moreLocs = (<a
          onClick={() => this.toggleShowMore(this.state.showMore)}

        >
        <p>
          Show More Locations
        </p>
        </a>)
      } 
        if (!this.props.isMobile || this.state.showMore){
          moreLocs = (
            <Fragment>
              <div style={{ marginBottom: "1rem" }}>
                <h5>More locations offering this service</h5>
              </div>
              <div style={{ width: "300px", marginBottom: "1rem" }}>
                <StateSuggest
                  isMobile={isMobile}
                  clearStateName={this.clearStateName}
                  selected={this.state.stateName}
                  allStates={allStates}
                  onSelectSuggestion={this.setStateFilter}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, 300px)"
                }}
              >
                {locs}
              </div>
            </Fragment>
          );
        }
        
        return (
          <div className={`${styles.columns}`}>
            <div className={`${styles.column} ${styles.col12} `}>
              <OtherStateLocations isMobile={isMobile} allOrgs={allOrgs} />
            </div>

            <div
              style={{
                marginTop: "3rem",
              }}
              className={`${styles.column} ${styles.col12}`}
            >
              {moreLocs}
            </div>
            
            <GoogleAds
            slot="8300987303"
            layout-key="-h6+9-b-38+7i"
            ad-format="fluid"
            />
         </div>
        );
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.serTemplate,
        ...ownProps
    };
};

export default connect(mapStateToProps)(OtherLocations);

import React, { Component } from "react";


import styles from "../spectre.min.module.css";

import LocationSerCard from "./LocationSerCard";

class SuggestedRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      header,
      isMobile,
      results,
      searchText,
      showingRelated,
      showingParent,
      service_name
    } = this.props;

    let serviceLocations = null;
    let parentFirstResName = null;

    serviceLocations = results.map((result, idx) => {
      const { organization, url_slug, area } = result;
      if (idx === 0) {
        parentFirstResName = organization.org_name;
      }
      return (
        <LocationSerCard
          isMobile={isMobile}
          highlight
          key={idx}
          idx={idx}
          organization={organization}
          ser_url_slug={url_slug}
          area={area}
        />
      );
    });

    let extraMessage = null;
    if (searchText && showingRelated) {
      extraMessage = (
        <div style={{ display: "flex", alignItems: "center" }}>
          {" "}
     
          <p>
            {`Showing related services to "${service_name}" in ${searchText}`}
          </p>
        </div>
      );
    } else if (searchText && showingParent) {
      extraMessage = (
        <div style={{ display: "flex", alignItems: "center" }}>
          {" "}
          
          <p>
            {`This service in ${searchText} is handled by ${parentFirstResName}`}
          </p>
          
        </div>
      );
    }

    return (
      <div style={{ margin: "1rem 0 0 0" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <h5>{header}</h5>
        </div>
        <div>{extraMessage}</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 300px)"
          }}
        >
          {serviceLocations}
        </div>
     
      </div>
    );
  }
}

export default SuggestedRow;

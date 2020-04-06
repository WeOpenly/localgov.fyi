import React, {Component, Fragment} from 'react';
import Link from 'gatsby-link';
import {navigate} from '@reach/router';
import Helmet from 'react-helmet'

import {connect} from "react-redux";

import SearchNav from "../components/Nav/Search";
import queryString from 'query-string'

import {graphql} from "gatsby";

import RawForm from '../components/Reminders/RawForm';

import HeaderWithSearch from '../components/HeaderWithSearch';
import LocatioDialog from '../components/UserRequests/LocationDialog';
import { toggleLocationRequestDialog } from "../components/UserRequests/actions.js";

import FooterNew from "../components/FooterNew";

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";


import {trackView, trackClick} from "../components/common/tracking";



const genericFSchema = {
  "type": "object",
  "required": ["email"],
  "properties": {
    "locations": {
      "type": "string",
      "title": "Location(s)"
    },
    "services": {
      "type": "string",
      "title": "Services(s)"
    },
    "email": {
      "type": "email",
      "title": "Email"
    },
    "name": {
      "type": 'string',
      "title": "Name"
    },
    "path": {
      "type": 'string',
      "title": "path"
    }
  }
}

class Locations extends Component {
  constructor(props) {
    super(props);
    this.handleOrgClick = this
      .handleOrgClick
      .bind(this);
  }

  handleOrgClick(id, name, index, url) {
    this
      .props
      .trackClick('locations', 'list', id, name, index);
    navigate(url);
  }

  componentDidMount() {
    this
      .props
      .trackView();
    const { search } = this.props.location;
    const values = queryString.parse(this.props.location.search);
    if (values && values.show_add_loc) {
      this.props.openDialog()
    }
  }

  render() {
    const { classes, isMobile} = this.props;
    const locLen = this.props.data.orgs.details.length;

    const userLocReqFormRaw = <RawForm
      field_schema={JSON.stringify(genericFSchema)}
      id="user_request_missing_loc_ser" />

    let stateGroupMap = {};

    this
      .props
      .data
      .orgs
      .details
      .map((loc, idx) => {
        const {org_name, id, area, url_slug} = loc['_source']
        const {hierarchy} = area;

        for (const hie of hierarchy) {

          const {area_name, area_classification, area_classsification_level_number} = hie;

          if (area_classsification_level_number === 1 && hierarchy.length > 1) {

            if (stateGroupMap[area_name]) {

              const vals = stateGroupMap[area_name];
              vals.push({org_name: org_name, id: id, url_slug: url_slug})
              stateGroupMap[area_name] = vals;
            } else {

              stateGroupMap[area_name] = [
                {
                  org_name: org_name,
                  id: id,
                  url_slug: url_slug
                }
              ]
            }
          }

        }
      });
    let sortedStateGroup = [];
    for (const [state,
      orgs]of Object.entries(stateGroupMap)) {
      sortedStateGroup.push({state: state, orgs: orgs});
    }
    sortedStateGroup.sort((a, b) => a.state.localeCompare(b.state))

    let locComponents = []
    for (const sortedState of sortedStateGroup) {
      const {state, orgs} = sortedState;
      const orgComps = orgs.map((org, idx) => {
        const {org_name, id, url_slug} = org;

        let strippedName = org_name.replace("Independent City of ", "")
        strippedName = strippedName.replace("City & County of ", "")
        strippedName = strippedName.replace("City and County of ", "")
        strippedName = strippedName.replace("City Council of ", "")
        strippedName = strippedName.replace("Metro Government of ", "")
        strippedName = strippedName.replace("Metropolitan Government of ", "")
        strippedName = strippedName.replace("City of ", "")
        strippedName = strippedName.replace("Borough of ", "")
        strippedName = strippedName.replace("County of ", "")
        strippedName = strippedName.replace("Town of ", "")

        return (

            <a
              key={`${id}-${idx}`}
              style={{
                textDecoration: "underline",
                cursor: "pointer"
              }}
              onClick={() =>
                this.handleOrgClick(id, org_name, idx, `/${url_slug}/`)
              }
            >
              <p>{strippedName}</p>
            </a>
 
        );
      });

      const stateComp = (
        <div
          style={{ marginBottom: "2rem" }}
          key={`${state}-container`}
          className={styles.textCenter}
        >
          <div style={{ marginBottom: "1rem" }}>
            <a href={`#${state}`}>
              <h5>{state}</h5>
            </a>
          </div>
          <div
            style={{
              display: "grid",
              textAlign: "center",
              gridTemplateColumns: "repeat(auto-fit, 150px)"
            }}
          >
            {orgComps}
          </div>
        </div>
      );
      locComponents.push(stateComp);
    }

    return (
      <Fragment>
        <Helmet>
          <title>{`Locations | papergov`}</title>

          <link rel="canonical" href={`https://papergov.com/locations/`} />
          <meta property="og:title" content={`Locations | papergov`} />
          <meta property="og:url" content={`https://papergov.com/locations/`} />

          <meta
            name="description"
            content={`Currently serving ${locLen} governments`}
          />

          <meta
            property="og:description"
            content={`Currently serving ${locLen} governments`}
          />
        </Helmet>
        <LocatioDialog />
        <div
          className={`${styles.container}`}
          style={{ background: "#f8f9fc" }}
        >
          <div className={`${styles.columns} ${styles.hideMd}`}>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ background: "#fff" }}
            >
              <SearchNav />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              className={`${styles.column} ${styles.col10} ${styles.textCenter}`}
              style={{
                marginTop: "1rem",
                padding: "2rem"
              }}
            >
              <h2>{`Papergov currently serves ${locLen} governments`}</h2>
              .. and adding more every day
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              className={`${styles.column} ${styles.col10} ${styles.textCenter}`}
              style={{
                marginTop: "1rem"
              }}
            >
              {locComponents}
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>
          <div className={`${styles.columns} ${styles.showMd}`}>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ background: "#fff" }}
            >
              <SearchNav />
            </div>


            <div
              className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
              style={{
                marginTop: "1rem",
                padding: "2rem"
              }}
            >
              <h2>{`Papergov currently serves ${locLen} governments`}</h2>
              .. and adding more every day
            </div>
          

   
            <div
              className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
              style={{
                marginTop: "1rem"
              }}
            >
              {locComponents}
            </div>
          

            <div className={`${styles.column} ${styles.col10}`}>
              <FooterNew />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
 
          </div>
        </div>
        {userLocReqFormRaw}
      </Fragment>
    );
  }
}

export const query = graphql `
query orgsQuery {
  orgs : allLocationsJson {
    details {
      _source {
        org_name id 
        area {
          hierarchy {area_name area_classification area_classsification_level_number}
        }
        url_slug
      }
    }
  }
}
`;

const mapDispatchToProps = (dispatch) => {
  return {
    trackView: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackView('locations', null, null, null));
    },
    trackClick: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex));
    },
    openDialog: () => {
      dispatch(toggleLocationRequestDialog(true))
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnLocations = connect(mapStateToProps, mapDispatchToProps)(Locations);

export default ConnLocations;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Link} from 'gatsby';



import ContentLoader from "react-content-loader"

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";



const windowGlobal = typeof window !== 'undefined' && window


const SuggestedLoader = () => (
  <ContentLoader
    height={200}
    width={400}
    speed={100}
    primaryColor="#f3f3f3"
    secondaryColor="#d5d9f3">
    <rect x="11" y="75" rx="0" ry="0" width="166" height="61" />
    <rect x="8" y="12" rx="0" ry="0" width="304" height="19" />
  </ContentLoader>
)


class OtherLocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: 'Atlanta',
          orgLink : 'https://papergov.com/organization/usa/georgia-state/fulton-county/atlanta-city/ '
        },
        {
          "name": "Austin",
          "orgLink": "https://papergov.com/organization/usa/texas-state/travis-county/austin-city/"
        },
        {
          "name": "Boston",
          "orgLink": "https://papergov.com/organization/usa/massachusetts-state/suffolk-county/boston-city/"
        },
        {
          "name": "Chicago",
          "orgLink": "https://papergov.com/organization/usa/illinois-state/cook-county/chicago-city/"
        },
        {
          "name": "Columbus",
          "orgLink": "https://papergov.com/organization/usa/ohio-state/franklin-county/columbus-city/"
        },
        {
          "name": "Dallas",
          "orgLink": "https://papergov.com/organization/usa/texas-state/dallas-county/dallas-city/"
        },
        {
          "name": "Detroit",
          "orgLink": "https://papergov.com/organization/usa/michigan-state/wayne-county/detroit-city/"
        },
        {
          "name": "El Paso",
          "orgLink": "https://papergov.com/organization/usa/texas-state/el-paso-county/el-paso-city/"
        },
        {
          "name": "Fort Worth",
          "orgLink": "https://papergov.com/organization/usa/texas-state/tarrant-county/fort-worth-city/"
        },
        {
          name: 'Houston',
          orgLink: 'https://papergov.com/organization/usa/texas-state/harris-county/houston-city/'
        },
        {
          "name": "Jacksonville",
          "orgLink": "https://papergov.com/organization/usa/florida-state/duval-county/jacksonville-city/"
        },
        {
          "name": "Jersey City",
          "orgLink": "https://papergov.com/organization/usa/new-jersey-state/hudson-county/jersey-city-city/"
        },
        {
          "name": "Indianapolis",
          "orgLink": "https://papergov.com/organization/usa/indiana-state/marion-county/indianapolis-city/"
        },
        {
          "name": "Kansas City",
          "orgLink": "https://papergov.com/organization/usa/missouri-state/platte-county/kansas-city-city/"
        },
        {
          name: 'Las Vegas',
orgLink : 'https://papergov.com/organization/usa/nevada-state/clark-county/las-vegas-city/'
        },
        
        {
          "name": "Los Angeles",
          "orgLink": "https://papergov.com/organization/usa/california-state/los-angeles-county/los-angeles-city/"
        },
        {
          "name": "Milwaukee",
          "orgLink": "https://papergov.com/organization/usa/wisconsin-state/milwaukee-county/milwaukee-city/"
        },
        {
          "name": "Nashville",
          "orgLink": "https://papergov.com/organization/usa/tennessee-state/davidson-county/nashville-city/"
        },
        {
          name: 'New York',
          orgLink: 'https://papergov.com/organization/usa/new-york-state/bronx-county/new-york-city/'
        },
        {
          "name": "Oakland",
          "orgLink": "https://papergov.com/organization/usa/california-state/alameda-county/oakland-city/"
        },
        {
          "name": "Oklahoma",
          "orgLink": "https://papergov.com/organization/usa/oklahoma-state/oklahoma-county/oklahoma-city-city/"
        },
        {
          "name": "Portland",
          "orgLink": "https://papergov.com/organization/usa/oregon-state/multnomah-county/portland-city/"
        },
        {
          "name": "Phoenix",
          "orgLink": "https://papergov.com/organization/usa/arizona-state/maricopa-county/phoenix-city/"
        },
        {
          name: 'Philadelphia',
orgLink : 'https://papergov.com/organization/usa/pennsylvania-state/philadelphia-county/'
        },
        {
          "name": "Pittsburgh",
          "orgLink": "https://papergov.com/organization/usa/pennsylvania-state/allegheny-county/pittsburgh-city/"
        },
        {
          "name": "San Antonio",
          "orgLink": "https://papergov.com/organization/usa/texas-state/bexar-county/san-antonio-city/"
        },
        {
          name: 'San Francisco',
          orgLink: 
          "https://papergov.com/organization/usa/california-state/san-francisco-county/"
        },
        {
          "name": "San Diego",
          "orgLink": "https://papergov.com/organization/usa/california-state/san-diego-county/san-diego-city/"
        },
        {
          name: 'San Jose',
          orgLink: 'https://papergov.com/organization/usa/california-state/santa-clara-county/san-jose-city/'
        },
        {
          "name": "Seattle",
          "orgLink": "https://papergov.com/organization/usa/washington-state/king-county/seattle-city/"
        },
        {
          "name": "Tucson",
          "orgLink": "https://papergov.com/organization/usa/arizona-state/pima-county/tucson-city/"
        }
      ]
    } 
  }



  render() {
    const {classes } = this.props;

       const otherLinks = this.state.items.slice(0, 24).map((item, idx) => {
         return (
           <h5
             key={`other-link-${idx}`}
             style={{ margin: "1rem", minWidth: '200px' }}
           >
             <a href={`${item.orgLink}`}>{item.name}</a>
           </h5>
         );
      });


      return (
        <div style={{ margin: "4rem 0" }} className={`${styles.columns}`}>
          <div
            style={{ margin: "0rem 0 4rem 0" }}
            className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          >
            <h3>Discover Papergov</h3>
          </div>

          <div
            className={`${styles.column} ${styles.col1} ${styles.textCenter}`}
          ></div>
          <div
            className={`${styles.column} ${styles.col10} ${styles.textCenter}`}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              {otherLinks}
            </div>
          </div>
          <div
            className={`${styles.column} ${styles.col1} ${styles.textCenter}`}
          ></div>
          <div
            style={{ margin: "4rem 0 0rem 0" }}
            className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          >
            <a href={"/locations"} className={styles.btn}>
              Discover more
            </a>
          </div>
        </div>
      );
    } 
  }


OtherLocationList.propTypes = {
  classes: PropTypes.object.isRequired
};


export default OtherLocationList;
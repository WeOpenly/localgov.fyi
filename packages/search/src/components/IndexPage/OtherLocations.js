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
           name: "Atlanta",
           orgLink: "https://papergov.com/ga/atlanta/"
         },
         {
           name: "Austin",
           orgLink: "https://papergov.com/tx/austin/"
         },
         {
           name: "Boston",
           orgLink: "https://papergov.com/ma/boston/"
         },
         {
           name: "Chicago",
           orgLink: "https://papergov.com/il/chicago/"
         },
         {
           name: "Columbus",
           orgLink: "https://papergov.com/oh/columbus/"
         },
         {
           name: "Dallas",
           orgLink: "https://papergov.com/tx/dallas-county-dallas-city/"
         },
         {
           name: "Detroit",
           orgLink: "https://papergov.com/mi/detroit/"
         },
         {
           name: "El Paso",
           orgLink: "https://papergov.com/tx/el-paso-county-el-paso-city/"
         },
         {
           name: "Fort Worth",
           orgLink: "https://papergov.com/tx/fort-worth/"
         },
         {
           name: "Houston",
           orgLink: "https://papergov.com/tx/houston/"
         },
         {
           name: "Jacksonville",
           orgLink: "https://papergov.com/fl/jacksonville/"
         },
         {
           name: "Jersey City",
           orgLink: "https://papergov.com/nj/jersey-city/"
         },
         {
           name: "Indianapolis",
           orgLink: "https://papergov.com/in/indianapolis/"
         },
         {
           name: "Kansas City",
           orgLink: "https://papergov.com/mo/kansas-city/"
         },
         {
           name: "Las Vegas",
           orgLink: "https://papergov.com/nv/las-vegas/"
         },
         {
           name: "Los Angeles",
           orgLink: "https://papergov.com/nv/las-vegas/"
         },
         {
           name: "Milwaukee",
           orgLink: "https://papergov.com//wi/milwaukee-county-milwaukee-city/"
         },
         {
           name: "Nashville",
           orgLink: "https://papergov.com/tn/nashville/"
         },
         {
           name: "New York",
           orgLink: "https://papergov.com/ny/bronx-county-new-york-city/"
         },
         {
           name: "Oakland",
           orgLink: "https://papergov.com/ca/oakland/"
         },
         {
           name: "Oklahoma",
           orgLink:
             "https://papergov.com/organization/usa/oklahoma-state/oklahoma-county/oklahoma-city-city/"
         },
         {
           name: "Portland",
           orgLink:
             "https://papergov.com/ok/oklahoma-county-oklahoma-city-city/"
         },
         {
           name: "Phoenix",
           orgLink: "https://papergov.com/az/phoenix/"
         },
         {
           name: "Philadelphia",
           orgLink: "https://papergov.com/pa/philadelphia/"
         },
         {
           name: "San Antonio",
           orgLink: "https://papergov.com/tx/san-antonio/"
         },
         {
           name: "San Francisco",
           orgLink: "https://papergov.com/ca/san-francisco/"
         },
         {
           name: "San Diego",
           orgLink: "https://papergov.com/ca/san-diego"
         },
         {
           name: "San Jose",
           orgLink: "https://papergov.com/ca/san-jose"
         },
         {
           name: "Seattle",
           orgLink: "https://papergov.com/wa/seattle"
         },
         {
           name: "Tucson",
           orgLink: "https://papergov.com/az/tucson"
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
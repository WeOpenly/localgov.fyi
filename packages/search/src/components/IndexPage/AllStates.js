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


class AllStateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
         {
           name: "Alabama",
           orgLink: "https://papergov.com/al/"
         },
         {
           name: "Alaska",
           orgLink: "https://papergov.com/ak/"
         },
         {
           name: "Arizona",
           orgLink: "https://papergov.com/az/"
         },
         {
           name: "Arkansas",
           orgLink: "https://papergov.com/ar/"
         },
         {
           name: "California",
           orgLink: "https://papergov.com/ca/"
         },
         {
           name: "Colorado",
           orgLink: "https://papergov.com/co/"
         },
         {
           name: "Connecticut",
           orgLink: "https://papergov.com/ct/"
         },
         {
           name: "Delaware",
           orgLink: "https://papergov.com/de/"
         },
         {
           name: "Florida",
           orgLink: "https://papergov.com/fl/"
         },
         {
           name: "Georgia",
           orgLink: "https://papergov.com/ga/"
         },
         {
           name: "Hawaii",
           orgLink: "https://papergov.com/hi/"
         },
         {
           name: "Idaho",
           orgLink: "https://papergov.com/id/"
         },
         {
           name: "Indianapolis",
           orgLink: "https://papergov.com/in/indianapolis/"
         },
         {
           name: "Illinois",
           orgLink: "https://papergov.com/il/"
         },
         {
           name: "Indiana",
           orgLink: "https://papergov.com/in/"
         },
         {
           name: "Iowa",
           orgLink: "https://papergov.com/ia/"
         },
         {
           name: "Kansas",
           orgLink: "https://papergov.com/ks/"
         },
         {
           name: "Kentucky",
           orgLink: "https://papergov.com/ky/"
         },
         {
           name: "Louisiana",
           orgLink: "https://papergov.com/la/"
         },
         {
           name: "Maine",
           orgLink: "https://papergov.com/me/"
         },
         {
           name: "Maryland",
           orgLink:
             "https://papergov.com/md/"
         },
         {
           name: "Massachusetts",
           orgLink:
             "https://papergov.com/ma/"
         },
         {
           name: "Michigan",
           orgLink: "https://papergov.com/mi/"
         },
         {
           name: "Minnesota",
           orgLink: "https://papergov.com/mn/"
         },
         {
           name: "Mississippi",
           orgLink: "https://papergov.com/ms/"
         },
         {
           name: "Missouri",
           orgLink: "https://papergov.com/mo/"
         },
         {
           name: "Montana",
           orgLink: "https://papergov.com/mt/"
         },
         {
           name: "Nebraska",
           orgLink: "https://papergov.com/ne/"
         },
         {
           name: "Nevada",
           orgLink: "https://papergov.com/nv/"
         },
         {
            name: "New Hampshire",
            orgLink: "https://papergov.com/nh/"
          },
          {
            name: "New Jersey",
            orgLink: "https://papergov.com/nj/"
          },
          {
            name: "New Mexico",
            orgLink: "https://papergov.com/nm/"
          },
          {
             name: "New York",
             orgLink: "https://papergov.com/ny/"
           },
           {
             name: "North Carolina",
             orgLink: "https://papergov.com/nc/"
           },
           {
            name: "North Dakota",
            orgLink: "https://papergov.com/nd/"
          },
          {
           name: "Ohio",
           orgLink: "https://papergov.com/oh/"
          },
          {
            name: "Oklahoma",
            orgLink: "https://papergov.com/ok/"
          },
          {
            name: " Oregon",
            orgLink: "https://papergov.com/or/"
          },
          {
           name: " Pennsylvania",
           orgLink: "https://papergov.com/pa/"
         },
         {
            name: "Rhode Island",
            orgLink: "https://papergov.com/ri/"
         },
         {
            name: "South Carolina",
            orgLink: "https://papergov.com/sc/"
         },
         {
            name: "South Dakota",
            orgLink: "https://papergov.com/sd/"
         },
         {
            name: "Tennessee",
            orgLink: "https://papergov.com/tn/"
         },
         {
            name: "Texas",
            orgLink: "https://papergov.com/tx/"
         },
         {
          name: "Utah",
          orgLink: "https://papergov.com/ut/"
         },
         {
            name: "Vermont",
            orgLink: "https://papergov.com/vt/"
         },
         {
            name: "Virginia",
            orgLink: "https://papergov.com/va/"
         },
         {
            name: "Washington",
            orgLink: "https://papergov.com/wa/"
         },
         {
            name: "West Virginia",
            orgLink: "https://papergov.com/wv/"
         },
         {
            name: "Wisconsin",
            orgLink: "https://papergov.com/wi/"
         },
         {
            name: "Wyoming",
            orgLink: "https://papergov.com/wy/"
         }
       ]
      }
  }



  render() {
    const {classes } = this.props;

       const stateLinks = this.state.items.slice(0, 52).map((item, idx) => {
         return (
           <h6
             key={`other-link-${idx}`}
             style={{ margin: "1rem", minWidth: '150px' }}
           >
             <a href={`${item.orgLink}`}>{item.name}</a>
           </h6>
         );
      });


      return (
        <div style={{ margin: "2rem 0" }} className={`${styles.columns}`}>
          <div
            style={{ margin: "0rem 0 2rem 0" }}
            className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          >
            <h3>Local Government Services from all 50 States.</h3>
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
              {stateLinks}
            </div>
          </div>
          <div
            className={`${styles.column} ${styles.col1} ${styles.textCenter}`}
          ></div>
        </div>
      );
    } 
  }


AllStateList.propTypes = {
  classes: PropTypes.object.isRequired
};


export default AllStateList;

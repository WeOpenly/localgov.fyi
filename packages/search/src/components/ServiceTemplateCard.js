import React, {Component} from "react";
import {connect} from "react-redux";

import ParkingcitSvg from '../svgIcons/ParkingCitIl.js'
import ProptaxSvg from '../svgIcons/PropTaxIl.js'
import BusinessLic from '../svgIcons/businessLic.js'
import RecreationSvg from '../svgIcons/RecreationIl.js'
import Utilitybill from '../svgIcons/utbIl.js'
import Step1 from '../illus/Step1.js'
import Tax from '../illus/Tax.js';


import iconStyles from "./typicons.min.module.css";
import styles from "./spectre.min.module.css";


class ServiceTemplateCard extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const {classes, name, slug, compact} = this.props;
        let icon = null;
        let mobIcon = null;
        const lowerCaseName = name.toLowerCase();

        if (lowerCaseName.indexOf('tax') !== -1){
          icon = (<ProptaxSvg style={{ width: '64px', height: '64px' }} />);
          mobIcon = (<ProptaxSvg style={{ width: '48px', height: '48px'}} />)
        }else if(lowerCaseName.indexOf('parking') !== -1){
          icon = (<ParkingcitSvg style={{ width: '112px', height: '64px'  }}/>)
          mobIcon = (<ParkingcitSvg style={{ width: '56px', height: '32px' }} />)
        }else if(lowerCaseName.indexOf('license') !== -1){
          icon = (<BusinessLic style={{ width: '80px', height: '64px'  }} />)
          mobIcon = (<BusinessLic style={{ width: '48px', height: '48px' }} />)
        }else if(lowerCaseName.indexOf('utility') !== -1 || lowerCaseName.indexOf('water') !== -1){
          icon = (<Utilitybill style={{ width: '64px', height: '64px' }} />)
          mobIcon = (<Utilitybill style={{ width: '48px', height: '48px'}} />)
        } else if (lowerCaseName.indexOf('unemployment') !== -1) {
          icon = (<RecreationSvg style={{ width: '78px', height: '64px'  }} />)
          mobIcon = (<RecreationSvg style={{ width: '48px', height: '32px' }} />)
        } else if (lowerCaseName.indexOf('vote') !== -1) {
          icon = (<RecreationSvg style={{ width: '78px', height: '64px'  }} />)
          mobIcon = (<RecreationSvg style={{ width: '48px', height: '32px' }} />)
        } else if (lowerCaseName.indexOf('traffic') !== -1) {
          icon = (<Tax style={{ width: '78px', height: '64px'  }} />)
          mobIcon = (<Tax style={{ width: '48px', height: '32px' }} />)
        }     
    
   
        if (this.props.isMobile){
            return (
              <a
                style={{
                  cursor: "pointer",
                  width: "300px",
                  background: "#fff",
                  color: "#3a4251",
                  marginLeft: "16px",
                  marginRight: "16px",
                  padding: "1rem 1rem",
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: ".8rem",
                  boxShadow:
                    "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)",
                  "&::hover": {
                    boxShadow: "none"
                  },
                  textDecoration: "none"
                }}
                href={`/services/${slug}`}
              >
                <div style={{ width: "64px", height: "48px" }}>{mobIcon}</div>

                <div>
                  <h5>{name}</h5>
                </div>
              </a>
            );
        } else {
            return (
              <a
                style={{
                  cursor: "pointer",
                  width: "300px",
                  background: "#fff",
                  color: "#3a4251",
                  marginLeft: "16px",
                  marginRight: "16px",
                  padding: "1rem 1rem",
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: ".8rem",
                  boxShadow:
                    "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)",
                  "&::hover": {
                    boxShadow: "none"
                  },
                  textDecoration: "none"
                }}
                href={`/services/${slug}`}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexGrow: "0",
                      flexShrink: "0",
                      background: "#fff",
                      padding: "0.2rem",
                      
                      flex: "20",
                      borderRadius: "0.5rem",
                      marginRight: "1rem",
                      borderRadius: ".8rem",
                
                    }}
                  >
                    <div style={{ width: "64px", height: "64px", overflow: 'hidden' }}>
                    {icon}
                    </div>
                  </div>
                </div>

                <div className={styles.textLeft}>
                  <h5>{name}</h5>
                </div>
              </a>
            );
        }

        
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(ServiceTemplateCard);

import React, {Component, Fragment} from "react";
import {connect} from "react-redux";


import SvgAddloc from '../../svgIcons/addLoc.js';

import styles from "../spectre.min.module.css";
import specIconStyles from "../spectre-icons.min.module.css";

import {navigate} from "@reach/router";


import {trackClick} from "../../components/common/tracking";

class LocationCard extends Component {
    constructor(props) {
        super(props);

        this.openDialog = this.openDialog.bind(this);
    }

    openDialog(){
        navigate(`/locations/?show_add_loc=true`);
    }
    
    render() {
        const {classes, compact, message, prompt} = this.props;
        let icon = null;
        let mobIcon = null;

        icon = (
          <span
            style={{ fontSize: "48px" }}
            className={`${styles.formIcon} ${specIconStyles.icon} ${specIconStyles.iconLocation}`}
          />
        );
        mobIcon = (
          <span
            style={{ fontSize: "32px" }}
            className={`${styles.formIcon} ${specIconStyles.icon} ${specIconStyles.iconLocation}`}
          />
        );

     
        
        return (
          <div
            style={{
              width: "340px",
              background: "#fff",
              color: "#3a4251",
              marginLeft: "16px",
              marginRight: "16px",
              padding: "1rem 1rem",
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              borderRadius: ".8rem",
              boxShadow: "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)",
              "&::hover": {
                boxShadow: "none"
              },
              textDecoration: "none"
            }}
          >
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
              <div style={{ width: "56px", height: "56px" }}>{icon}</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                flex: "80"
              }}
            >
              <div className={styles.textBold}>
                <h6>
                  {" "}
                  {!message ? `Not seeing what you are looking for?` : message}
                </h6>
              </div>
              <div className={styles.textSmall}>
                {" "}
                {!prompt ? `Let us know what's missing` : prompt}
              </div>
              <div
                style={{
                  marginTop: "1rem"
                }}
              >
                <button
                  size="small"
                  className={`${styles.btn} ${styles.btnSecondary}  ${styles.btnSm}`}
                  onClick={this.openDialog}
                  color="primary"
                >
                  Add it now
                </button>
              </div>
            </div>
          </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

const ConnLocationCard = connect(mapStateToProps, mapDispatchToProps)(LocationCard);

export default ConnLocationCard;
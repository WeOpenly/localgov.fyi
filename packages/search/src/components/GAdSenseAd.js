import React, { Component } from "react";

import specStyles from "./spectre.min.module.css";
import iconStyles from "./typicons.min.module.css";


const windowGlobal = typeof window !== "undefined" && window;

class AdSense extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { slotId, format, fwr } = this.props;

    if (windowGlobal) {
      ((d, s, id) => {
        const element = d.getElementById(s);
        let js = element;

        js = d.createElement("script");
        js.id = id;
   
        js.innerHTML = ` try{window.adsbygoogle.push(function() {
            window.adsbygoogle.loadTag("${slotId}", "${format}", "${slotId}");
          });}catch(err){console.log(err, 'err media')}`;
        element.appendChild(js);
        
      })(document, slotId, "google-ads-sdk");
    }
  }

  render() {
    // if (process.env.PROJECT_ID !== "evergov-prod") {
    //   return null;
    // }

    const {containerStyles} = this.props;


    return (
      <>
        <a
          className={specStyles.textGray}
          target="_blank"
          href="/ads"
        >
          <small style={{ fontSize: "10px" }}>AD</small>
          <span
            style={{ fontSize: "10px" }}
            className={`${iconStyles.typcn}  ${iconStyles.typcnSpanner}`}
          />
        </a>
        <div
          id={this.props.slotId}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            ...containerStyles
          }}
        ></div>
        <a
          className={specStyles.textGray}
          target="_blank"
          href="/ads"
        >
          <small style={{ fontSize: "10px" }}>AD</small>
          <span
            style={{ fontSize: "10px" }}
            className={`${iconStyles.typcn}  ${iconStyles.typcnSpanner}`}
          />
        </a>
      </>
    );
  }
}

export default AdSense;

import React, { Component } from "react";

import specStyles from "./spectre.min.module.css";
import iconStyles from "./typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;
const externalJs = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

class GoogleAds extends Component {
  componentDidMount() {
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;

      js = d.createElement(s);
      js.id = id;
      js.src = externalJs;
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, "script", "google-ads-sdk", () => {
      (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-5346641393976802"
      });
    });
  }

  render() {

    //if (process.env.PROJECT_ID !== "evergov-prod") {
    //  return null;
    //}
    
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
         <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5346641393976802"
        data-ad-slot={this.props.slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        ></ins>
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

export default GoogleAds;

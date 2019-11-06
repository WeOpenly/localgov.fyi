import React, { Component } from "react";
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
        google_ad_client: "ca-pub-4004032613131364"
      });
    });
  }

  render() {

    if (process.env.PROJECT_ID !== "evergov-prod") {
      return null;
    }

    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4004032613131364"
        data-ad-slot={this.props.slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    );
  }
}

export default GoogleAds;

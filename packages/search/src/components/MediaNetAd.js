import React, { Component } from "react";

import specStyles from "./spectre.min.module.css";
import iconStyles from "./typicons.min.module.css";


const windowGlobal = typeof window !== "undefined" && window;

class MediaNet extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { slotId, dims } = this.props;

    if (windowGlobal) {
      ((d, s, id) => {
        const element = d.getElementById(s);
        let js = element;

        js = d.createElement("script");
        js.id = id;
   
        js.innerHTML = ` try{window._mNHandle.queue.push(function() {
            window._mNDetails.loadTag("${slotId}", "${dims}", "${slotId}");
          });}catch(err){console.log(err, 'err media')}`;
        element.appendChild(js);
        
      })(document, slotId, "media-ads-sdk");
    }
  }

  render() {
    // if (process.env.PROJECT_ID !== "evergov-prod") {
    //   return null;
    // }

    const {containerStyles} = this.props;


    return (
  <>
      <div
             id={this.props.slotId}
             style={{ display: "block", width: "100%", height: "100%", ...containerStyles }}
           >

           </div>
           <div className={specStyles.textGray}>
             <small>ADVERTISEMENT</small>
             <span
               style={{ fontSize: "12px" }}
               className={`${iconStyles.typcn}  ${iconStyles.typcnSpanner}`}
             />
           </div>
         </>
    );
  }
}

export default MediaNet;

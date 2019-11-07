import React, { Component } from "react";
const windowGlobal = typeof window !== "undefined" && window;


class MediaNet extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { slotId, dims } = this.props;

    if (windowGlobal && this.element) {
      ((d, s, id) => {
        const fjs = this.element;

        const js = d.createElement(s);
        js.id = id;
        js.type = "text/javascript";
        js.innerHTML = `try {
          console.log("_mNHandle");
          window._mNHandle.queue.push(function() {
            window._mNDetails.loadTag(${slotId}, ${dims}, ${slotId});
          });
        } catch (error) {
          console.log(error, "err medianet")
        }`;
        fjs.appendChild(js);
 
      })(document, "script", "media-net-ads");
    }
  }

  render() {
    if (process.env.PROJECT_ID !== "evergov-prod") {
      return null;
    }

    return (
      <div
        id={this.props.slotId}
        ref={el => (this.element = el)}
        className="adsbymedoanet"
        style={{ display: "block" }}
      ></div>
    );
  }
}

export default MediaNet;

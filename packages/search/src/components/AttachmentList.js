import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";


import Attachment from "./Attachment";

const windowGlobal = typeof window !== "undefined" ? window : null;



class AttachmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMob: false,
    };
  }

  render() {
    const { attMap } = this.props;
    const attachmenComponents = [];


    for (let key of Object.keys(attMap)) {
      let collection = attMap[key];

      let collectionComponents = collection.map((c, idx) => {
        return (
          <Attachment key={`att-${idx}`} url={c.url} name={c.name} description={c.description} />
        );
      });

      attachmenComponents.push(
        <div id={key} key={key}>
          <h3 style={{ margin: "2rem 0" }}>{key}</h3>
          <div
            key={`container-${key}`}
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap"
            }}
          >
            {collectionComponents}
          </div>
        </div>
      );
    }

    return <Fragment>{attachmenComponents}</Fragment>;
  }
}

export default AttachmentList;

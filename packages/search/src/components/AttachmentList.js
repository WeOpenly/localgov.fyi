import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import ContentLoader from "react-content-loader";
import Attachment from "./Attachment";

const windowGlobal = typeof window !== "undefined" ? window : null;

const styles = theme => ({
  serviceDetailStepNumber: {
    margin: theme.spacing.unit,
    fontWeight: 700
  },
  ser_detail_tab_item: {
    display: "flex",
    margin: `0 ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit}px`
  },
  set_list_link_anchor: {
    textDecoration: "none",
    color: "#5627FF",
    position: "relative",
    "&:hover::after": {
      content: '""',
      position: "absolute",
      bottom: "-9px",
      left: 0,
      height: "4px",
      width: "100%",
      background: `linear-gradient(bottom, #AB93FF 0%, #5627FF 35%,transparent 60%, transparent 100%)`
    },
    "@media only screen and (max-width: 768px)": {
      "&:hover": {
        color: "#fff",
        background: theme.palette.primary["700"]
      }
    }
  },
  ser_detail_cardContent: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 4}px ${theme.spacing.unit}px`
  },
  ser_detail_tab_container_mob: {
    display: "flex",
    marginTop: theme.spacing.unit * 2,
    position: "relative",
    justifyContent: "center"
  },
  ser_detail_tab_container: {
    display: "flex",
    marginTop: theme.spacing.unit * 2,
    position: "relative"
  },
  ser_detail_dummyfaq: {
    display: "flex",
    height: 300,
    justifyContent: "center",
    alignItems: "center"
  },
  ser_detail_dummyfaq_details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

const Tabloader = () => (
  <ContentLoader
    height={475}
    width={800}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="14" y="7" rx="4" ry="4" width="100" height="13" />
    <rect x="14" y="47" rx="0" ry="0" width="606" height="92" />
    <rect x="16" y="213" rx="0" ry="0" width="576" height="50" />
    <rect x="16" y="179" rx="4" ry="4" width="429" height="16" />
    <rect x="131" y="7" rx="4" ry="4" width="100" height="13" />
  </ContentLoader>
);

const RawHTML = ({ children, className = "" }) => (
  <div
    itemProp="text"
    style={{ padding: 0, margin: 0, color: "rgba(30, 30, 50,0.87)" }}
    dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, " ") }}
  />
);

class AttachmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      isMob: false,
      tabContent: [],
      tabs: []
    };
  }

  handleChange = (event, value) => {
    this.setState({ currentTab: value });
  };

  render() {
    const { attachments } = this.props;

    const attMap = {};
    const attachmenComponents = [];

    attachments.forEach(item => {
      const key = item.group;
      const collection = attMap[key];
      if (!collection) {
        attMap[key] =  [item];
      } else {
        collection.push(item);
      }
    });

    for (let key of Object.keys(attMap)) {
      let collection = attMap[key];

      let collectionComponents = collection.map((c, idx) => {
        return (
          <Attachment url={c.url} name={c.name} description={c.description} />
        );
      });

      attachmenComponents.push(
        <div>
          <h4>{key}</h4>
          <div style={{marginTop: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>{collectionComponents}</div>
        </div>
      );
    }

    

    return <Fragment>{attachmenComponents}</Fragment>;
  }
}

export default AttachmentList;

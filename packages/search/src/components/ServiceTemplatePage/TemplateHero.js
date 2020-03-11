import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import TemplateViews from './TemplateViews';

import GoogAutoComplete from "./GoogAutoComplete";

import styles from "../spectre.min.module.css";


const RawHTML = ({ children, className = "" }) => (
  <div
    style={{ fontSize: "1rem", letterSpacing: "0.002em", lineHeight: "1.4" }}
    erouslySetInnerHTML={{
      __html: children
    }}
  />
);


class TemplateHero extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
          hieLinks,
          classes,
          service_name,
          service_glossary_description,
          trackClick,
          views,
          orgsCnt,
          icon,
          id
        } = this.props;

        return (
          <>
            <div className={`${styles.columns} ${styles.hideMd}`}>
              <div
                className={`${styles.column} ${styles.col12} ${styles.textLeft}`}
              >
                {hieLinks}
              </div>
              <div
                className={`${styles.column} ${styles.col9} ${styles.textLeft}`}
              >
                <div>
                  <h1>{service_name} </h1>
                </div>

                <TemplateViews views={views} orgsCnt={orgsCnt} />
                <div>
                  <p>
                    <RawHTML>{service_glossary_description}</RawHTML>
                  </p>
                </div>
                <div
                  style={{
                    maxWidth: "500px",
                    marginTop: "2rem",
                    marginBottom: "1rem"
                  }}
                >
                  <GoogAutoComplete serviceTemplateId={id} />
                </div>
              </div>
              <div
                className={`${styles.column} ${styles.col3} ${styles.textRight}`}
                style={{ overflow: "hidden" }}
              >
                {icon}
              </div>
            </div>
            <div className={`${styles.columns} ${styles.showMd}`}>
              <div
                className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
              >
                <h1>{service_name} </h1>
              </div>
              <div
                className={`${styles.column} ${styles.col12} ${styles.textLeft}`}
              >
                <TemplateViews views={views} orgsCnt={orgsCnt} />
              </div>

              <div
                className={`${styles.column} ${styles.col12} ${styles.textLeft}`}
              >
                <GoogAutoComplete serviceTemplateId={id} />
              </div>
            </div>
          </>
        );
    }
}

export default TemplateHero;

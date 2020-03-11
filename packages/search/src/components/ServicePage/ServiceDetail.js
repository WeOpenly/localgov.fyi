import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";

import { connect } from "react-redux";

import specStyles from "../spectre.min.module.css";

const windowGlobal = typeof window !== "undefined" ? window : null;


const RawHTML = ({ children, className = "" }) => (
  <div
    itemProp="text"
    style={{ fontSize: "1rem", letterSpacing: "0.002em", lineHeight: "1.4" }}
    dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, " ") }}
  />
);

class ServiceDetailBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      name,
      orgHieSlug,
      description,
      price,
      serAtts,
      alltimings,
      allForms,
      allfaq,
      allSteps
    } = this.props;

    let stepList = null;
    if (allSteps.length > 0) {
      stepList = allSteps.map((step, index) => {
        const { description } = step;
        const text = <RawHTML>{description}</RawHTML>;
        return (
          <li>
            <p>{text}</p>
          </li>
        );
      });
    }

    let formList = null;
    if (allForms.length > 0) {
      formList = allForms.map((form, index) => {
        const { name, url, price } = form;
        return (
          <div button disableGutters>
            <a
              primary={name}
              onClick={() => {
                if (url) {
                  windowGlobal.open(url, "_blank");
                }
              }}
              secondary={price}
           
            />
          </div>
        );
      });
    }

    let qaList = null;
    if (allfaq.length > 0) {
      qaList = allfaq.map((qa, index) => {
        const { answer, question } = qa;
        const text = (
          <RawHTML
          >
            {answer}
          </RawHTML>
        );

        return (
          <Fragment>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "1rem 0.2rem 0.2rem 0.2rem"
              }}
              disableGutters
            >
              <div
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h4 itemProp="name">{question}</h4>
                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  style={{ margin: "1rem 0.3rem" }}
                >
                  {text}
                </div>
              </div>
            </div>
            {index !== allfaq.length - 1 ? (
              <div className={specStyles.divider} />
            ) : null}
          </Fragment>
        );
      });
    }

    let desc = (
      <Fragment>
        <div>
          <p>
            {name} in the {orgHieSlug} using this service
          </p>
        </div>
      </Fragment>
    );
    if (description) {
      desc = (
        <Fragment>
          <div id={`about`}>
            <p style={{ fontSize: "1rem", letterSpacing: '0.002em', lineHeight: '1.4' }}>
              <RawHTML>{description}</RawHTML>
            </p>
          </div>
        </Fragment>
      );
    }

    return (
      <>
        <div style={{ margin: "2rem 0rem" }}>{desc}</div>
        {qaList ? (
          <div style={{ margin: "4rem 0rem" }}>
            <h3 style={{ margin: "2rem 0" }}>FAQs</h3>
            <p id={`faqs`}>{qaList}</p>
          </div>
        ) : null}
        {stepList ? (
          <div style={{ margin: "4rem 0rem" }}>
            <h3 style={{ margin: "2rem 0" }}>Steps</h3>
            <ol>{stepList}</ol>
          </div>
        ) : null}
        {serAtts ? serAtts : null}

        {formList ? (
          <Fragment>
            <h3 style={{ margin: "2rem 0" }}>Forms</h3>
            <p id={`forms`}>{formList}</p>
          </Fragment>
        ) : null}
      </>
    );
  }
}


export default ServiceDetailBody;

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";

import { connect } from "react-redux";

import specStyles from "../spectre.min.module.css";
import GoogleAds from "../GoogleAds";
import ServiceCard from "../ServiceCard";

const windowGlobal = typeof window !== "undefined" ? window : null;


const RawHTML = ({ children, className = "" }) => (
  <div
    itemProp="text"
    style={{ fontSize: "1rem", letterSpacing: "0.002em", lineHeight: "1.4" }}
    dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, " ") }}
  />
);

class ServiceFAQDetailBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      classes,
      name,
      orgHieSlug,
      description,
      price,
      serAtts,
      alltimings,
      allForms,
      allfaq,
      allSteps,
      isMobile,
      toLink,
      deliveryLink,
      org_name
    } = this.props;

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
               <hr class="thin"></hr>
            ) : null}
          </Fragment>
        );

      });
    
    }    

    return (
      <>
        {qaList ? (
          <div style={{ margin: "0rem 0rem" }}>
            <br></br>
            <p id={`faqs`}>{qaList}</p>
            <hr class="thin"></hr>
          </div>
          ) : null
        }
      </>
    );
  }
}


export default ServiceFAQDetailBody;

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;

const FaqItem = props => (
  <Fragment>
    <div className={styles.accordion} >
      <input type="checkbox" id={props.name} name={props.name} hidden />
      <label className={styles.accordionHeader} for={props.name}>
        <h6 className={styles.textGray}>
          {" "}
          {props.header}
          <span
            className={`${iconStyles.typcn} ${iconStyles.typcnChevronRight}`}
          />
        </h6>
      
      </label>
      <div className={styles.accordionBody}>
        <p style={{padding: '0.5rem 1rem'}}>
          {props.description}
          </p></div>
    </div>

    <div className={styles.divider} />
  </Fragment>
);

class ServiceFaq extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { faqs, serviceId } = this.props;
    if (!faqs){
      return null
    }

    const faqComps = faqs.map((faq, idx) => {
      return <FaqItem header={faq.header} name={`${serviceId}-${idx}`} description={faq.description} />;
    });

    return (
      <div
        className={styles.card}
        style={{
          border: "1px solid rgba(86, 39, 255, .2)",
          background: "#fff",
          padding: "0.5rem",
          marginBottom: '0.5rem',
          marginTop: '3.2rem',
          borderRadius: "0.3rem",
          boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
        }}
      >
        {faqComps}
      </div>
    );
  }
}

export default ServiceFaq;

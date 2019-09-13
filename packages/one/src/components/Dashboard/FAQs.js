import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

const FaqItem = props => (
  <Fragment>
    <div className={styles.accordion}>
      <input type="checkbox" id={props.name} name={props.name} hidden />
      <label className={styles.accordionHeader} for={props.name}>
        <h5>
          {" "}
          {props.header}
          <span
            className={`${iconStyles.typcn} ${iconStyles.typcnChevronRight}`}
          />
        </h5>
      </label>
      <div className={styles.accordionBody}>
        <div
          style={{ padding: "0.5rem 0.5rem" }}
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></div>
      </div>
    </div>

    <div className={styles.divider} />
  </Fragment>
);

class FAQs extends Component {
  constructor(props) {
    super(props);
  }

 
  render() {

  const faqs = [
    {
      q: "Can you handle other services what were listed here?",
      a:
        "<p>Yes. If it’s not in the list above, you can reach out to us once you create your account using the support option in your dashboard.</p>"
    },
    {
      q: "Do I need to connect my bank account?",
      a:
        "<p>We offer different payment options including credit card payment & different transfer by linking your account. You can choose what suits your case best.</p>"
    },
    {
      q: "Can you help me with single payments for things like tickets?",
      a:
        "<p>Sure, try out lightning fast payment service <a href='https://pay.evergov.com'>here</a></p>"
    },
    {
      q: "How can I contact the support team if I have more questions?",
      a:
        "<p>Please drop us a line <a href='mailto:team@evergov.com'>here</a>   with more details about your question & one of our team members will respond in a day or two.</p>"
    }
  ];
      const faqComps = faqs.map((faq, idx) => {
        return (
          <FaqItem
            header={faq.q}
            name={`home-faq-${idx}`}
            description={faq.a}
          />
        );
      });

    return (
      <div
        className={`${styles.columns}`}
        style={{
          margin: "0rem 0 1rem 0",
          padding: "0.5rem 0.5rem"
        }}
      >
        <div
          className={`${styles.column} ${styles.col8}`}
          style={{ margin: "3rem 0 1rem 1rem" }}
        >
          <h2 className={` ${styles.textLeft}`}>FAQs</h2>
          <div className={styles.divider} />
        </div>
        <div className={`${styles.column} ${styles.col4}`} />
        <div className={`${styles.column} ${styles.col2} ${styles.hideXs}`} />
        <div
          className={`${styles.column} ${styles.col8} ${styles.colXs12} ${styles.textLeft}`}
        >
          {faqComps}
        </div>

        <div className={`${styles.column} ${styles.col2} ${styles.hideXs}`} />
      </div>
    );
  }
}

export default FAQs

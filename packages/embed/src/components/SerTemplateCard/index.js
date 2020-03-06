import React, { Component, Fragment } from "react";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
const windowGlobal = typeof window !== "undefined" && window;
const windowLocation = windowGlobal.location ? windowGlobal.location : {};

const RawHTML = ({ children, className = "" }) => (
  <div
    className={className}
    style={{ padding: 0, margin: 0 }}
    dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, " ") }}
  />
);

class SerTemplateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      defaultDesc: ''
    }
  }

  componentDidMount(){
    const { name, slug, desc } = this.props;
    this.setState({
      isMounted: true,
      defaultDesc: `<p>Learn more about <b>${name} </b> at <a href="${process.env.GATSBY_CANONICAL_DOMAIN}/services/${slug}">papergov.com</a></p>`
    })
  }

  render() {
    const { name, slug, desc } = this.props;

    if (!this.state.isMounted){
      return null
    }

    console.log(this.props, this.state);

    return (
      <div
        className={`${styles.card} ${styles.textLeft}`}
        style={{
          border: "none",
          background: "#fff",
          minHeight: "120px",
          padding: "0rem"
        }}
      >
        <div className={styles.cardHeader} style={{ marginLeft: "0.1rem" }}>
          <h3 className={`${styles.cardTitle}`}>{name}</h3>
        </div>
        <div className={styles.cardBody}>
          <RawHTML
            style={{ lineHeight: "1.1rem" }}
            className={`${styles.cardSubtitle}`}
          >
            {desc ? desc : this.state.defaultDesc}
          </RawHTML>
        </div>
        <div
          className={styles.cardFooter}
          style={{
            display: "flex",

            justifyContent: "right"
          }}
        >
          <a
            href={`${process.env.GATSBY_CANONICAL_DOMAIN}/services/${slug}`}
            target="_blank"
            style={{ color: "#5627ff", margin: "0 0.5rem" }}
            className={`${styles.btn}`}
          >
            Learn More
          </a>
        </div>
      </div>
    );
  }
}

export default SerTemplateCard;

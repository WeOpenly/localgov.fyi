import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from "gatsby";
import { connect } from "react-redux";
import Link from "gatsby-link";
import Img from "gatsby-image";

import LandingCard from "./LandingCard";

import AboutSVG from "../AboutSvgComp";
import Step3 from "../Step3";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;

const HeroIl = props => (
  <StaticQuery
    query={graphql`
      query heroIl8Query {
        heroIl: allFile(filter: { relativePath: { eq: "STEP2.png" } }) {
          edges {
            node {
              name
              childImageSharp {
                fluid(
                  traceSVG: {
                    color: "#f0d3fe"
                    turnPolicy: TURNPOLICY_MINORITY
                    blackOnWhite: true
                  }
                ) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <Img
          title={`papergov`}
          alt={`illustration of papergov`}
          style={props.style}
          fluid={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    this.changeEmail = this.changeEmail.bind(this);
  }

  changeEmail(ev) {
    this.setState({
      email: ev.target.value
    });
  }

  render() {
    const { title, name, uploadable, isMobile, isAllSer } = this.props;
    let uploadStr = "bills or tickets";
    if (uploadable) {
      uploadStr = uploadable;
    }

    let heroComps = (
      <Fragment>
        <div
          className={`${styles.column} ${styles.col12}`}
          style={{ margin: "1.5rem 0 1rem 0" }}
        >
          <h2 style={{ margin: "1rem 0" }} className={`${styles.textCenter}`}>
            {" "}
            ⚡ {title}
          </h2>
        </div>

        <div className={`${styles.column} ${styles.col1}`}></div>
        <div className={`${styles.column} ${styles.col10}`}>
          <div
            className={`${styles.columns}`}
            style={{ margin: "2rem 0 2rem 0" }}
          >
            <div
              className={`${styles.column} ${styles.colSm4} ${styles.colXs12}`}
            >
              <LandingCard
                icon={<AboutSVG style={{ width: "120px", height: "120px" }} />}
                heading={`Upload your ${uploadStr}`}
              />
            </div>

            <div
              className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
            >
              <LandingCard
                icon={<HeroIl style={{ width: "120px", height: "120px" }} />}
                heading={"Check your details & pay securely"}
              />
            </div>

            <div
              className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
            >
              <LandingCard
                icon={<Step3 style={{ width: "120px", height: "120px" }} />}
                heading={
                  "You can rest, while we take care of cumbersome processes"
                }
              />
            </div>
          </div>
        </div>
      </Fragment>
    );

    if (isAllSer && !isMobile) {
      heroComps = (
        <div
          className={`${styles.column} ${styles.col12}`}
          style={{ margin: "1.5rem 0 1rem 0" }}
        >
          <h2 style={{ margin: "1rem 0" }} className={`${styles.textCenter}`}>
            {" "}
            ⚡ {title}
          </h2>
        </div>
      );
    }

    if (isMobile) {
      heroComps = (
        <Fragment>
          {" "}
          <div
            className={`${styles.column} ${styles.col12}`}
            style={{ margin: "1.5rem 0 0rem 0" }}
          >
            <h4 style={{ margin: "8px 0" }} className={`${styles.textCenter}`}>
              {" "}
              ⚡ {title}
            </h4>
          </div>
          <div
            className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
            style={{ margin: "1rem 0 0 0 " }}
          >
            <div className={`${styles.columns}`} style={{ margin: "0 0 0 0" }}>
              <div
                className={`${styles.column} ${styles.colSm4} ${styles.colXs12}`}
              >
                <LandingCard
                  icon={
                    <AboutSVG style={{ width: "120px", height: "120px" }} />
                  }
                  heading={`Snap your ${uploadStr}`}
                />
              </div>

              <div
                className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
              >
                <LandingCard
                  icon={<HeroIl style={{ width: "120px", height: "120px" }} />}
                  heading={"Check your details & pay securely"}
                />
              </div>

              <div
                className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
              >
                <LandingCard
                  icon={<Step3 style={{ width: "120px", height: "120px" }} />}
                  heading={
                    "You can rest, while we take care of cumbersome processes"
                  }
                />
              </div>
            </div>
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
      

        <div className={styles.columns}>{heroComps}</div>
      </Fragment>
    );
  }
}

export default Hero;

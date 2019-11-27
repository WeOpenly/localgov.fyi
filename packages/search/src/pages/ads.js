import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";

import Footer from "../components/FooterNew";
import Link from "gatsby-link";

import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;

const AdPic = () => (
  <StaticQuery
    query={graphql`
      query AdPicQuery {
        heroIl: allFile(filter: { relativePath: { eq: "indexhero.png" } }) {
          edges {
            node {
              name
              childImageSharp {
                fluid {
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
          style={{ width: "320px", height: "320px" }}
          fluid={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);



class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{`Ads | papergov`}</title>
        </Helmet>
        <div className={`${styles.container} ${styles.gridXl}`}>
          <div className={styles.columns}>
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col10}`}>
              <header className={styles.navbar}>
                <section
                  style={{ padding: "0.5rem" }}
                  className={styles.navbarSection}
                >
                  <Link to="/">
                    <a href="#" style={{ textDecoration: "none" }}>
                      <h3>papergov</h3>
                    </a>
                  </Link>
                </section>

                <section className={styles.navbarSection}>
                  <Link to="/terms" style={{ padding: "0.5rem" }}>
                    Terms
                  </Link>
                  <Link to="/privacy" style={{ padding: "0.5rem" }}>
                    Privacy
                  </Link>
                </section>
              </header>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>

          <div
            className={`${styles.columns}`}
            style={{
              margin: "2rem 0 4rem 0",
              padding: "2.5rem 0.5rem"
            }}
          >
            <div
              className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
            />
            <div
              className={`${styles.column} ${styles.col6} ${styles.colXs12} ${styles.textLeft}`}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <div>
                  <h2>Why we run ads?</h2>
                </div>
                <div style={{ padding: "1rem 0.2rem 0.5rem 0.2rem" }}>
                  <p style={{ lineHeight: "1.1rem" }}>
                    Our mission at <b>Papergov</b> is to let anyone discover and
                    act on government services seamlessly. <br />
                    <br />
                    Being a tiny team, we are trying to figure out ways to
                    sustain to make the most impact & to catalyze the movement
                    of making government interactions accessible for all. <br />
                    <br />
                    Ads are on one of the avenues to keep our search engine
                    serving all the relevant information about any local
                    government service for <b>free</b>. <br />
                    <br />
                    We are well aware that ads might turn you off but we are
                    doing our best to make them less annoying. We would love to{" "}
                    <a href="mailto:team@papergov.com">here</a> from you if you
                    have any better ways to approach this.
                    <br /> <br />
                    P.S: We are also testing other monetization models with{" "}
                    <a href="https://pay.papergov.com" target="_blank">
                      Pay
                    </a>{" "}
                    and{" "}
                    <a href="https://one.papergov.com" target="_blank">
                      One
                    </a>{" "}
                    to deliver you an ad-free experience soon.
                  </p>
                </div>
                <div>
                  <a
                    className={styles.btn}
                    href="https://www.patreon.com/bePatron?u=26302926"
                    data-patreon-widget-type="become-patron-button"
                  >
                    Help us get to an ad-free Papergov faster
                  </a>
                  <script
                    async
                    src="https://c6.patreon.com/becomePatronButton.bundle.js"
                  ></script>
                </div>
              </div>
            </div>
            <div
              className={`${styles.column} ${styles.hideXs} ${styles.col4} ${styles.colXs12} ${styles.textCenter}`}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <div>
                  <AdPic />
                </div>
              </div>
            </div>

            <div
              className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
            />
          </div>

          <div className={styles.columns} style={{ marginTop: "1rem" }}>
            <div className={`${styles.column} ${styles.col12}`}>
              <Footer isMobile={true} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default About;

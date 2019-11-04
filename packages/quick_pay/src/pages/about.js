import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";

import Footer from "../components/FooterNew";
import Link from "gatsby-link";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import Step1 from "../illus/Step1.js";
import Step2 from "../illus/Step2.js";

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;

const HeroIl = () => (
  <StaticQuery
    query={graphql`
      query heroIl10Query {
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

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{`About | papergov`}</title>
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
            className={`${styles.columns}  ${styles.textCenter}`}
            style={{ margin: "6rem 0 0 0" }}
          >
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col10}}`}>
              <h2>
                We’re building the new generation of <br /> consumer-friendly{" "}
                <br />
                government services.
              </h2>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>
          <div
            className={`${styles.columns}  ${styles.textCenter}`}
            style={{ margin: "0px" }}
          >
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              className={`${styles.column} ${styles.col10}`}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <HeroIl />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>{" "}
          <div
            className={`${styles.columns}  ${styles.textCenter}`}
            style={{ margin: "4rem 0 0 0" }}
          >
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col10}}`}>
              <h4>
                We believe that access to government services should be <br />
                simple and transparent & we are trying to do our part to
                <br />
                catalyze that movement. <br />
              </h4>
              <br />
              <h5 className={styles.textGray}>We do this in two ways:</h5>
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
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
            <div
              className={`${styles.column} ${styles.col4} ${styles.colXs12} ${styles.textCenter}`}
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
                  <Step1 />
                </div>
                <div>
                  <h5>Discovery</h5>
                </div>
                <div style={{ padding: "0.5rem 2rem" }}>
                  <p>
                    Find any service & all the related info instantly with a
                    single search.
                  </p>
                </div>
                <div>
                  <a
                    href="https://papergov.com"
                    target="_blank"
                    className={`${styles.btn} ${styles.btnLink}`}
                  >
                    Try papergov Search
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.dividerVert}></div>
            <div
              className={`${styles.column} ${styles.col4} ${styles.colXs12} ${styles.textCenter}`}
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
                  <Step2 />
                </div>
                <div>
                  <h5>Delivery</h5>
                </div>
                <div style={{ padding: "0.5rem 2rem" }}>
                  <p>
                    Manage all government interactions with a single account
                    securely.
                  </p>
                </div>
                <div>
                  <a
                    href="https://pay.papergov.com"
                    target="_blank"
                    className={`${styles.btn} ${styles.btnLink}`}
                  >
                    Try papergov Pay
                  </a>
                  <a
                    href="https://one.papergov.com"
                    target="_blank"
                    className={`${styles.btn} ${styles.btnLink}`}
                  >
                    Try papergov One
                  </a>
                </div>
              </div>
            </div>
            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
          </div>
          <div
            className={`${styles.columns} `}
            style={{
              margin: "4rem 0 8rem 0",
              padding: "3rem 0 2rem 0",
              background: "#f7f8f9"
            }}
          >
            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
            <div
              className={`${styles.column} ${styles.col8} ${styles.colXs12} ${styles.textCenter}`}
            >
              <p>our progress so far ...</p>
            </div>

            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
            <div
              className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}
            >
              <div
                style={{ border: "none" }}
                className={`${styles.textCenter}`}
              >
                <h2 className={`${styles.cardTitle}`}>100,000 +</h2>
                <p>Users</p>
              </div>
            </div>
            <div
              className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}
            >
              <div
                style={{ border: "none" }}
                className={`${styles.textCenter}`}
              >
                <h2 className={`${styles.cardTitle}`}>2500 +</h2>
                <p>Services</p>
              </div>
            </div>
            <div
              className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}
            >
              <div
                style={{ border: "none" }}
                className={`${styles.textCenter}`}
              >
                <h2 className={`${styles.cardTitle}`}>1000 +</h2>
                <p>Agencies</p>
              </div>
            </div>
          </div>
          <div
            className={`${styles.columns}`}
            style={{
              margin: "2rem 0 8rem 0",
              padding: "2.5rem 0.5rem"
            }}
          >
            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
            <div
              className={`${styles.column} ${styles.col8} ${styles.colXs12} ${styles.textCenter}`}
            >
              <h5>
                We are a small team with a big vision & always all ears to
                improve.
              </h5>
              <br />
              <p>
                Drop us a line <a href="mailto:team@papergov.com">here</a> to
                chat.
              </p>
            </div>

            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
          </div>
          <div className={styles.columns} style={{ marginTop: "1rem" }}>
            <div className={`${styles.column} ${styles.col2}`} />
            <div className={`${styles.column} ${styles.col8}`}>
              <div className={styles.divider} />
              <Footer isMobile={true} />
            </div>
            <div className={`${styles.column} ${styles.col2}`} />
          </div>
        </div>
      </Fragment>
    );
  }
}



export default About;

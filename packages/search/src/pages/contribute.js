import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";

import Footer from "../components/FooterNew";
import Link from "gatsby-link";
import TextLoop from "react-text-loop";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import Step1 from '../illus/Step1.js'
import Step2 from '../illus/Step2.js'

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";
import ContributeTime from "../components/ContributeTime"

const windowGlobal = typeof window !== "undefined" && window;

const HeroIl = () => (
  <StaticQuery
    query={graphql`
      query heroIl3Query {
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
          style={{ width: "320px", height: '320px' }}
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

class Contribute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{`Contribute | papergov`}</title>
     

          <link rel="canonical" href={`https://papergov.com/contribute/`} />
          <meta
            property="og:title"
            content={`Contribute | papergov`}
          />
          <meta
            property="og:url"
            content={`https://papergov.com/contribute/`}
          />


            <meta
              name="description"
              content={`Help us build the next generation of consumer friendly government services`}
            />


          <meta
            property="og:description"
            content={`Help us build the next generation of consumer friendly government services`}
          />
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
                  <Link to="/locations" style={{ padding: "0.5rem" }}>
                    Locations
                  </Link>
                  <Link to="/services" style={{ padding: "0.5rem" }}>
                    Services
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
             <h3>
                We believe that access to government services should be <br />
                simple and transparent & we are trying to do our part to
                <br />
                catalyze that movement. <br />
             </h3>
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
            style={{ margin: "1rem 0 0 0" }}
          >
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col10}}`}>
              <h5>You can help us on our vision in these two ways:</h5>
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
                  <h5>Help with Content</h5>
                </div>
                <div style={{ padding: "0.5rem 2rem" }}>
                  <p>
                    Join our community to improve the listing of services & their relevant information on the site.
                  </p>
                </div>
                <div>
                   <ContributeTime buttonLabel="Sign me up"> </ContributeTime>
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
                  <h5> Help with a Tip </h5>
                </div>
                <div style={{ padding: "0.5rem 2rem" }}>
                  <p>
                    Help us reach more users and improve our directory by a small monetary contribution.
                  </p>
                </div>
                <div>
                  <a
                    className={styles.btn}
                    href="https://paypal.me/papergov"
                    color="primary"
                  >
                    Contribute Now!
                  </a>
                </div>
                
                
              </div>
            </div>

            <div className={styles.divider}></div>
            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
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
                Feel free to drop us a line <a href="mailto:team@papergov.com">here</a> if you want to contribute 
                in any other ways.
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


export default Contribute;

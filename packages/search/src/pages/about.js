import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";


import Footer from "../components/FooterNew";
import Link from "gatsby-link";
import TextLoop from "react-text-loop";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";


import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;

const HeroIl = () => (
  <StaticQuery
    query={graphql`
      query heroIl2Query {
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
          title={`evergov`}
          alt={`illustration of evergov`}
          style={{ width: "400px" }}
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

class OneHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Fragment>
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
                      <h3>evergov</h3>
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
            <div className={`${styles.column} ${styles.colXs10}}`}>
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
              className={`${styles.column} ${styles.colXs10}`}
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
            <div className={`${styles.column} ${styles.colXs10}}`}>
              <h5>
                We believe that access to government services should be simple
                and transparent & we are <br /> trying to do our part to
                catalyze that movement. <br />
              </h5>
              <br/>
              <h6 className={styles.textGray}>We do this in two ways:</h6>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>
          <div
            className={`${styles.columns}`}
            style={{
              margin: "4rem 0 4rem 0",
              padding: "2.5rem 0.5rem"
            }}
          >
            <div
              className={`${styles.column} ${styles.col3} ${styles.hideXs}`}
            />
            <div
              className={`${styles.column} ${styles.col3} ${styles.colXs12}`}
            >
              <div>
                <span className={`${styles.textGray}`}>
                  <i>As featured in</i>
                </span>
              </div>
              <div>
                <a
                  target="_blank"
                  href="https://www.govtech.com/gov-experience/EverGov-Wants-to-Make-Local-Government-Services-More-Searchable.html"
                >
                  discovery
                </a>
              </div>
            </div>
            <div
              className={`${styles.column} ${styles.col3} ${styles.colXs12}`}
            >
              <div>delivery</div>
            </div>
            <div
              className={`${styles.column} ${styles.col3} ${styles.hideXs}`}
            />
          </div>
          <div
            className={`${styles.columns}  ${styles.textCenter}`}
            style={{ margin: "6rem 0 2rem 0" }}
          >
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.colXs10}}`}>
              <h3>Get started in a few minutes</h3>
              <p>
                We cover a variety of the most popular recurring services you
                will need.
              </p>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>
          <div
            className={`${styles.columns} `}
            style={{ margin: "4rem 0 8rem 0", background: "#f7f8f9" }}
          >
            <div
              className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}
            >
              <div
                style={{ border: "none" }}
                className={`${styles.card} ${styles.textCenter}`}
              >
                <div className={styles.cardHeader}>
                  <h6 className={`${styles.cardTitle}`}>Create an account</h6>
                </div>
              </div>
            </div>
            <div
              className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}
            >
              <div
                style={{ border: "none" }}
                className={`${styles.card} ${styles.textCenter}`}
              >
                <div className={styles.cardHeader}>
                  <h6 className={`${styles.cardTitle}`}>
                    Add your service details <br /> & link your payment info
                  </h6>
                </div>
              </div>
            </div>
            <div
              className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}
            >
              <div
                style={{ border: "none" }}
                className={`${styles.card} ${styles.textCenter}`}
              >
                <div className={styles.cardHeader}>
                  <h6 className={`${styles.cardTitle}`}>Sit back & relax</h6>
                </div>
              </div>
            </div>
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

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.oneUser
  };
};

export default connect(mapStateToProps)(OneHome);

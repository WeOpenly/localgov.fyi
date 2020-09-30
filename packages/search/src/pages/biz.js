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
import FooterNew from "../components/FooterNew";
import SearchNav from "../components/Nav/Search";

const windowGlobal = typeof window !== "undefined" && window;

const AdvPic = () => (
  <StaticQuery
    query={graphql`
      query AdvPicQuery {
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



class Advertise extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{`Advertise | papergov`}</title>
        </Helmet>
        <div className={`${styles.container} ${styles.gridXl}`}>
          <div className={styles.columns}>
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col10}`}>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ background: "#fff" }}
            >
              <SearchNav />
            </div>
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
                <div style = {{color: "primary"}}>
                  <h2 color="primary">Papergov for Business</h2>
                </div>
                <div style={{ padding: "1rem 0.2rem 0.5rem 0.2rem" }}>

                  <h5> Papergov is the leading place to discover and act on local government services in the US. </h5>
                 
                  <p style={{ lineHeight: "1.1rem" }}>
                    <br />
                    With a wide reach across the 50 States and with 3400+ services, partner with us to super charge your business and 
                    reach out to the audience in your local communities. 
                    <br /> <br />
                  </p>
                </div>
                <div>
                  <a
                    className={styles.btn}
                    href="mailto:team@papergov.com"
                    color="primary"
                  >
                    Contact us
                  </a>
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
                  <AdvPic />
                </div>
              </div>
            </div>

            


            <div
              className={`${styles.column} ${styles.col1} ${styles.hideXs}`}
            />
          </div>

          <div className={styles.columns} style={{ marginTop: "1rem" }}>
            <div className={`${styles.column} ${styles.col12}`}>
              <FooterNew> </FooterNew>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Advertise;
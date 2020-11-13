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
import Step1 from '../illus/Step1.js'
import Step2 from '../illus/Step2.js'


const windowGlobal = typeof window !== "undefined" && window;

const AgencyPic = () => (
  <StaticQuery
    query={graphql`
      query AgencyPicQuery {
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



class Agency extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{`Agency | papergov`}</title>
        </Helmet>
          <div className={styles.columns}>


            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ background: "#fff" }}
            >
              <SearchNav />

            </div>

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
                 <div style = {{color: "#96a1ad"}}>
                   <br></br>
                   <br></br>
                   <h1 color="#96a1ad">Papergov for Public Agencies</h1>
                 </div>
                 <div style={{ padding: "1rem 0.2rem 0.5rem 0.2rem" },{color: "prima"}}>
                   <br></br>
                   <h4> Provide a simpler way for your residents to access all your services & their information and communicate with them seamlessly in a single place.
                   </h4>
                   <br></br>
                   <br></br>
                 </div>
                
                 <div>
                   <a
                    className={styles.btn}
                    href="mailto:team@papergov.com"
                    color="primary"
                   >
                     Contact us to get started
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
                  <AgencyPic />
                </div>
              </div>
            </div>

            <div
            className={`${styles.columns}`}
            style={{
              margin: "6rem 0 4rem 0",
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
                  <h4>Discovery</h4>
                </div>
                <div style={{ padding: "0.5rem 2rem" }}>
                  <p>
                    Residents can find all your services & related info in a
                    single place. You can provide instant updates about these services seamlessly. 
                  </p>
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
                  <h5>Community</h5>
                </div>
                <div style={{ padding: "0.5rem 2rem" }}>
                  <p>
                    Communicate directly with your residents on any queries/questions about the services and stay on top of any feedback all in one place. 
                  </p>
                </div>
              </div>
            </div>
          </div>
         </div>
         
         <div
            className={`${styles.columns} `}
            style={{
              margin: "3rem 0 4rem 0",
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
              <p>You are in good company!</p>
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
                <h2 className={`${styles.cardTitle}`}>500,000 +</h2>
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
                <h2 className={`${styles.cardTitle}`}>4000 +</h2>
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
                <h2 className={`${styles.cardTitle}`}>2500 +</h2>
                <p>Agencies</p>
              </div>
            </div>
          </div>

          <div
            className={`${styles.columns}`}
            style={{
              margin: "10rem 0 4rem 0",
              padding: "2.5rem 0.5rem"
            }}
          >
            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
            <div
              className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
            >
              <h3>
                Join us in providing the best government service experience 
                to your residents.
              </h3>
              <br />
              <div>
                   <a
                    className={styles.btn}
                    href="mailto:team@papergov.com"
                    color="primary"
                   >
                     Contact us to get started
                   </a>
                </div>
            
          </div>

          
          
        </div>

        <div className={`${styles.column} ${styles.col12}`}>
              <FooterNew> </FooterNew>
        </div>
      </Fragment>
      
    );
  }
}

export default Agency;
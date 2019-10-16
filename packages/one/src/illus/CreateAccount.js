import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const CreateAccount = () => (
  <StaticQuery
    query={graphql`
      query CreateAccountq {
        heroIl: allFile(filter: { relativePath: { eq: "STEP1.png" } }) {
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
          alt={`Create account`}
          style={{ width: "180px" }}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default CreateAccount;

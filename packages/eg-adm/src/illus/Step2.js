import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const Step2 = () => (
  <StaticQuery
    query={graphql`
      query Step2gq {
        heroIl: allFile(filter: { relativePath: { eq: "STEP2.png" } }) {
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
          alt={`Page Not Found`}
          style={{ width: "320px" }}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default Step2;

import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const Relax = () => (
  <StaticQuery
    query={graphql`
      query Relaxsq {
        heroIl: allFile(filter: { relativePath: { eq: "STEP3.png" } }) {
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
          alt={`Relax`}
          style={{ width: "180px" }}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default Relax;

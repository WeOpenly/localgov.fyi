import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const Safety = (style) => (
  <StaticQuery
    query={graphql`
      query Safetygq {
        heroIl: allFile(filter: { relativePath: { eq: "Safety.png" } }) {
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
          alt={`Safety`}
          style={{ width: "140px" }}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default Safety;

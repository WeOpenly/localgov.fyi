import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const AbbyPic = () => (
  <StaticQuery
    query={graphql`
      query aabyq {
        heroIl: allFile(filter: { relativePath: { eq: "abby.JPG" } }) {
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
          style={{ width: "72px" }}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default AbbyPic;

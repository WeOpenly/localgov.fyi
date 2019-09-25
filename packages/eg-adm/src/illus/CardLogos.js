import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const CardLogos = () => (
  <StaticQuery
    query={graphql`
      query cardlogosQ {
        heroIl: allFile(filter: { relativePath: { eq: "logos.png" } }) {
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
          alt={`Page Not Found`}
          style={{ width: "150px" }}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default CardLogos;

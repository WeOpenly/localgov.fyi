import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const IndexHeroIl = () => (
  <StaticQuery
    query={graphql`
      query IndexHeroq {
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
          style={{ width: "360px", height: '300px' }}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default IndexHeroIl;

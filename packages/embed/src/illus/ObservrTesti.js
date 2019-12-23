import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const ObservrTesti = props => (
  <StaticQuery
    query={graphql`
      query ObservrTestiq {
        heroIl: allFile(
          filter: { relativePath: { eq: "observr-testi.jpeg" } }
        ) {
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
          title={`ObservrTesti`}
          alt={`ObservrTesti`}
          style={props.style}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default ObservrTesti;

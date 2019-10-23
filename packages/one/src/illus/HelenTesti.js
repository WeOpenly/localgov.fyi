import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const HelenTesti = props => (
  <StaticQuery
    query={graphql`
      query HelenTestiq {
        heroIl: allFile(filter: { relativePath: { eq: "Helen2.jpg" } }) {
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
          title={`HelenTesti`}
          alt={`HelenTesti`}
          style={props.style}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default HelenTesti;

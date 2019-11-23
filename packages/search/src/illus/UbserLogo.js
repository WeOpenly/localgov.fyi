import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const UberLogo = (props) => (
  <StaticQuery
    query={graphql`
      query UberLogo {
        heroIl: allFile(filter: { relativePath: { eq: "Uber.png" } }) {
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
          title={`papergov_uber`}
          alt={`Page Not Found`}
          style={props.style}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default UberLogo;

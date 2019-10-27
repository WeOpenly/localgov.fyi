import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const CardLogos = (props) => (
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
          title={`papergov`}
          alt={`Page Not Found`}
          style={props.style}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default CardLogos;

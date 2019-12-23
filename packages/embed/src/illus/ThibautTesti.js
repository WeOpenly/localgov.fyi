import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const ThibautTesti = props => (
  <StaticQuery
    query={graphql`
      query ThibautTestiq {
        heroIl: allFile(filter: { relativePath: { eq: "thibaut-testi.jpg" } }) {
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
          title={`ThibautTesti`}
          alt={`ThibautTesti`}
          style={props.style}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default ThibautTesti;

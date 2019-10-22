import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const EthoTesti = props => (
  <StaticQuery
    query={graphql`
      query EthoTestiq {
        heroIl: allFile(filter: { relativePath: { eq: "etho-testi.jpg" } }) {
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
          title={`EthoTesti`}
          alt={`EthoTesti`}
          style={props.style}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default EthoTesti;

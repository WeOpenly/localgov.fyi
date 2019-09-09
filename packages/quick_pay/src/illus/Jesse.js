import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const JessePic = () => (
  <StaticQuery
    query={graphql`
      query jesseq {
        heroIl: allFile(filter: { relativePath: { eq: "jesse.JPG" } }) {
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
          style={{ width: "72px" }}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default JessePic;

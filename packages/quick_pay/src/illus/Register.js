import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const Register = (style) => (
  <StaticQuery
    query={graphql`
      query Registerq {
        heroIl: allFile(filter: { relativePath: { eq: "Register.png" } }) {
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
          alt={`Register`}
          style={{ width: "150px" }}
          sizes={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

export default Register;

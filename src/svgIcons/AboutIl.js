import React from "react"
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";

const AboutSVG = () => (
  <StaticQuery
    query={graphql`query AboutSVGq {
  heroIl: 
  allFile(
            filter: { relativePath: { eq: "aboutil.png" } }
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

}`}
    render={data => {
      return (<Img
        title={`evergov`}
        alt={`illustration of evergov`}
        style={{ width: '440px' }}
        sizes={data.heroIl.edges[0].node.childImageSharp.fluid} />)
    }} />
)

export default AboutSVG;
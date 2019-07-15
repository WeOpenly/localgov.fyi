import React from "react"
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";

const AboutSVG = () => (
    <StaticQuery
        query={graphql`query AboutSVGq2 {
  heroIl: 
  allFile(
            filter: { relativePath: { eq: "aboutil.png" } }
          ) {
            edges {
              node {
                name
                childImageSharp {
                  fluid  (
  traceSVG: {
    color: "#f0d3fe"
    turnPolicy: TURNPOLICY_MINORITY
    blackOnWhite: true
  }
){
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
                style={{ width: '320px', height: '160px' }}
                sizes={data.heroIl.edges[0].node.childImageSharp.fluid} />)
        }} />
)
export default AboutSVG
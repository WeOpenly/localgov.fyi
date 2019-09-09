import React from "react"
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";

const Step3 = () => (
    <StaticQuery
        query={graphql`query Step3Il {
  heroIl: 
  allFile(
            filter: { relativePath: { eq: "STEP3.png" } }
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
              style={{ width: '150px', height: '130px' }}
                sizes={data.heroIl.edges[0].node.childImageSharp.fluid} />)
        }} />
)
export default Step3
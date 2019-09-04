import React from "react"
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";

const RecreationSvg = ({ style}) => (
    <StaticQuery
        query={graphql`query RecreationSvg {
  heroIl: 
  allFile(
            filter: { relativePath: { eq: "recreation.png" } }
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
                style={style}
                sizes={data.heroIl.edges[0].node.childImageSharp.fluid} />)
        }} />
)

export default RecreationSvg;
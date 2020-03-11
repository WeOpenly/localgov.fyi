import React from "react"
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";

const ProptaxSvg = ({style}) => (
    <StaticQuery
        query={graphql`query ProptaxSvgQu {
  heroIl: 
  allFile(
            filter: { relativePath: { eq: "proptax.png" } }
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
                title={`papergov`}
                alt={`illustration of papergov`}
                style={{width: 'inherit', height: 'inherit'}}
                sizes={data.heroIl.edges[0].node.childImageSharp.fluid} />)
        }} />
)

export default ProptaxSvg;
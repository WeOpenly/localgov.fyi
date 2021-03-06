import React from "react"
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";

const GoodBye = () => (
    <StaticQuery
        query={graphql`query GoodByesvgq {
  heroIl: 
  allFile(
            filter: { relativePath: { eq: "goodbye.png" } }
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
                alt={`Deep link good bye`}
                style={{ width: '234px' }}
                sizes={data.heroIl.edges[0].node.childImageSharp.fluid} />)
        }} />
)

export default GoodBye;
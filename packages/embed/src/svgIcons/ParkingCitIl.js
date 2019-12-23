import React from "react"
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";

const ParkingcitSvg = ({style}) => (
    <StaticQuery
        query={graphql`query ParkingcitSvgQuery {
  heroIl: 
  allFile(
            filter: { relativePath: { eq: "parkingcit.png" } }
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
                style={style}
                sizes={data.heroIl.edges[0].node.childImageSharp.fluid} />)
        }} />
)

export default ParkingcitSvg;
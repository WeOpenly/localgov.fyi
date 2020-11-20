import React from "react"
import { Link } from "gatsby"

const GuideLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.slug}>
      {post.frontmatter.title}
    </Link>
    <br> </br>
  </div>
)

export default GuideLink

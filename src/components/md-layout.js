import React from "react"
import PropTypes from "prop-types"
import { MDXProvider } from "@mdx-js/react"

import Layout from "./layout"
import SEO from "./seo"

const MdLayout = props => {
  let title = props.pageContext.frontmatter.title
  let heading = props.pageContext.frontmatter.heading || title

  return (
    <MDXProvider>
      <SEO title={title} />
      <Layout title={heading}>{props.children}</Layout>
    </MDXProvider>
  )
}

MdLayout.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default MdLayout

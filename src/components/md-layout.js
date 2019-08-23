import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import Layout from "./layout"
import SEO from "./seo"

const checkExternal = props => {
  if (props.href.toLowerCase().startsWith("http")) {
    return <a target="_blank" {...props} />
  } else {
    return <Link to={props.href} {...props} />
  }
}

const renderers = {
  a: checkExternal,
}

const MdLayout = props => {
  let title = props.pageContext.frontmatter.title
  let heading = props.pageContext.frontmatter.heading || title

  return (
    <MDXProvider components={renderers}>
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

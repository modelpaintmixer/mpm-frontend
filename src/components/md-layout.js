import React from "react"
import PropTypes from "prop-types"
import { MDXProvider } from "@mdx-js/react"

import Layout from "./layout"
import SEO from "./seo"

const para = props => <p className="text-block" {...props} />

const MdLayout = props => (
  <MDXProvider
    components={{
      p: para,
    }}
  >
    <SEO title={props.pageContext.frontmatter.title} />
    <Layout>{props.children}</Layout>
  </MDXProvider>
)

MdLayout.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default MdLayout

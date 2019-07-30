import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Layout from "./layout"

export default ({ children }) => (
  <MDXProvider
    components={{
      p: props => <p className="text-block" {...props} />,
    }}
  >
    <Layout>{children}</Layout>
  </MDXProvider>
)

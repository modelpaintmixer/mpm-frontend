import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AllStandards from "../components/all-standards"

const StandardsPage = () => (
  <>
    <SEO title="All Standards" />
    <Layout title="All Standards">
      <div className="text-block">
        <AllStandards />
      </div>
    </Layout>
  </>
)

export default StandardsPage

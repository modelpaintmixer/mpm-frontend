import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AllOrigins from "../components/all-origins"

const OriginsPage = () => (
  <>
    <SEO title="All Origins" />
    <Layout title="All Origins">
      <div className="text-block">
        <AllOrigins />
      </div>
    </Layout>
  </>
)

export default OriginsPage

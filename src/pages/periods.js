import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AllPeriods from "../components/all-periods"

const PeriodsPage = () => (
  <>
    <SEO title="All Periods" />
    <Layout title="All Periods">
      <div className="text-block">
        <AllPeriods />
      </div>
    </Layout>
  </>
)

export default PeriodsPage

import React from "react"

import Layout from "../components/layout"
import NewestChanges from "../components/newest-changes"
import SEO from "../components/seo"

const IndexPage = () => (
  <>
    <SEO />
    <Layout>
      <div
        style={{
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <div className="text-block">
          <p>
            Welcome to <b>Model Paint Mixer</b>, a site that gathers custom
            colors and mixes for scale modeling. The colors presented here are
            created by users for the purpose of sharing with the scale modeling
            community.
          </p>
        </div>
      </div>
      <div className="text-block">
        <h3>Site News</h3>
        <NewestChanges />
      </div>
    </Layout>
  </>
)

export default IndexPage

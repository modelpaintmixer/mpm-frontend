import React from "react"

import Layout from "../components/layout"
import NewestChanges from "../components/newest-changes"
import SEO from "../components/seo"
import MainNavigation from "../components/main-navigation"

const IndexPage = () => (
  <>
    <SEO />
    <Layout>
      <div className="text-block">
        <p>
          Welcome to <b>Model Paint Mixer</b>, a site that gathers custom colors
          and mixes for scale modeling. The colors presented here are created by
          users for the purpose of sharing with the scale modeling community.
        </p>
      </div>
      <MainNavigation />
      <div className="text-block">
        <h3>Site News</h3>
        <NewestChanges />
      </div>
    </Layout>
  </>
)

export default IndexPage

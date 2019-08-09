import React from "react"

import Layout from "../components/layout"
import NewestChanges from "../components/newest-changes"
import SEO from "../components/seo"
import MainNavigation from "../components/main-navigation"

const mailchimpUrl = "https://mailchi.mp/5a620671bda0/mpm"

const IndexPage = () => (
  <>
    <SEO />
    <Layout>
      <section className="text-block">
        <p>
          Welcome to <b>Model Paint Mixer</b>, a site that gathers custom colors
          and mixes for scale modeling. The colors presented here are created by
          users for the purpose of sharing with the scale modeling community.
        </p>
      </section>
      <section
        className="text-block"
        style={{
          textAlign: "center",
        }}
      >
        <b>
          This site is still under construction.{" "}
          <a href={mailchimpUrl}>Sign up here</a> to be notified as more
          features are added and when the site fully launches.
        </b>
        <br />
        <span style={{ fontSize: "80%" }}>
          This mailing list will only be used until the full site launches, and
          will be removed at that time.
        </span>
      </section>
      <MainNavigation />
      <section className="text-block">
        <h3>Site News</h3>
        <NewestChanges />
      </section>
    </Layout>
  </>
)

export default IndexPage

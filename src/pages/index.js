import React, { Component } from "react"

import Layout from "../components/layout"
import NewestChanges from "../components/newest-changes"

class IndexPage extends Component {
  render() {
    return (
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
              colors and mixes for scale modeling. The mixes presented here are
              created by users for the purpose of sharing with the scale
              modeling community.
            </p>
          </div>
        </div>
        <div className="text-block">
          <h3 className="front-header3">Site News</h3>
          <NewestChanges />
        </div>
      </Layout>
    )
  }
}

export default IndexPage

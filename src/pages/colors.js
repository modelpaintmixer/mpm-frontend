import React, { Component } from "react"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import ColorBlocks from "../components/color-blocks"
import SEO from "../components/seo"

class ColorsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      colors: null,
      count: 0,
      timeStamp: 0,
    }
  }

  componentDidMount() {
    fetch(apiurl("/api/color"))
      .then(res => res.json())
      .then(
        result => {
          let colors = result.colors.map(color => {
            delete color.Origin
            return color
          })
          this.setState({
            isLoaded: true,
            colors: colors,
            count: colors.length,
            timeStamp: result.timestamp,
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
  }

  render() {
    const { error, isLoaded, colors, count } = this.state
    let content

    if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>An error occurred trying to load all the colors:</p>
            <p>{error.message}</p>
          </div>
        </>
      )
    } else if (!isLoaded) {
      content = (
        <>
          <div className="text-block">
            <p>Loading...</p>
          </div>
        </>
      )
    } else {
      content = (
        <>
          <SEO title="All Colors" />
          <Layout title="All Colors">
            <div className="text-block">
              <h3>{count} Colors in Database</h3>
              <ColorBlocks colors={colors} />
            </div>
          </Layout>
        </>
      )
    }

    return content
  }
}

export default ColorsPage

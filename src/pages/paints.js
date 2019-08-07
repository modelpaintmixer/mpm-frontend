import React, { Component } from "react"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import PaintBlocks from "../components/paint-blocks"
import SEO from "../components/seo"

const dataUrl = apiurl("/api/paint")

class PaintsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      paints: null,
      count: 0,
      timeStamp: 0,
    }
  }

  componentDidMount() {
    fetch(dataUrl)
      .then(res => res.json())
      .then(
        result => {
          let paints = result.paints.map(paint => {
            paint.manufacturer = paint.Manufacturer.showName
            delete paint.Manufacturer
            delete paint.Origin
            delete paint.ProductCodes
            return paint
          })
          this.setState({
            isLoaded: true,
            paints: paints,
            count: paints.length,
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
    const { error, isLoaded, paints, count } = this.state
    let content

    if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>An error occurred trying to load all the paints:</p>
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
          <SEO title="All Paints" />
          <Layout title="All Paints">
            <div className="text-block">
              <h3>{count} Paints in Database</h3>
              {paints.length === 0 ? "" : <PaintBlocks paints={paints} />}
            </div>
          </Layout>
        </>
      )
    }

    return content
  }
}

export default PaintsPage

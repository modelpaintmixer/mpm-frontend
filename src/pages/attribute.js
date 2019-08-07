import React, { Component } from "react"
import PropTypes from "prop-types"
import { Router, Redirect } from "@reach/router"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import PaintBlocks from "../components/paint-blocks"
import SEO from "../components/seo"

const dataUrl = apiurl("/api/view/attribute/")

const AttributePage = () => (
  <Router>
    <ShowAttribute path="/attribute/:id" />
    <Redirect from="/attribute/" to="/attributes" />
  </Router>
)

class ShowAttribute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      attribute: null,
      id: 0,
      timeStamp: 0,
    }
  }

  componentDidMount() {
    fetch(`${dataUrl}${this.props.id}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            attribute: result.attribute,
            // eslint-disable-next-line react/prop-types
            id: this.props.id,
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
    const { error, isLoaded, attribute } = this.state
    let content

    if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>An error occurred trying to load the data for this attribute:</p>
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
      let { name, description, Paints: paints } = attribute

      content = (
        <>
          <SEO title={`Attribute: ${name}`} />
          <Layout title={`Attribute: ${name}`}>
            <div className="text-block">
              <h3>Description</h3>
              <p>{description}</p>
              <h3>Paints with this attribute</h3>
              <PaintBlocks paints={paints} />
            </div>
          </Layout>
        </>
      )
    }

    return content
  }
}

ShowAttribute.propTypes = {
  id: PropTypes.number,
}

export default AttributePage

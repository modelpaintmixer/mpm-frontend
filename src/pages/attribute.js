import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import PaintBlocks from "../components/paint-blocks"
import SEO from "../components/seo"

const dataUrl = apiurl("/api/view/attribute/")

class AttributePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      attribute: null,
      missingId: false,
      timeStamp: 0,
    }
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)

    if (!values.id) {
      this.setState({ missingId: true })
    } else {
      fetch(`${dataUrl}${values.id}`)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              isLoaded: true,
              attribute: result.attribute,
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
  }

  render() {
    const { error, isLoaded, attribute, missingId } = this.state
    let content

    if (missingId) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>This page was requested without an attribute ID.</p>
            <p>
              To browse all attributes, visit the{" "}
              <Link to="/attributes">All Attributes</Link> page.
            </p>
          </div>
        </>
      )
    } else if (error) {
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
            <div className="loading">
              <ScaleLoader />
            </div>
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

AttributePage.propTypes = {
  location: PropTypes.object,
}

export default AttributePage

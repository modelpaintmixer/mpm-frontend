import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import ColorBlocks from "../components/color-blocks"
import PaintBlocks from "../components/paint-blocks"
import SEO from "../components/seo"
import RenderNotes from "../components/render-notes"

const dataUrl = apiurl("/api/view/origin/")

class OriginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      origin: null,
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
              origin: result.origin,
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
    const { error, isLoaded, origin, missingId } = this.state
    let content

    if (missingId) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>This page was requested without an origin ID.</p>
            <p>
              To browse all origins, visit the{" "}
              <Link to="/origins">All Origins</Link> page.
            </p>
          </div>
        </>
      )
    } else if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>An error occurred trying to load the data for this origin:</p>
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
      let {
        name,
        abbreviation,
        notes,
        Standards: standards,
        Colors: colors,
        Paints: paints,
      } = origin

      let relStandards = []
      let count = 0
      for (let standard of standards) {
        if (count++) {
          relStandards.push(", ")
        }
        relStandards.push(
          <a href={`/standard/?id=${standard.id}`} title={standard.name}>
            {standard.name}
          </a>
        )
      }

      content = (
        <>
          <SEO title={`Origin: ${name} (${abbreviation})`} />
          <Layout title={`Origin: ${name} (${abbreviation})`}>
            <div className="text-block">
              {notes === null ? (
                ""
              ) : (
                <>
                  <h3>Notes</h3>
                  <RenderNotes>{notes}</RenderNotes>
                </>
              )}
              {standards.length === 0 ? (
                ""
              ) : (
                <>
                  <h3>Related standards</h3>
                  <p>{relStandards}</p>
                </>
              )}
              {colors.length === 0 ? (
                ""
              ) : (
                <>
                  <h3>Related colors</h3>
                  <ColorBlocks colors={colors} />
                </>
              )}
              {paints.length === 0 ? (
                ""
              ) : (
                <>
                  <h3>Related paints</h3>
                  <PaintBlocks paints={paints} />
                </>
              )}
            </div>
          </Layout>
        </>
      )
    }

    return content
  }
}

OriginPage.propTypes = {
  location: PropTypes.object,
}

export default OriginPage

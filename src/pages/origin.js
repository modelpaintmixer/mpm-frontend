import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from "@reach/router"
import queryString from "query-string"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import SEO from "../components/seo"

const dataUrl = apiurl("/api/view/origin/")

class OriginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      origin: null,
      redirect: false,
      timeStamp: 0,
    }
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)

    if (!values.id) {
      this.setState({ redirect: true })
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
    const { error, isLoaded, origin, redirect } = this.state
    let content

    if (redirect) {
      return <Redirect to="/origins" />
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
            <p>Loading...</p>
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

      let relColors = []
      count = 0
      for (let color of colors) {
        if (count++) {
          relColors.push(", ")
        }
        relColors.push(
          <a href={`/color/?id=${color.id}`} title={color.name}>
            {color.name}
          </a>
        )
      }

      let relPaints = []
      count = 0
      for (let paint of paints) {
        if (count++) {
          relPaints.push(", ")
        }
        relPaints.push(
          <a href={`/paint/?id=${paint.id}`} title={paint.name}>
            {paint.manufacturer} {paint.partNumber} {paint.name}
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
                  <p>{notes}</p>
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
                  <p>{relColors}</p>
                </>
              )}
              {paints.length === 0 ? (
                ""
              ) : (
                <>
                  <h3>Related paints</h3>
                  <p>{relPaints}</p>
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

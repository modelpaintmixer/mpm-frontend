import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from "@reach/router"
import queryString from "query-string"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import SEO from "../components/seo"

const dataUrl = apiurl("/api/view/standard/")

class StandardPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      standard: null,
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
              standard: result.standard,
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
    const { error, isLoaded, standard, redirect } = this.state
    let content

    if (redirect) {
      return <Redirect to="/standards" />
    } else if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>An error occurred trying to load the data for this standard:</p>
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
        Origin: origin,
        Periods: periods,
        Colors: colors,
        Paints: paints,
      } = standard

      let relPeriods = []
      let count = 0
      for (let period of periods) {
        if (count++) {
          relPeriods.push(", ")
        }
        relPeriods.push(
          <a href={`/period/?id=${period.id}`} title={period.name}>
            {period.abbreviation}
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
          <SEO title={`Standard: ${name} (${abbreviation})`} />
          <Layout title={`Standard: ${name} (${abbreviation})`}>
            <div className="text-block">
              {notes === null ? (
                ""
              ) : (
                <>
                  <h3>Notes</h3>
                  <p>{notes}</p>
                </>
              )}
              <h3>Origin</h3>
              <p>{origin.name}</p>
              {periods.length === 0 ? (
                ""
              ) : (
                <>
                  <h3>Related periods</h3>
                  <p>{relPeriods}</p>
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

StandardPage.propTypes = {
  location: PropTypes.object,
}

export default StandardPage

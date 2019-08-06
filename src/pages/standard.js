import React, { Component } from "react"
import PropTypes from "prop-types"
import { Router, Redirect } from "@reach/router"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import SEO from "../components/seo"

const StandardPage = () => (
  <Router>
    <ShowStandard path="/standard/:id" />
    <Redirect from="/standard/" to="/standards" />
  </Router>
)

class ShowStandard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      standard: null,
      id: 0,
      timeStamp: 0,
    }
  }

  componentDidMount() {
    fetch(apiurl(`/api/view/standard/${this.props.id}`))
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            standard: result.standard,
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
    const { error, isLoaded, standard } = this.state
    let content

    if (error) {
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
          <a href={`/period/${period.id}`} title={period.name}>
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
          <a href={`/color/${color.id}`} title={color.name}>
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
          <a href={`/paint/${paint.id}`} title={paint.name}>
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

ShowStandard.propTypes = {
  id: PropTypes.number,
}

export default StandardPage

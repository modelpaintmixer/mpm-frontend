import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from "@reach/router"
import queryString from "query-string"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import ColorBlocks from "../components/color-blocks"
import SEO from "../components/seo"
import RenderNotes from "../components/render-notes"

const dataUrl = apiurl("/api/view/period/")

class PeriodPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      period: null,
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
              period: result.period,
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
    const { error, isLoaded, period, redirect } = this.state
    let content

    if (redirect) {
      return <Redirect to="/periods" />
    } else if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>An error occurred trying to load the data for this period:</p>
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
        fromYear,
        toYear,
        notes,
        Colors: colors,
        Standards: standards,
      } = period

      let relStandards = []
      let count = 0
      for (let standard of standards) {
        if (count++) {
          relStandards.push(", ")
        }
        relStandards.push(
          <a
            href={`/standard/?id=${standard.id}`}
            title={standard.name}
          >{`${standard.name} (${standard.abbreviation})`}</a>
        )
      }

      let duration =
        fromYear === 0
          ? `Until ${toYear}`
          : toYear === 0
          ? `${fromYear} to present`
          : `${fromYear} to ${toYear}`

      content = (
        <>
          <SEO title={`Period: ${name} (${abbreviation})`} />
          <Layout title={`Period: ${name} (${abbreviation})`}>
            <div className="text-block">
              <h3>Duration</h3>
              <p>{duration}</p>
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
            </div>
          </Layout>
        </>
      )
    }

    return content
  }
}

PeriodPage.propTypes = {
  location: PropTypes.object,
}

export default PeriodPage

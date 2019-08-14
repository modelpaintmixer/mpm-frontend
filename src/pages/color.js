import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from "@reach/router"
import queryString from "query-string"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import ColorSwatch from "../components/color-swatch"
import PaintCards from "../components/paint-cards"
import DateFormat from "../components/date-format"
import SEO from "../components/seo"
import RenderNotes from "../components/render-notes"

const dataUrl = apiurl("/api/view/color/")

class ColorPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      color: null,
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
              color: result.color,
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
    const { error, isLoaded, color, redirect } = this.state
    let content

    if (redirect) {
      return <Redirect to="/colors" />
    } else if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>An error occurred trying to load the data for this color:</p>
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
        credit,
        colorRgb,
        notes,
        createdAt,
        updatedAt,
        Origin: origin,
        Standards: standards,
        Periods: periods,
        parts,
      } = color

      let addedUpdatedHdr
      let dateTime
      if (createdAt === updatedAt) {
        addedUpdatedHdr = "Added to database"
        dateTime = new Date(createdAt)
      } else {
        addedUpdatedHdr = "Last updated at"
        dateTime = new Date(updatedAt)
      }

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
          >{`${standard.displayName}${standard.standardNumber}`}</a>
        )
      }

      let relPeriods = []
      count = 0
      for (let period of periods) {
        if (count++) {
          relPeriods.push(", ")
        }
        relPeriods.push(<a href={`/period/?id=${period.id}`}>{period.name}</a>)
      }

      content = (
        <>
          <SEO title={`Color: ${name}`} />
          <Layout title={`Color: ${name}`}>
            <ColorSwatch color={colorRgb} />
            <PaintCards paints={parts} />
            <div className="text-block">
              {credit === null ? (
                ""
              ) : (
                <>
                  <h3>Credit</h3>
                  <p>{credit}</p>
                </>
              )}
              {origin === null ? (
                ""
              ) : (
                <>
                  <h3>Color origin</h3>
                  <p>
                    <a href={`/origin/?id=${origin.id}`}>{origin.name}</a>
                  </p>
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
              {periods.length === 0 ? (
                ""
              ) : (
                <>
                  <h3>Related periods</h3>
                  <p>{relPeriods}</p>
                </>
              )}
              <h3>{addedUpdatedHdr}</h3>
              <p>
                <DateFormat date={dateTime} />
              </p>
              {notes === null ? (
                ""
              ) : (
                <>
                  <h3>Notes</h3>
                  <RenderNotes>{notes}</RenderNotes>
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

ColorPage.propTypes = {
  location: PropTypes.object,
}

export default ColorPage

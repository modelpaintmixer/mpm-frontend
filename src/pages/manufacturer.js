/* eslint-disable react/no-unescaped-entities */
import React, { Component } from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import DateFormat from "../components/date-format"
import ManufacturerLocations from "../components/manufacturer-locations"
import PaintBlocks from "../components/paint-blocks"
import SEO from "../components/seo"
import RenderNotes from "../components/render-notes"

const dataUrl = apiurl("/api/view/manufacturer/")

class ManufacturerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      manufacturer: null,
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
              manufacturer: result.manufacturer,
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
    const { error, isLoaded, manufacturer, missingId } = this.state
    let content

    if (missingId) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>This page was requested without a manufacturer's ID.</p>
          </div>
        </>
      )
    } else if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>
              An error occurred trying to load the data for this manufacturer:
            </p>
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
        fullName,
        notes,
        createdAt,
        updatedAt,
        Origin: origin,
        ManufacturerLocations: locations,
        Paints: paints,
      } = manufacturer

      let addedUpdatedHdr
      let dateTime
      if (createdAt === updatedAt) {
        addedUpdatedHdr = "Added to database"
        dateTime = new Date(createdAt)
      } else {
        addedUpdatedHdr = "Last updated at"
        dateTime = new Date(updatedAt)
      }

      content = (
        <>
          <SEO title={`Manufacturer: ${fullName}`} />
          <Layout title={`Manufacturer: ${fullName}`}>
            <div className="text-block">
              <ManufacturerLocations locations={locations} />
              {origin === null ? (
                ""
              ) : (
                <>
                  <h3>Founded</h3>
                  <p>{origin.name}</p>
                </>
              )}
              {notes === null ? (
                ""
              ) : (
                <>
                  <h3>Notes</h3>
                  <RenderNotes>{notes}</RenderNotes>
                </>
              )}
              {paints.length === 0 ? (
                ""
              ) : (
                <>
                  <h3>Paints</h3>
                  <PaintBlocks paints={paints} />
                </>
              )}
              <h3>{addedUpdatedHdr}</h3>
              <p>
                <DateFormat date={dateTime} />
              </p>
            </div>
          </Layout>
        </>
      )
    }

    return content
  }
}

ManufacturerPage.propTypes = {
  location: PropTypes.object,
}

export default ManufacturerPage

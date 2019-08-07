import React, { Component } from "react"
import PropTypes from "prop-types"
import { Router, Redirect } from "@reach/router"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import DateFormat from "../components/date-format"
import ManufacturerLocations from "../components/manufacturer-locations"
import PaintBlocks from "../components/paint-blocks"
import SEO from "../components/seo"

const dataUrl = apiurl("/api/view/manufacturer/")

const ManufacturerPage = () => (
  <Router>
    <ShowManufacturer path="/manufacturer/:id" />
    <Redirect from="/manufacturer/" to="/manufacturers" />
  </Router>
)

class ShowManufacturer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      manufacturer: null,
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
            manufacturer: result.manufacturer,
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
    const { error, isLoaded, manufacturer } = this.state
    let content

    if (error) {
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
            <p>Loading...</p>
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
                  <p>{notes}</p>
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

ShowManufacturer.propTypes = {
  id: PropTypes.number,
}

export default ManufacturerPage

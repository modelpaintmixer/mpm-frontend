/* eslint-disable react/no-unescaped-entities */
import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import Layout from "../components/layout"
import DateFormat from "../components/date-format"
import ManufacturerLocations from "../components/manufacturer-locations"
import PaintBlocks from "../components/paint-blocks"
import SEO from "../components/seo"
import RenderMarkdown from "../components/render-markdown"

const ManufacturerPage = props => {
  const values = queryString.parse(props.location.search)

  if (!values.id) {
    return (
      <>
        <h2>An Error Occurred</h2>
        <div className="text-block">
          <p>This page was requested without a manufacturer ID.</p>
          <p>
            To browse all manufacturers, visit the
            <Link to="/manufacturers">All Manufacturers</Link>
            page.
          </p>
        </div>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/view/manufacturer/${values.id}`,
      {
        data: {},
      }
    )

    if (error) {
      return (
        <div>
          <p>An error occurred trying to load data:</p>
          <p>{error.message}</p>
        </div>
      )
    } else if (loading) {
      return (
        <div className="text-block">
          <div className="loading">
            <ScaleLoader />
          </div>
        </div>
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
      } = data.manufacturer

      let addedUpdatedHdr
      let dateTime
      if (createdAt === updatedAt) {
        addedUpdatedHdr = "Added to database"
        dateTime = new Date(createdAt)
      } else {
        addedUpdatedHdr = "Last updated at"
        dateTime = new Date(updatedAt)
      }

      return (
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
                  <RenderMarkdown>{notes}</RenderMarkdown>
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
  }
}

ManufacturerPage.propTypes = {
  location: PropTypes.object,
}

export default ManufacturerPage

import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import Layout from "../components/layout"
import ColorSwatch from "../components/color-swatch"
import PaintCards from "../components/paint-cards"
import DateFormat from "../components/date-format"
import SEO from "../components/seo"
import RenderNotes from "../components/render-notes"

const ColorPage = props => {
  const values = queryString.parse(props.location.search)

  if (!values.id) {
    return (
      <>
        <h2>An Error Occurred</h2>
        <div className="text-block">
          <p>This page was requested without a color ID.</p>
          <p>
            To browse all colors, visit the
            <Link to="/colors">All Colors</Link>
            page.
          </p>
        </div>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/view/color/${values.id}`,
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
      } = data.color

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

      return (
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
  }
}

ColorPage.propTypes = {
  location: PropTypes.object,
}

export default ColorPage

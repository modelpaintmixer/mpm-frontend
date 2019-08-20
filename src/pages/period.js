import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import Layout from "../components/layout"
import ColorBlocks from "../components/color-blocks"
import SEO from "../components/seo"
import RenderNotes from "../components/render-notes"

const PeriodPage = props => {
  const values = queryString.parse(props.location.search)

  if (!values.id) {
    return (
      <>
        <h2>An Error Occurred</h2>
        <div className="text-block">
          <p>This page was requested without a period ID.</p>
          <p>
            To browse all periods, visit the
            <Link to="/periods">All Periods</Link> page.
          </p>
        </div>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/view/period/${values.id}`,
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
        abbreviation,
        fromYear,
        toYear,
        notes,
        Colors: colors,
        Standards: standards,
      } = data.period

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

      let title = name === abbreviation ? name : `${name} (${abbreviation})`

      return (
        <>
          <SEO title={`Period: ${title}`} />
          <Layout title={`Period: ${title}`}>
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
  }
}

PeriodPage.propTypes = {
  location: PropTypes.object,
}

export default PeriodPage

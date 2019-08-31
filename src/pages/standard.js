import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import Layout from "../components/layout"
import ColorBlocks from "../components/color-blocks"
import PaintBlocks from "../components/paint-blocks"
import SEO from "../components/seo"
import RenderMarkdown from "../components/render-markdown"

const StandardPage = props => {
  const values = queryString.parse(props.location.search)

  if (!values.id) {
    return (
      <>
        <h2>An Error Occurred</h2>
        <div className="text-block">
          <p>This page was requested without a standard ID.</p>
          <p>
            To browse all standards, visit the
            <Link to="/standards">All Standards</Link> page.
          </p>
        </div>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/view/standard/${values.id}`,
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
        notes,
        Origin: origin,
        Periods: periods,
        Colors: colors,
        Paints: paints,
      } = data.standard

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

      return (
        <>
          <SEO title={`Standard: ${name} (${abbreviation})`} />
          <Layout title={`Standard: ${name} (${abbreviation})`}>
            <div className="text-block">
              {notes === null ? (
                ""
              ) : (
                <>
                  <h3>Notes</h3>
                  <RenderMarkdown>{notes}</RenderMarkdown>
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
                  <ColorBlocks colors={colors} />
                </>
              )}
              {paints.length === 0 ? (
                ""
              ) : (
                <>
                  <h3>Related paints</h3>
                  <PaintBlocks paints={paints} />
                </>
              )}
            </div>
          </Layout>
        </>
      )
    }
  }
}

StandardPage.propTypes = {
  location: PropTypes.object,
}

export default StandardPage

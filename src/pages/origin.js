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
import RenderNotes from "../components/render-notes"

const OriginPage = props => {
  const values = queryString.parse(props.location.search)

  if (!values.id) {
    return (
      <>
        <h2>An Error Occurred</h2>
        <div className="text-block">
          <p>This page was requested without an origin ID.</p>
          <p>
            To browse all origins, visit the
            <Link to="/origins">All Origins</Link> page.
          </p>
        </div>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/view/origin/${values.id}`,
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
        Standards: standards,
        Colors: colors,
        Paints: paints,
      } = data.origin

      let relStandards = []
      let count = 0
      for (let standard of standards) {
        if (count++) {
          relStandards.push(", ")
        }
        relStandards.push(
          <a href={`/standard/?id=${standard.id}`} title={standard.name}>
            {standard.name}
          </a>
        )
      }

      return (
        <>
          <SEO title={`Origin: ${name} (${abbreviation})`} />
          <Layout title={`Origin: ${name} (${abbreviation})`}>
            <div className="text-block">
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

OriginPage.propTypes = {
  location: PropTypes.object,
}

export default OriginPage

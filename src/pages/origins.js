import React from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import RenderNotes from "../components/render-notes"
import Layout from "../components/layout"
import SEO from "../components/seo"

const OneOrigin = ({ origin }) => (
  <div>
    <h3>
      <a href={`/origin/?id=${origin.id}`} title={origin.abbreviation}>
        {`${origin.name} (${origin.abbreviation})`}
      </a>
    </h3>
    {origin.notes === null ? "" : <RenderNotes>{origin.notes}</RenderNotes>}
  </div>
)

OneOrigin.propTypes = {
  origin: PropTypes.object.isRequired,
  key: PropTypes.string,
}

const OriginsPage = () => {
  const [{ data, loading, error }] = useDataApi("/api/origin", {
    data: {},
  })
  let content

  if (error) {
    content = (
      <div className="text-block">
        <h3>An Error Occurred</h3>
        <p>An error occurred trying to load all the origins:</p>
        <p>{error.message}</p>
      </div>
    )
  } else if (loading) {
    content = (
      <div className="text-block">
        <div className="loading">
          <ScaleLoader />
        </div>
      </div>
    )
  } else {
    content = data.origins.map((origin, index) => (
      <OneOrigin key={index} origin={origin} />
    ))
  }

  return (
    <>
      <SEO title="All Origins" />
      <Layout title="All Origins">
        <div className="text-block">{content}</div>
      </Layout>
    </>
  )
}

export default OriginsPage

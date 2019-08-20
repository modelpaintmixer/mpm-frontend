import React from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import RenderNotes from "../components/render-notes"
import Layout from "../components/layout"
import SEO from "../components/seo"

const OneStandard = ({ standard }) => (
  <div>
    <h3>
      <a href={`/standard/?id=${standard.id}`} title={standard.abbreviation}>
        {`${standard.name} (${standard.abbreviation})`}
      </a>
    </h3>
    {standard.notes === null ? "" : <RenderNotes>{standard.notes}</RenderNotes>}
  </div>
)

OneStandard.propTypes = {
  standard: PropTypes.object.isRequired,
  key: PropTypes.string,
}

const StandardsPage = () => {
  const [{ data, loading, error }] = useDataApi("/api/standard", {
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
    content = data.standards.map((standard, index) => (
      <OneStandard key={index} standard={standard} />
    ))
  }

  return (
    <>
      <SEO title="All Standards" />
      <Layout title="All Standards">
        <div className="text-block">{content}</div>
      </Layout>
    </>
  )
}

export default StandardsPage

import React from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import RenderNotes from "../components/render-notes"

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

const AllStandards = () => {
  const [{ data, loading, error }] = useDataApi("/api/standard", {
    data: {},
  })

  return error ? (
    <div>
      <p>An error occurred trying to load data:</p>
      <p>{error.message}</p>
    </div>
  ) : loading ? (
    <div className="loading">
      <ScaleLoader />
    </div>
  ) : (
    data.standards.map((standard, index) => (
      <OneStandard key={index} standard={standard} />
    ))
  )
}

export default AllStandards

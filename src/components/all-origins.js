import React from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import RenderNotes from "../components/render-notes"

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

const AllOrigins = () => {
  const [{ data, loading, error }] = useDataApi("/api/origin", {
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
    data.origins.map((origin, index) => (
      <OneOrigin key={index} origin={origin} />
    ))
  )
}

export default AllOrigins

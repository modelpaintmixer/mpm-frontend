import React from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import RenderNotes from "../components/render-notes"

const OnePeriod = ({ period }) => (
  <div>
    <h3>
      <a href={`/period/?id=${period.id}`} title={period.abbreviation}>
        {period.name}
      </a>
    </h3>
    {period.notes === null ? "" : <RenderNotes>{period.notes}</RenderNotes>}
  </div>
)

OnePeriod.propTypes = {
  period: PropTypes.object.isRequired,
  key: PropTypes.string,
}

const AllPeriods = () => {
  const [{ data, loading, error }] = useDataApi("/api/period", {
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
    data.periods.map((period, index) => (
      <OnePeriod key={index} period={period} />
    ))
  )
}

export default AllPeriods

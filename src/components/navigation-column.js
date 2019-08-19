import React from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"

const getUrl = {
  color: "/api/topn/color/5",
  period: "/api/topn/period/5",
  origin: "/api/topn/origin/5",
}

const NavigationColumn = props => {
  const [{ data, loading, error }] = useDataApi(getUrl[props.type], {
    data: {},
  })

  return (
    <>
      {error && (
        <div>
          <p>An error occurred trying to load data:</p>
          <p>{error.message}</p>
        </div>
      )}
      {loading ? (
        <div className="loading">
          <ScaleLoader />
        </div>
      ) : (
        <ul>
          {data.topn.map(item => (
            <li key={item.id}>
              <a href={item.url}>{item.text}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

NavigationColumn.propTypes = {
  type: PropTypes.string.isRequired,
}

export default NavigationColumn

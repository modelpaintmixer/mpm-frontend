import React from "react"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"

const DatabaseStats = () => {
  const [{ data, loading, error }] = useDataApi("/api/stats/site", { data: {} })
  let content

  if (error) {
    content = <p>Error: {error.message}</p>
  } else if (loading) {
    content = (
      <div className="loading">
        <ScaleLoader />
      </div>
    )
  } else {
    let stats = data.stats
    content = (
      <ul>
        <li>
          {stats.manufacturers}{" "}
          {stats.manufacturers == 1 ? "manufacturer" : "manufacturers"}
        </li>
        <li>
          {stats.paints} {stats.paints == 1 ? "paint" : "paints"}
        </li>
        <li>
          {stats.colors} {stats.colors == 1 ? "color" : "colors"}
        </li>
        <li>
          {stats.images} {stats.images == 1 ? "image" : "images"}
        </li>
        <li>
          {stats.periods} {stats.periods == 1 ? "period" : "periods"}
        </li>
        <li>
          {stats.standards} {stats.standards == 1 ? "standard" : "standards"}
        </li>
      </ul>
    )
  }

  return content
}

export default DatabaseStats

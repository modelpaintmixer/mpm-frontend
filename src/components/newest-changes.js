import React from "react"
import { Link } from "gatsby"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import ChangeItem from "./change-item"

const NewestChanges = props => {
  const [{ data, loading, error }] = useDataApi("/api/stats/changes", {
    data: {},
  })
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
    let changes = data.changes
    content = (
      <>
        <ul>
          {changes.map((item, index) => (
            <li key={index}>
              <ChangeItem item={item} {...props} />
            </li>
          ))}
        </ul>
        <p>
          <Link to="/changes">more...</Link>
        </p>
      </>
    )
  }

  return content
}

export default NewestChanges

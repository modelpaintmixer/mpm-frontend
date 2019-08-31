import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { formatDistance } from "date-fns"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import RenderNotes from "./render-notes"

const changedWhen = date => {
  let now = new Date()
  let then = new Date(date)

  return formatDistance(then, now, { addSuffix: true })
}

const NewsItem = props => {
  if (props.itemId === 0) {
    return null
  }

  const [{ data, loading, error }] = useDataApi(
    `/api/newsitem/${props.itemId}`,
    {
      data: {},
    }
  )
  let content

  if (loading) {
    content = (
      <div className="loading">
        <ScaleLoader />
      </div>
    )
  } else if (error) {
    content = <p>Error: {error.message}</p>
  } else {
    let { headline, content: body, User: user, updatedAt } = data.newsitem

    content = (
      <div>
        <h3>{headline}</h3>
        <p style={{ fontSize: "75%" }}>
          By {user.username}, {changedWhen(updatedAt)}
        </p>
        <RenderNotes>{body}</RenderNotes>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ flex: 1, marginBottom: 0 }}>
            <Link to="/news">all news...</Link>
          </p>
          <p style={{ flex: 1, textAlign: "right", marginBottom: 0 }}>
            <a onClick={props.closeItem}>close</a>
          </p>
        </div>
      </div>
    )
  }

  return content
}

NewsItem.propTypes = {
  itemId: PropTypes.number.isRequired,
  closeItem: PropTypes.func.isRequired,
}

export default NewsItem

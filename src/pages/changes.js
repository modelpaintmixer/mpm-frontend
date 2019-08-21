import React from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RenderNotes from "../components/render-notes"

const ItemLink = props => {
  let item = props.item
  let url = `/${item.type.toLowerCase()}/?id=${item.id}`
  let text

  switch (item.type) {
    case "Paint":
      text = `${item.partNumber} ${item.name}`
      break
    case "Manufacturer":
      text = item.fullName
      break
    default:
      text = item.name
      break
  }
  return <a href={url}>{text}</a>
}

ItemLink.propTypes = {
  item: PropTypes.object.isRequired,
}

const BasicItem = ({ item }) => {
  let type = item.type
  let extra = type === "Paint" ? `${item.manufacturer} ` : ""
  return (
    <div>
      {"["}
      <b>{type}</b>
      {"] "}
      {item.action === "add"
        ? `New ${extra}${item.type.toLowerCase()}`
        : item.type}{" "}
      <ItemLink item={item} /> {item.action === "add" ? "added" : "updated"}
    </div>
  )
}

BasicItem.propTypes = {
  item: PropTypes.object.isRequired,
}

const NewsItem = ({ item }) => (
  <div>
    <RenderNotes>{`\\[**News**\\] ${item.headline}`}</RenderNotes>
  </div>
)

NewsItem.propTypes = {
  item: PropTypes.object.isRequired,
}

const ChangesPage = () => {
  const [{ data, loading, error }] = useDataApi("/api/stats/changes/25", {
    data: {},
  })
  let content, title

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
    title = `${changes.length} Newest Changes`

    content = (
      <ul>
        {changes.map((item, index) => {
          return (
            <li key={index}>
              {item.type === "NewsItem" ? (
                <NewsItem item={item} />
              ) : (
                <BasicItem item={item} />
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <SEO title={title} />
      <Layout title={title}>
        <div className="text-block">{content}</div>
      </Layout>
    </>
  )
}

export default ChangesPage

import React from "react"
import PropTypes from "prop-types"

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

export { BasicItem, NewsItem }

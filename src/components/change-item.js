import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { formatDistance } from "date-fns"

const changedWhen = date => {
  let now = new Date()
  let then = new Date(date)

  return formatDistance(then, now, { addSuffix: true })
}

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
  return <Link to={url}>{text}</Link>
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
      <ItemLink item={item} /> {item.action === "add" ? "added " : "updated "}
      {changedWhen(item.updatedAt)}
    </div>
  )
}

BasicItem.propTypes = {
  item: PropTypes.object.isRequired,
}

const NewsItem = ({ item }) => {
  let user = item.User
  let userlink = (
    <Link to={`/user?username=${user.username}`} title={user.name}>
      {user.username}
    </Link>
  )

  return (
    <div>
      [<b>News</b>] {item.headline},{" "}
      {item.action === "add" ? "added " : "updated "} by {userlink}{" "}
      {changedWhen(item.updatedAt)}
    </div>
  )
}

NewsItem.propTypes = {
  item: PropTypes.object.isRequired,
}

const ColorItem = ({ item }) => {
  let user = item.User
  let userlink = (
    <Link to={`/user?username=${user.username}`} title={user.name}>
      {user.username}
    </Link>
  )

  return (
    <div>
      [<b>Color</b>] {item.action === "add" ? "New color " : "Color "}
      <ItemLink item={item} /> {item.action === "add" ? "added " : "updated "}
      by {userlink} {changedWhen(item.updatedAt)}
    </div>
  )
}

ColorItem.propTypes = {
  item: PropTypes.object.isRequired,
}

const ChangeItem = ({ item }) => {
  let formatted

  switch (item.type) {
    case "NewsItem":
      formatted = <NewsItem item={item} />
      break
    case "Color":
      formatted = <ColorItem item={item} />
      break
    default:
      formatted = <BasicItem item={item} />
      break
  }

  return formatted
}

ChangeItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default ChangeItem

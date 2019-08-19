import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import ScaleLoader from "react-spinners/ScaleLoader"

import apiurl from "../utils/api-url"
import RenderNotes from "../components/render-notes"

const dataUrl = apiurl("/api/stats/changes")

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

class NewestChanges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      stats: {},
      timeStamp: 0,
    }
  }

  componentDidMount() {
    fetch(dataUrl)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            changes: result.changes,
            count: result.changes.length,
            timeStamp: result.timestamp,
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
  }

  render() {
    const { error, isLoaded, changes } = this.state
    let content

    if (error) {
      content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
      content = (
        <div className="loading">
          <ScaleLoader />
        </div>
      )
    } else {
      content = (
        <>
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
          <p>
            <Link to="/changes">more...</Link>
          </p>
        </>
      )
    }

    return content
  }
}

export default NewestChanges

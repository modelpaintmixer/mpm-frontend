import React, { Component } from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import SEO from "../components/seo"

const dataUrl = apiurl("/api/stats/changes/25")

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

class ChangesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      changes: null,
      count: 0,
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
    const { error, isLoaded, changes, count } = this.state
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
        <ul>
          {changes.map((item, index) => {
            let extra = item.type === "Paint" ? `${item.manufacturer} ` : ""
            return (
              <li key={index}>
                {item.action === "add"
                  ? `New ${extra}${item.type.toLowerCase()}`
                  : item.type}{" "}
                <ItemLink item={item} />{" "}
                {item.action === "add" ? "added" : "updated"}
              </li>
            )
          })}
        </ul>
      )
    }

    let title = `${count} Newest Changes`

    return (
      <>
        <SEO title={title} />
        <Layout title={title}>
          <div className="text-block">{content}</div>
        </Layout>
      </>
    )
  }
}

export default ChangesPage

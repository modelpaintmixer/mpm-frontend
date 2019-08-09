import React, { Component } from "react"
import PropTypes from "prop-types"

import apiurl from "../utils/api-url"

const getUrl = {
  color: apiurl("/api/topn/color"),
  period: apiurl("/api/topn/period"),
  origin: apiurl("/api/topn/origin/8"),
}

class NavigationColumn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      data: null,
      timeStamp: 0,
    }
  }

  componentDidMount() {
    let type = this.props.type

    fetch(getUrl[type])
      .then(res => res.json())
      .then(results => {
        this.setState({
          isLoaded: true,
          data: results.topn,
          timeStamp: results.timestamp,
        })
      })
  }

  render() {
    let { error, isLoaded, data } = this.state
    let content

    if (error) {
      content = (
        <div>
          <p>An error occurred trying to load the data for this paint:</p>
          <p>{error.message}</p>
        </div>
      )
    } else if (!isLoaded) {
      content = <p>Loading...</p>
    } else {
      content = (
        <ul>
          {data.map(item => (
            <li key={item.id}>
              <a href={item.url}>{item.text}</a>
            </li>
          ))}
        </ul>
      )
    }

    return content
  }
}

NavigationColumn.propTypes = {
  type: PropTypes.string.isRequired,
}

export default NavigationColumn

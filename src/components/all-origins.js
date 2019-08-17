import React, { Component } from "react"
import ScaleLoader from "react-spinners/ScaleLoader"

import apiurl from "../utils/api-url"
import RenderNotes from "../components/render-notes"

const dataUrl = apiurl("/api/origin")

const OneOrigin = origin => (
  <div>
    <h3>
      <a href={`/origin/?id=${origin.id}`} title={origin.abbreviation}>
        {`${origin.name} (${origin.abbreviation})`}
      </a>
    </h3>
    {origin.notes === null ? "" : <RenderNotes>{origin.notes}</RenderNotes>}
  </div>
)

class AllOrigins extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      origins: [],
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
            origins: result.origins,
            count: result.origins.length,
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
    const { error, isLoaded, origins } = this.state
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
      content = origins.map(origin => OneOrigin(origin))
    }

    return content
  }
}

export default AllOrigins

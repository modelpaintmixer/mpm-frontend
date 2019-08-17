import React, { Component } from "react"
import ScaleLoader from "react-spinners/ScaleLoader"

import apiurl from "../utils/api-url"
import RenderNotes from "../components/render-notes"

const dataUrl = apiurl("/api/standard")

const OneStandard = standard => (
  <div>
    <h3>
      <a href={`/standard/?id=${standard.id}`} title={standard.abbreviation}>
        <h3>{`${standard.name} (${standard.abbreviation})`}</h3>
      </a>
    </h3>
    {standard.notes === null ? "" : <RenderNotes>{standard.notes}</RenderNotes>}
  </div>
)

class AllStandards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      standards: [],
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
            standards: result.standards,
            count: result.standards.length,
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
    const { error, isLoaded, standards } = this.state
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
      content = standards.map(standard => OneStandard(standard))
    }

    return content
  }
}

export default AllStandards

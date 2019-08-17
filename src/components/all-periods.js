import React, { Component } from "react"
import ScaleLoader from "react-spinners/ScaleLoader"

import apiurl from "../utils/api-url"
import RenderNotes from "../components/render-notes"

const dataUrl = apiurl("/api/period")

const OnePeriod = period => (
  <div>
    <h3>
      <a href={`/period/?id=${period.id}`} title={period.abbreviation}>
        {period.name}
      </a>
    </h3>
    {period.notes === null ? "" : <RenderNotes>{period.notes}</RenderNotes>}
  </div>
)

class AllPeriods extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      periods: [],
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
            periods: result.periods,
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
    const { error, isLoaded, periods } = this.state
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
      content = periods
        .sort((a, b) => a.fromYear - b.fromYear)
        .map(period => OnePeriod(period))
    }

    return content
  }
}

export default AllPeriods

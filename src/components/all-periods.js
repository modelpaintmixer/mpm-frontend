import React, { Component } from "react"

import apiurl from "../utils/api-url"

const dataUrl = apiurl("/api/period")

const OnePeriod = period => (
  <div>
    <a href={`/period/?id=${period.id}`} title={period.abbreviation}>
      <h3>{period.name}</h3>
    </a>
    <p>{period.notes || ""}</p>
  </div>
)

class AllPeriods extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      periods: [],
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
            periods: result.periods,
            count: result.periods.length,
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
      content = <p>Loading...</p>
    } else {
      content = periods.map(period => OnePeriod(period))
    }

    return content
  }
}

export default AllPeriods

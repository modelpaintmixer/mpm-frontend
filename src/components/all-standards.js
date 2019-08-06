import React, { Component } from "react"

import apiurl from "../utils/api-url"

const dataUrl = apiurl("/api/standard")

const OneStandard = standard => (
  <div>
    <a href={`/standard/${standard.id}`} title={standard.abbreviation}>
      <h3>{`${standard.name} (${standard.abbreviation})`}</h3>
    </a>
    <p>{standard.notes || ""}</p>
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
      content = <p>Loading...</p>
    } else {
      content = standards.map(standard => OneStandard(standard))
    }

    return content
  }
}

export default AllStandards

import React, { Component } from "react"

class DatabaseStats extends Component {
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
    fetch("http://localhost:3000/api/stats/site")
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          this.setState({
            isLoaded: true,
            stats: result.stats,
            timeStamp: result.timestamp,
          })
        },
        error => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
  }

  render() {
    const { error, isLoaded, stats } = this.state
    let content

    if (error) {
      content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
      content = <p>Loading...</p>
    } else {
      content = (
        <ul>
          <li>
            {stats.manufacturers}{" "}
            {stats.manufacturers == 1 ? "manufacturer" : "manufacturers"}
          </li>
          <li>
            {stats.paints} {stats.paints == 1 ? "paint" : "paints"}
          </li>
          <li>
            {stats.colors} {stats.colors == 1 ? "color" : "colors"}
          </li>
          <li>
            {stats.images} {stats.images == 1 ? "image" : "images"}
          </li>
          <li>
            {stats.periods} {stats.periods == 1 ? "period" : "periods"}
          </li>
          <li>
            {stats.standards} {stats.standards == 1 ? "standard" : "standards"}
          </li>
        </ul>
      )
    }

    return content
  }
}

export default DatabaseStats

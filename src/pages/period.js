import React, { Component } from "react"
import PropTypes from "prop-types"
import { Router, Redirect } from "@reach/router"

import Layout from "../components/layout"

const PeriodPage = () => (
  <Router>
    <ShowPeriod path="/period/:id" />
    <Redirect from="/period/" to="/periods" />
  </Router>
)

class ShowPeriod extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      period: null,
      id: 0,
      timeStamp: 0,
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/view/period/${this.props.id}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            period: result.period,
            // eslint-disable-next-line react/prop-types
            id: this.props.id,
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
    const { error, isLoaded, period } = this.state
    let content

    if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>An error occurred trying to load the data for this period:</p>
            <p>{error.message}</p>
          </div>
        </>
      )
    } else if (!isLoaded) {
      content = (
        <>
          <div className="text-block">
            <p>Loading...</p>
          </div>
        </>
      )
    } else {
      let {
        name,
        abbreviation,
        notes,
        Mixes: mixes,
        Standards: standards,
      } = period

      let relStandards = []
      let count = 0
      for (let standard of standards) {
        if (count++) {
          relStandards.push(", ")
        }
        relStandards.push(
          <a
            href={`/standard/${standard.id}`}
            title={standard.name}
          >{`${standard.name} (${standard.abbreviation})`}</a>
        )
      }

      let relMixes = []
      count = 0
      for (let mix of mixes) {
        if (count++) {
          relMixes.push(", ")
        }
        relMixes.push(
          <a href={`/mix/${mix.id}`} title={mix.name}>
            {mix.name}
          </a>
        )
      }

      content = (
        <Layout title={`${name} (${abbreviation})`}>
          <div className="text-block">
            {notes === null ? (
              ""
            ) : (
              <>
                <h3>Notes</h3>
                <p>{notes}</p>
              </>
            )}
            {standards.length === 0 ? (
              ""
            ) : (
              <>
                <h3>Related standards</h3>
                <p>{relStandards}</p>
              </>
            )}
            {mixes.length === 0 ? (
              ""
            ) : (
              <>
                <h3>Related mixes</h3>
                <p>{relMixes}</p>
              </>
            )}
          </div>
        </Layout>
      )
    }

    return content
  }
}

ShowPeriod.propTypes = {
  id: PropTypes.number,
}

export default PeriodPage

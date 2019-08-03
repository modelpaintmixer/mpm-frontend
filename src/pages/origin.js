import React, { Component } from "react"
import PropTypes from "prop-types"
import { Router, Redirect } from "@reach/router"

import Layout from "../components/layout"

const OriginPage = () => (
  <Router>
    <ShowOrigin path="/origin/:id" />
    <Redirect from="/origin/" to="/origins" />
  </Router>
)

class ShowOrigin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      origin: null,
      id: 0,
      timeStamp: 0,
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/view/origin/${this.props.id}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            origin: result.origin,
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
    const { error, isLoaded, origin } = this.state
    let content

    if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>An error occurred trying to load the data for this origin:</p>
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
        Standards: standards,
        Colors: colors,
        Paints: paints,
      } = origin

      let relStandards = []
      let count = 0
      for (let standard of standards) {
        if (count++) {
          relStandards.push(", ")
        }
        relStandards.push(
          <a href={`/standard/${standard.id}`} title={standard.name}>
            {standard.name}
          </a>
        )
      }

      let relColors = []
      count = 0
      for (let color of colors) {
        if (count++) {
          relColors.push(", ")
        }
        relColors.push(
          <a href={`/color/${color.id}`} title={color.name}>
            {color.name}
          </a>
        )
      }

      let relPaints = []
      count = 0
      for (let paint of paints) {
        if (count++) {
          relPaints.push(", ")
        }
        relPaints.push(
          <a href={`/paint/${paint.id}`} title={paint.name}>
            {paint.manufacturer} {paint.partNumber} {paint.name}
          </a>
        )
      }

      content = (
        <Layout title={`Origin: ${name} (${abbreviation})`}>
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
            {colors.length === 0 ? (
              ""
            ) : (
              <>
                <h3>Related colors</h3>
                <p>{relColors}</p>
              </>
            )}
            {paints.length === 0 ? (
              ""
            ) : (
              <>
                <h3>Related paints</h3>
                <p>{relPaints}</p>
              </>
            )}
          </div>
        </Layout>
      )
    }

    return content
  }
}

ShowOrigin.propTypes = {
  id: PropTypes.number,
}

export default OriginPage

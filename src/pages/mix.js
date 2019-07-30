import React, { Component } from "react"
import PropTypes from "prop-types"
import { Router, Redirect } from "@reach/router"

import Layout from "../components/layout"
import ColorSwatch from "../components/color-swatch"
import PaintCards from "../components/paint-cards"
import DateFormat from "../components/date-format"

const MixPage = () => (
  <Router>
    <ShowMix path="/mix/:id" />
    <Redirect from="/mix/" to="/colors" />
  </Router>
)

class ShowMix extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      mix: null,
      id: 0,
      timeStamp: 0,
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/view/mix/${this.props.id}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            mix: result.mix,
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
    const { error, isLoaded, mix } = this.state
    let content

    if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>An error occurred trying to load the data for this mix:</p>
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
        credit,
        colorRgb,
        notes,
        createdAt,
        updatedAt,
        Origin: origin,
        Standards: standards,
        Periods: periods,
        parts,
      } = mix

      let addedUpdatedHdr
      let dateTime
      if (createdAt === updatedAt) {
        addedUpdatedHdr = "Added to database"
        dateTime = new Date(createdAt)
      } else {
        addedUpdatedHdr = "Last updated at"
        dateTime = new Date(updatedAt)
      }

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
          >{`${standard.displayName}${standard.standardNumber}`}</a>
        )
      }

      let relPeriods = []
      count = 0
      for (let period of periods) {
        if (count++) {
          relPeriods.push(", ")
        }
        relPeriods.push(<a href={`/period/${period.id}`}>{period.name}</a>)
      }

      content = (
        <Layout title={name}>
          <ColorSwatch color={colorRgb} />
          <PaintCards paints={parts} />
          <div className="text-block">
            {credit === null ? (
              ""
            ) : (
              <>
                <h3>Credit</h3>
                <p>{credit}</p>
              </>
            )}
            {origin === null ? (
              ""
            ) : (
              <>
                <h3>Color origin</h3>
                <p>
                  <a href={`/origin/${origin.id}`}>{origin.name}</a>
                </p>
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
            {periods.length === 0 ? (
              ""
            ) : (
              <>
                <h3>Related periods</h3>
                <p>{relPeriods}</p>
              </>
            )}
            <h3>{addedUpdatedHdr}</h3>
            <p>
              <DateFormat date={dateTime} />
            </p>
            {notes === null ? (
              ""
            ) : (
              <>
                <h3>Notes</h3>
                <p>{notes}</p>
              </>
            )}
          </div>
        </Layout>
      )
    }

    return content
  }
}

ShowMix.propTypes = {
  id: PropTypes.number,
}

export default MixPage

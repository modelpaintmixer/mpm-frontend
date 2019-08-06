import React, { Component } from "react"
import PropTypes from "prop-types"
import { Router, Redirect } from "@reach/router"

import apiurl from "../utils/api-url"
import Layout from "../components/layout"
import ColorSwatch from "../components/color-swatch"
import DateFormat from "../components/date-format"
import SEO from "../components/seo"

const PaintPage = () => (
  <Router>
    <ShowPaint path="/paint/:id" />
    <Redirect from="/paint/" to="/paints" />
  </Router>
)

class ShowPaint extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      paint: null,
      id: 0,
      timeStamp: 0,
    }
  }

  componentDidMount() {
    fetch(apiurl(`/api/view/paint/${this.props.id}`))
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            paint: result.paint,
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
    const { error, isLoaded, paint } = this.state
    let content

    if (error) {
      content = (
        <>
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>An error occurred trying to load the data for this paint:</p>
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
        partNumber,
        colorRgb,
        transparent,
        clear,
        notes,
        createdAt,
        updatedAt,
        Manufacturer: mfr,
        Attributes: attrs,
        Origin: origin,
        ProductCodes: prodCodes,
        Standards: standards,
        Colors: colors,
      } = paint

      let hasAttr = {}
      let attrText = []
      let count = 0
      for (let attr of attrs) {
        hasAttr[attr.name] = true
        if (count++) {
          attrText.push(", ")
        }
        attrText.push(
          <a href={`/attribute/${attr.id}`} title={attr.description}>
            {attr.name}
          </a>
        )
      }

      let prodCodesText
      if (prodCodes.length === 0) {
        prodCodesText = ""
      } else if (prodCodes.length === 1) {
        prodCodesText = `${prodCodes[0].code} (${prodCodes[0].detail})`
      } else {
        let codes = prodCodes.map(code => {
          return `${code.code} (${code.detail})`
        })
        prodCodesText = codes.join(", ")
      }

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
      count = 0
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

      content = (
        <>
          <SEO title={`Paint: ${name} (${partNumber})`} />
          <Layout title={`Paint: ${name} (${partNumber})`}>
            <ColorSwatch
              color={colorRgb}
              isTransparent={transparent}
              isClear={clear}
            />
            <div className="text-block">
              <h3>Manufacturer</h3>
              <p>
                <a href={`/manufacturer/${mfr.id}`}>{mfr.fullName}</a>
                {prodCodesText ? `, ${prodCodesText}` : ""}
              </p>
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
              <h3>Attributes</h3>
              <p>{attrText}</p>
              {colors.length === 0 ? (
                ""
              ) : (
                <>
                  <h3>Used in</h3>
                  <p>{relColors}</p>
                </>
              )}
              {notes === null ? (
                ""
              ) : (
                <>
                  <h3>Notes</h3>
                  <p>{notes}</p>
                </>
              )}
              <h3>{addedUpdatedHdr}</h3>
              <p>
                <DateFormat date={dateTime} />
              </p>
            </div>
          </Layout>
        </>
      )
    }

    return content
  }
}

ShowPaint.propTypes = {
  id: PropTypes.number,
}

export default PaintPage

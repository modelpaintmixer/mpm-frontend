import React from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"
import styled from "styled-components"

import useDataApi from "../utils/data-api"
import RenderNotes from "../components/render-notes"

const TH = styled.th`
  vertical-align: top;
`
const TD = styled.td`
  vertical-align: top;
`
const DD = styled.dd`
  margin-top: 0.5rem;
  margin-left: 2rem;
`

const durations = {
  m: ["minute", "minutes"],
  h: ["hour", "hours"],
  d: ["day", "days"],
  y: ["year", "years"],
}

const CookiesTableRow = ({ key, data }) => {
  let { name, needed, duration, description } = data

  needed = needed ? "Yes" : "No"
  if (duration) {
    let match = duration.match(/^(\d+)([mhdy])$/)
    if (match) {
      let len = +match[1]
      let dur = match[2]
      dur = len == 1 ? durations[dur][0] : durations[dur][1]

      duration = `${len} ${dur}`
    } else {
      duration = "(bad duration data)"
    }
  } else {
    duration = "Browser session"
  }

  return (
    <tr id={`cookielist-table-row-${key}`}>
      <TD>{name}</TD>
      <TD>{needed}</TD>
      <TD>{duration}</TD>
      <TD>
        <RenderNotes>{description}</RenderNotes>
      </TD>
    </tr>
  )
}

CookiesTableRow.propTypes = {
  key: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

const ListCookiesTable = () => {
  const [{ data, loading, error }] = useDataApi("/api/sitecookie", {
    data: {},
  })
  let content

  if (loading) {
    content = (
      <div className="loading">
        <ScaleLoader />
      </div>
    )
  } else if (error) {
    content = (
      <div>
        <p>An error occurred trying to load data:</p>
        <p>{error.message}</p>
      </div>
    )
  } else {
    let cookies = data.sitecookies

    content = (
      <table>
        <thead>
          <TH>Cookie Name</TH>
          <TH>Required for site operation?</TH>
          <TH>Duration</TH>
          <TH>Description</TH>
        </thead>
        <tbody>
          {cookies.map(item => (
            <CookiesTableRow key={item.id} data={item} />
          ))}
        </tbody>
      </table>
    )
  }

  return content
}

const CookiesDescriptionItem = ({ key, data }) => {
  let { name, needed, duration, description } = data

  needed = needed ? "Yes" : "No"
  if (duration) {
    let match = duration.match(/^(\d+)([mhdy])$/)
    if (match) {
      let len = +match[1]
      let dur = match[2]
      dur = len == 1 ? durations[dur][0] : durations[dur][1]

      duration = `${len} ${dur}`
    } else {
      duration = "(bad duration data)"
    }
  } else {
    duration = "Browser session"
  }

  return (
    <>
      <dt id={`cookielist-definition-${key}`}>
        <strong>Name: {name}</strong>
      </dt>
      <DD>
        <div>
          <p>Required for site operation? {needed}</p>
          <p>Duration: {duration}</p>
          <p>
            <RenderNotes>{description}</RenderNotes>
          </p>
        </div>
      </DD>
    </>
  )
}

CookiesDescriptionItem.propTypes = {
  key: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

const ListCookiesDescriptions = () => {
  const [{ data, loading, error }] = useDataApi("/api/sitecookie", {
    data: {},
  })
  let content

  if (loading) {
    content = (
      <div className="loading">
        <ScaleLoader />
      </div>
    )
  } else if (error) {
    content = (
      <div>
        <p>An error occurred trying to load data:</p>
        <p>{error.message}</p>
      </div>
    )
  } else {
    let cookies = data.sitecookies

    content = (
      <dl>
        {cookies.map(item => (
          <CookiesDescriptionItem key={item.id} data={item} />
        ))}
      </dl>
    )
  }

  return content
}

export { ListCookiesTable, ListCookiesDescriptions }

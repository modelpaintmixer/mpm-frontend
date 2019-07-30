import React from "react"
import PropTypes from "prop-types"
import { format } from "date-fns"

const DateFormat = props => {
  let { date, fmt } = props

  let formatted = format(date, fmt || "MMMM Do, YYYY, h:mm:sA")

  return <span>{formatted}</span>
}

DateFormat.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  fmt: PropTypes.string,
}

export default DateFormat

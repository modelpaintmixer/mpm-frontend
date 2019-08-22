import React from "react"
import PropTypes from "prop-types"
import { format } from "date-fns"

const DateFormat = ({ date, fmt }) => {
  let formatted = format(date, fmt || "MMMM do, y, h:mm:sa (O)")

  return <span>{formatted}</span>
}

DateFormat.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  fmt: PropTypes.string,
}

export default DateFormat

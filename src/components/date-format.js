import React from "react"
import PropTypes from "prop-types"
import { format, formatDistance } from "date-fns"

const dateFormat = (date, fmt) => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return format(date, fmt || "MMMM do, y, h:mm:ssa (O)")
}

const changedWhen = date => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  let now = new Date()

  return formatDistance(date, now, { addSuffix: true })
}

const DateFormat = ({ date, fmt, ...otherProps }) => (
  <span {...otherProps}>{dateFormat(date, fmt)}</span>
)

DateFormat.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  fmt: PropTypes.string,
}

const ChangedWhen = ({ date, ...otherProps }) => (
  <span {...otherProps}>{changedWhen(date)}</span>
)

ChangedWhen.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
}

const CombinedDate = ({ date, ...otherProps }) => (
  <span title={dateFormat(date)} {...otherProps}>
    {changedWhen(date)}
  </span>
)

CombinedDate.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
}

export { DateFormat, ChangedWhen, CombinedDate }

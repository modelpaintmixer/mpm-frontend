import React from "react"
import PropTypes from "prop-types"

import RenderMarkdown from "../render-markdown"

const Preview = ({ value }) => (
  <div style={{ marginTop: "1rem" }}>
    <RenderMarkdown>{value}</RenderMarkdown>
  </div>
)

Preview.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Preview

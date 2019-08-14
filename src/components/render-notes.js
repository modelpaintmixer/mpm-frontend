import React from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"

const RenderNotes = props => (
  <ReactMarkdown
    source={props.children}
    skipHtml
    disallowedTypes={["image", "imageReference", "heading"]}
  />
)

RenderNotes.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RenderNotes

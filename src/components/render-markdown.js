import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import ReactMarkdown from "react-markdown"

const checkExternal = props => {
  if (props.href.toLowerCase().startsWith("http")) {
    return <a target="_blank" {...props} />
  } else {
    return <Link to={props.href} {...props} />
  }
}

const renderers = {
  link: checkExternal,
  linkReference: checkExternal,
}

const RenderMarkdown = props => (
  <ReactMarkdown
    source={props.children}
    renderers={renderers}
    skipHtml
    disallowedTypes={["image", "imageReference", "heading"]}
  />
)

RenderMarkdown.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RenderMarkdown

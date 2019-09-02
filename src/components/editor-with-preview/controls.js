import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatQuote,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdInsertLink,
  MdInsertPhoto,
} from "react-icons/md"

const Button = styled.button`
  line-height: 0.5;
  padding: 0;
`

const formatStrings = {
  bold: "**",
  italic: "*",
  strike: "~~",
  quote: "> ",
}

const Controls = ({ editorRef, update, disableLink, disablePhoto }) => {
  const applyFormat = format => {
    let start = editorRef.current.selectionStart
    let end = editorRef.current.selectionEnd
    let value = editorRef.current.value
    let fmt = formatStrings[format]
    let selection = value.substring(start, end)

    switch (format) {
      case "quote":
        value =
          value.substring(0, start) +
          `${fmt}${selection}` +
          value.substring(end)
        break
      default:
        value =
          value.substring(0, start) +
          `${fmt}${selection}${fmt}` +
          value.substring(end)
        break
    }

    update(value)
    editorRef.current.focus()
  }

  const insertElement = type => {
    let start = editorRef.current.selectionStart
    let end = editorRef.current.selectionEnd
    let value = editorRef.current.value
    let selection = value.substring(start, end)

    switch (type) {
      case "link":
        value =
          value.substring(0, start) + `[${selection}]()` + value.substring(end)
        break
      case "photo":
        value =
          value.substring(0, start) + `![${selection}]()` + value.substring(end)
        break
      case "bullet":
        value =
          value.substring(0, start) + `* ${selection}` + value.substring(end)
        break
      case "number":
        value =
          value.substring(0, start) + `1. ${selection}` + value.substring(end)
        break
    }

    update(value)
    editorRef.current.focus()
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1 }}>
        <span title="bold text">
          <Button name="applybold" onClick={() => applyFormat("bold")}>
            <MdFormatBold />
          </Button>
        </span>
        <span title="italic text">
          <Button name="applyitalic" onClick={() => applyFormat("italic")}>
            <MdFormatItalic />
          </Button>
        </span>
        <span title="strikethrough text">
          <Button name="applystrike" onClick={() => applyFormat("strike")}>
            <MdFormatStrikethrough />
          </Button>
        </span>
        <span title="insert quote">
          <Button name="applyquote" onClick={() => applyFormat("quote")}>
            <MdFormatQuote />
          </Button>
        </span>
      </div>
      <div style={{ flex: 1, textAlign: "center" }}>
        <span title={`insert link${disableLink ? " (disabled)" : ""}`}>
          <Button
            name="insertlink"
            disabled={disableLink}
            onClick={() => insertElement("link")}
          >
            <MdInsertLink />
          </Button>
        </span>
        <span title={`insert photo${disablePhoto ? " (disabled)" : ""}`}>
          <Button
            name="insertphoto"
            disabled={disablePhoto}
            onClick={() => insertElement("photo")}
          >
            <MdInsertPhoto />
          </Button>
        </span>
      </div>
      <div style={{ flex: 1, textAlign: "right" }}>
        <span title="insert bulleted list">
          <Button name="bulletlist" onClick={() => insertElement("bullet")}>
            <MdFormatListBulleted />
          </Button>
        </span>
        <span title="insert numbered list">
          <Button name="numberlist" onClick={() => insertElement("number")}>
            <MdFormatListNumbered />
          </Button>
        </span>
      </div>
    </div>
  )
}

Controls.propTypes = {
  editorRef: PropTypes.any.isRequired,
  update: PropTypes.func.isRequired,
  disableLink: PropTypes.bool,
  disablePhoto: PropTypes.bool,
}

export default Controls

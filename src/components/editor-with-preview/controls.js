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
}

const findInsertPosition = (value, start) => {
  return value.substring(0, start).lastIndexOf("\n") + 1
}

const Controls = ({
  editorRef,
  update,
  onChange,
  disableLink,
  disablePhoto,
}) => {
  const applyFormat = format => {
    let start = editorRef.current.selectionStart
    let end = editorRef.current.selectionEnd
    let value = editorRef.current.value
    let fmt = formatStrings[format]
    let selection = value.substring(start, end)

    value =
      value.substring(0, start) +
      `${fmt}${selection}${fmt}` +
      value.substring(end)

    // Adjust the start/end based on the length of what we inserted
    end += fmt.length
    start = end

    update(value)
    editorRef.current.focus()
    editorRef.current.value = value
    editorRef.current.setSelectionRange(start, end)
    onChange({ target: editorRef.current })
  }

  const insertElement = type => {
    let start = editorRef.current.selectionStart
    let end = editorRef.current.selectionEnd
    let value = editorRef.current.value
    let selection = value.substring(start, end)
    let pos

    switch (type) {
      case "link":
        value =
          value.substring(0, start) + `[${selection}]()` + value.substring(end)
        end += 3
        start = end
        break
      case "photo":
        value =
          value.substring(0, start) + `![${selection}]()` + value.substring(end)
        end += 4
        start = end
        break
      case "bullet":
        pos = findInsertPosition(value, start)
        value = value.substring(0, pos) + "* " + value.substring(pos)
        start += 2
        end += 2
        break
      case "number":
        pos = findInsertPosition(value, start)
        value = value.substring(0, pos) + "1. " + value.substring(pos)
        start += 3
        end += 3
        break
      case "quote":
        pos = findInsertPosition(value, start)
        value = value.substring(0, pos) + "> " + value.substring(pos)
        start += 2
        end += 2
        break
      default:
        break
    }

    update(value)
    editorRef.current.focus()
    editorRef.current.value = value
    editorRef.current.setSelectionRange(start, end)
    onChange({ target: editorRef.current })
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
          <Button
            type="button"
            name="applybold"
            onClick={() => applyFormat("bold")}
          >
            <MdFormatBold />
          </Button>
        </span>
        <span title="italic text">
          <Button
            type="button"
            name="applyitalic"
            onClick={() => applyFormat("italic")}
          >
            <MdFormatItalic />
          </Button>
        </span>
        <span title="strikethrough text">
          <Button
            type="button"
            name="applystrike"
            onClick={() => applyFormat("strike")}
          >
            <MdFormatStrikethrough />
          </Button>
        </span>
        <span title="insert quote">
          <Button
            type="button"
            name="applyquote"
            onClick={() => insertElement("quote")}
          >
            <MdFormatQuote />
          </Button>
        </span>
      </div>
      <div style={{ flex: 1, textAlign: "center" }}>
        <span title={`insert link${disableLink ? " (disabled)" : ""}`}>
          <Button
            type="button"
            name="insertlink"
            disabled={disableLink}
            onClick={() => insertElement("link")}
          >
            <MdInsertLink />
          </Button>
        </span>
        <span title={`insert photo${disablePhoto ? " (disabled)" : ""}`}>
          <Button
            type="button"
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
          <Button
            type="button"
            name="bulletlist"
            onClick={() => insertElement("bullet")}
          >
            <MdFormatListBulleted />
          </Button>
        </span>
        <span title="insert numbered list">
          <Button
            type="button"
            name="numberlist"
            onClick={() => insertElement("number")}
          >
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
  onChange: PropTypes.func.isRequired,
  disableLink: PropTypes.bool,
  disablePhoto: PropTypes.bool,
}

export default Controls

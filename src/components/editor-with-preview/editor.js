import React from "react"
import PropTypes from "prop-types"

const Editor = ({ editorRef, name, value, onChange, onBlur }) => {
  return (
    <div>
      <textarea
        style={{
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%",
          minHeight: "150px",
          fontFamily: "monospace",
        }}
        ref={editorRef}
        onChange={e => onChange(e)}
        onBlur={e => onBlur(e)}
        name={name}
        value={value}
      />
    </div>
  )
}

Editor.propTypes = {
  editorRef: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default Editor

import React from "react"
import PropTypes from "prop-types"

const Editor = ({ editorRef, name, value, update }) => {
  return (
    <div>
      <textarea
        style={{
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%",
          backgroundColor: "#fafafa",
          minHeight: "150px",
        }}
        ref={editorRef}
        onChange={e => update(e.target.value)}
        name={name}
        value={value}
      />
    </div>
  )
}

Editor.propTypes = {
  editorRef: PropTypes.any.isRequired,
  update: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default Editor

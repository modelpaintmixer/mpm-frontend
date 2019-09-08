import React, { useRef, useState } from "react"
import PropTypes from "prop-types"

import Controls from "./controls"
import Editor from "./editor"
import Preview from "./preview"

const EditorWithPreview = ({
  name,
  onChange,
  value,
  disableLink,
  disablePhoto,
  ...props
}) => {
  const editorRef = useRef(null)
  const [currentValue, setCurrentValue] = useState(value)

  const onChangeFn = e => {
    setCurrentValue(e.target.value)
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div {...props}>
      <Controls
        editorRef={editorRef}
        update={setCurrentValue}
        onChange={onChange}
        disableLink={disableLink}
        disablePhoto={disablePhoto}
      />
      <Editor
        editorRef={editorRef}
        onChange={onChangeFn}
        name={name}
        value={currentValue}
      />
      <Preview value={currentValue || " "} />
    </div>
  )
}

EditorWithPreview.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  disableLink: PropTypes.bool,
  disablePhoto: PropTypes.bool,
}

export default EditorWithPreview

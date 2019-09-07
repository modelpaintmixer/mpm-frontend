import React, { useRef, useState } from "react"
import PropTypes from "prop-types"

import Controls from "./controls"
import Editor from "./editor"
import Preview from "./preview"

const EditorWithPreview = ({
  content,
  name,
  onChange,
  disableLink,
  disablePhoto,
  ...otherProps
}) => {
  const editorRef = useRef(null)
  const [value, setValue] = useState(content)

  const onChangeFn = e => {
    setValue(e.target.value)
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div {...otherProps}>
      <Controls
        editorRef={editorRef}
        update={setValue}
        onChange={onChange}
        disableLink={disableLink}
        disablePhoto={disablePhoto}
      />
      <Editor
        editorRef={editorRef}
        onChange={onChangeFn}
        name={name}
        value={value}
      />
      <Preview value={value || " "} />
    </div>
  )
}

EditorWithPreview.propTypes = {
  content: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disableLink: PropTypes.bool,
  disablePhoto: PropTypes.bool,
}

export default EditorWithPreview

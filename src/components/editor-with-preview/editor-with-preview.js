import React, { useRef, useState } from "react"
import PropTypes from "prop-types"

import Controls from "./controls"
import Editor from "./editor"
import Preview from "./preview"

const EditorWithPreview = ({
  content,
  name,
  disableLink,
  disablePhoto,
  ...otherProps
}) => {
  const editorRef = useRef(null)
  const [value, setValue] = useState(content)

  return (
    <div {...otherProps}>
      <Controls
        editorRef={editorRef}
        update={setValue}
        disableLink={disableLink}
        disablePhoto={disablePhoto}
      />
      <Editor
        editorRef={editorRef}
        update={setValue}
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
  disableLink: PropTypes.bool,
  disablePhoto: PropTypes.bool,
}

export default EditorWithPreview

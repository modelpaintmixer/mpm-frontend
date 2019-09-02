import React, { useRef, useState } from "react"
import PropTypes from "prop-types"

import Controls from "./controls"
import Editor from "./editor"
import Preview from "./preview"

const EditorWithPreview = ({
  content,
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
      <Editor editorRef={editorRef} update={setValue} value={value} />
      <Preview value={value || " "} />
    </div>
  )
}

EditorWithPreview.propTypes = {
  editorRef: PropTypes.any,
  content: PropTypes.string,
  disableLink: PropTypes.bool,
  disablePhoto: PropTypes.bool,
}

export default EditorWithPreview

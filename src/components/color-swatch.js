import React from "react"
import PropTypes from "prop-types"

import transparent from "../images/transparent_pattern.png"
import styles from "./color-swatch.module.css"

const ColorSwatch = props => {
  let { color, size, isTransparent, isClear, textSize } = props
  let opacity = isTransparent ? 0.6 : isClear ? 0 : 1
  let text = ""
  let topDivStyle = {}
  if (color === null) {
    topDivStyle["background"] = "rgb(0,0,0,0)"
    if (textSize) {
      topDivStyle["fontSize"] = textSize
    }
    text = <p>No color available yet</p>
  } else {
    topDivStyle["background"] = `rgb(${color},${opacity})`
  }

  let style = {}
  if (size) {
    style.height = size
    style.width = size
  }

  return (
    <div className={styles.swatchContainer}>
      <div className={styles.swatch} style={style}>
        <div>
          <img src={transparent} alt="" />
        </div>
        <div style={topDivStyle}>{text}</div>
      </div>
    </div>
  )
}

ColorSwatch.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  isTransparent: PropTypes.bool,
  isClear: PropTypes.bool,
  textSize: PropTypes.string,
}

export default ColorSwatch

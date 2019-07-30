import React from "react"
import PropTypes from "prop-types"

import transparent from "../images/transparent_pattern.png"
import styles from "./color-swatch.module.css"

const ColorSwatch = props => {
  let { color, size, isTransparent, isClear } = props
  let opacity = isTransparent ? 0.6 : isClear ? 0 : 1
  let text = ""
  if (color === null) {
    color = "rgb(0,0,0,0)"
    text = <p>No color available yet</p>
  } else {
    color = `rgb(${color},${opacity})`
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
        <div style={{ background: color }}>{text}</div>
      </div>
    </div>
  )
}

ColorSwatch.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  isTransparent: PropTypes.bool,
  isClear: PropTypes.bool,
}

export default ColorSwatch

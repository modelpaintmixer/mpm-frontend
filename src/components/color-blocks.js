import React from "react"
import PropTypes from "prop-types"

import ColorSwatch from "./color-swatch"
import styles from "./color-blocks.module.css"

const ColorBlock = ({ color }) => (
  <div className={styles.colorBlock}>
    <a
      href={`/color/?id=${color.id}`}
      className={styles.colorLink}
      title="View this color"
    >
      <div className={styles.colorSwatch}>
        <ColorSwatch
          color={color.colorRgb}
          isTransparent={color.transparent}
          isClear={color.clear}
          size="4rem"
          textSize="50%"
        />
      </div>
      <p className={styles.colorTitle}>{color.name}</p>
      <p className={styles.colorCredit}>Credit: {color.credit}</p>
    </a>
  </div>
)

ColorBlock.propTypes = {
  color: PropTypes.object.isRequired,
  key: PropTypes.any,
}

const ColorBlocks = ({ colors }) => (
  <div className={styles.colorBlocks}>
    {colors.map((color, index) => (
      <ColorBlock key={index} color={color} />
    ))}
  </div>
)

ColorBlocks.propTypes = {
  colors: PropTypes.array.isRequired,
}

export default ColorBlocks

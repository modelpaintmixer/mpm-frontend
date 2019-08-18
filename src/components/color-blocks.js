import React from "react"
import PropTypes from "prop-types"

import ColorSwatch from "./color-swatch"
import styles from "./color-blocks.module.css"

const ColorBlock = ({ color }) => (
  <div className={styles.colorBlock}>
    <div className={styles.colorSwatchAndTitle}>
      <div className={styles.colorSwatch}>
        <a
          href={`/color/?id=${color.id}`}
          className={styles.colorLink}
          title="View this color"
        >
          <ColorSwatch
            color={color.colorRgb}
            isTransparent={color.transparent}
            isClear={color.clear}
            size="4rem"
            textSize="50%"
          />
        </a>
      </div>
      <p className={styles.colorTitle}>
        <a href={`/color/?id=${color.id}`} title="View this color">
          {color.name}
        </a>
      </p>
    </div>
    <div>
      <p className={styles.colorCredit}>Credit: {color.credit}</p>
    </div>
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

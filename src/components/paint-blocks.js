import React from "react"
import PropTypes from "prop-types"

import ColorSwatch from "./color-swatch"
import styles from "./paint-blocks.module.css"

const PaintBlock = ({ paint }) => (
  <div className={styles.paintBlock}>
    <div className={styles.paintSwatch}>
      <a href={`/paint/?id=${paint.id}`} title="View this paint">
        <ColorSwatch
          color={paint.colorRgb}
          isTransparent={paint.transparent}
          isClear={paint.clear}
          size="4rem"
        />
      </a>
    </div>
    <p className={styles.paintTitle}>
      <a href={`/paint/?id=${paint.id}`} title="View this paint">
        {paint.manufacturer
          ? `${paint.manufacturer} ${paint.partNumber} ${paint.name}`
          : `${paint.partNumber} ${paint.name}`}
      </a>
    </p>
  </div>
)

PaintBlock.propTypes = {
  paint: PropTypes.object.isRequired,
  key: PropTypes.any,
}

const PaintBlocks = ({ paints }) => (
  <div className={styles.paintBlocks}>
    {paints.map((paint, index) => (
      <PaintBlock key={index} paint={paint} />
    ))}
  </div>
)

PaintBlocks.propTypes = {
  paints: PropTypes.array.isRequired,
}

export default PaintBlocks

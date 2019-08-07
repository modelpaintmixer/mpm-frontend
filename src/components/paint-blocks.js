import React from "react"
import PropTypes from "prop-types"

import ColorSwatch from "./color-swatch"
import styles from "./paint-blocks.module.css"

const PaintBlock = ({ paint }) => (
  <div className={styles.paintBlock}>
    <a
      href={`/paint/?id=${paint.id}`}
      className={styles.paintLink}
      title="View this paint"
    >
      <div className={styles.paintSwatch}>
        <ColorSwatch
          color={paint.colorRgb}
          isTransparent={paint.transparent}
          isClear={paint.clear}
          size="4rem"
        />
      </div>
      <p className={styles.paintTitle}>
        {paint.manufacturer
          ? `${paint.manufacturer} ${paint.partNumber} ${paint.name}`
          : `${paint.partNumber} ${paint.name}`}
      </p>
    </a>
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

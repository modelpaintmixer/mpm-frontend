import React from "react"
import PropTypes from "prop-types"

import ColorSwatch from "./color-swatch"
import styles from "./paint-blocks.module.css"

const PaintBlock = ({ paint }) => (
  <div className={`${styles.paintBlock} text-block`}>
    <a
      href={`/paint/${paint.id}`}
      className={styles.paintLink}
      title="View this paint"
    >
      <p className={styles.paintTitle}>
        {paint.manufacturer
          ? `${paint.manufacturer} ${paint.partNumber} ${paint.name}`
          : `${paint.partNumber} ${paint.name}`}
      </p>
      <div className={styles.paintSwatch}>
        <ColorSwatch color={paint.colorRgb} size="4rem" />
        {paint.parts ? (
          <p>
            {paint.parts} part
            {paint.parts === 1 ? "" : "s"}
          </p>
        ) : (
          ""
        )}
      </div>
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

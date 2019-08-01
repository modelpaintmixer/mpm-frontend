import React from "react"
import PropTypes from "prop-types"

import ColorSwatch from "./color-swatch"
import styles from "./paint-cards.module.css"

const PaintCard = ({ paint }) => (
  <div className={`${styles.paintCard} text-block`}>
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
  </div>
)

PaintCard.propTypes = {
  paint: PropTypes.object.isRequired,
  key: PropTypes.any,
}

const PaintCards = ({ paints }) => (
  <div className={styles.paintCards}>
    {paints.map((paint, index) => (
      <PaintCard key={index} paint={paint} />
    ))}
  </div>
)

PaintCards.propTypes = {
  paints: PropTypes.array.isRequired,
}

export default PaintCards

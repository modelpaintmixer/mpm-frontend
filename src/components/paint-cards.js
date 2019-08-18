import React from "react"
import PropTypes from "prop-types"

import ColorSwatch from "./color-swatch"
import styles from "./paint-cards.module.css"

const PaintCard = ({ paint }) => (
  <div className={`${styles.paintCard} text-block`}>
    <p className={styles.paintTitle}>
      <a
        href={`/paint/?id=${paint.id}`}
        className={styles.paintLink}
        title="View this paint"
      >
        {paint.manufacturer
          ? `${paint.manufacturer} ${paint.partNumber} ${paint.name}`
          : `${paint.partNumber} ${paint.name}`}
      </a>
    </p>
    <div className={styles.paintSwatch}>
      <a
        href={`/paint/?id=${paint.id}`}
        className={styles.paintLink}
        title="View this paint"
      >
        <ColorSwatch
          color={paint.colorRgb}
          isTransparent={paint.transparent}
          isClear={paint.clear}
          size="4rem"
        />
        <p style={{ marginBottom: 0 }}>
          {paint.parts} part{paint.parts === 1 ? "" : "s"}
        </p>
      </a>
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

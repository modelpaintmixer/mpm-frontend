import React from "react"
import PropTypes from "prop-types"

import styles from "./manufacturer-locations.module.css"

const ManufacturerLocation = ({ location }) => (
  <div className={styles.location}>
    <h4>{location.country}:</h4>
    <p>{location.street1}</p>
    <p>{location.street2 || " "}</p>
    <p>
      {location.city}, {location.state}
    </p>
    <p>{location.postalCode}</p>
    <p style={{ marginTop: "0.5rem" }}>
      Web: <a href={location.url}>{location.url}</a>
    </p>
  </div>
)

ManufacturerLocation.propTypes = {
  location: PropTypes.object.isRequired,
  key: PropTypes.any,
}

const ManufacturerLocations = ({ locations }) => (
  <div className={styles.locations}>
    {locations.map((location, index) => (
      <ManufacturerLocation location={location} key={index} />
    ))}
  </div>
)

ManufacturerLocations.propTypes = {
  locations: PropTypes.array.isRequired,
}

export default ManufacturerLocations

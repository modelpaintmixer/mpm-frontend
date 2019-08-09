import React from "react"

import NavigationColumn from "./navigation-column"
import styles from "./main-navigation.module.css"

const MainNavigation = () => (
  <section className={styles.navigationContainer}>
    <div className={`${styles.navigationColumn} text-block`}>
      <h3>By Color Name</h3>
      <NavigationColumn type="color" />
    </div>
    <div className={`${styles.navigationColumn} text-block`}>
      <h3>By Period</h3>
      <NavigationColumn type="period" />
    </div>
    <div className={`${styles.navigationColumn} text-block`}>
      <h3>By Origin</h3>
      <NavigationColumn type="origin" />
    </div>
  </section>
)

export default MainNavigation

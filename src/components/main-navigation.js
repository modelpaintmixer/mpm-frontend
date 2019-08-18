import React from "react"
import { Link } from "gatsby"

import NavigationColumn from "./navigation-column"
import styles from "./main-navigation.module.css"

const MainNavigation = () => (
  <section className={styles.navigationContainer}>
    <div className={`${styles.navigationColumn} text-block`}>
      <div>
        <h3>By Color Name</h3>
        <NavigationColumn type="color" />
      </div>
      <div>
        <div>
          <Link to="/colors">all colors...</Link>
        </div>
      </div>
    </div>
    <div className={`${styles.navigationColumn} text-block`}>
      <div>
        <h3>By Period</h3>
        <NavigationColumn type="period" />
      </div>
      <div>
        <div>
          <Link to="/periods">all periods...</Link>
        </div>
      </div>
    </div>
    <div className={`${styles.navigationColumn} text-block`}>
      <div>
        <h3>By Origin</h3>
        <NavigationColumn type="origin" />
      </div>
      <div>
        <div>
          <Link to="/origins">all origins...</Link>
        </div>
      </div>
    </div>
  </section>
)

export default MainNavigation

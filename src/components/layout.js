import React from "react"
import PropTypes from "prop-types"

import { Header, Footer } from "./header-footer"

const Layout = props => {
  return (
    <>
      <Header title={props.title} />
      <div>
        <main>{props.children}</main>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Layout

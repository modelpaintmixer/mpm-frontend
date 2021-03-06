import React from "react"
import PropTypes from "prop-types"
import { ToastContainer } from "react-toastify"

import { Header, Footer } from "./header-footer"

const Layout = props => {
  return (
    <>
      <Header title={props.title} />
      <main>{props.children}</main>
      <Footer />
      <ToastContainer />
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Layout

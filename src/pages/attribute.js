import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import Layout from "../components/layout"
import PaintBlocks from "../components/paint-blocks"
import SEO from "../components/seo"

const AttributePage = props => {
  const values = queryString.parse(props.location.search)

  if (!values.id) {
    return (
      <>
        <h2>An Error Occurred</h2>
        <div className="text-block">
          <p>This page was requested without an attribute ID.</p>
          <p>
            To browse all attributes, visit the{" "}
            <Link to="/attributes">All Attributes</Link> page.
          </p>
        </div>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/view/attribute/${values.id}`,
      {
        data: {},
      }
    )

    if (error) {
      return (
        <div>
          <p>An error occurred trying to load data:</p>
          <p>{error.message}</p>
        </div>
      )
    } else if (loading) {
      return (
        <div className="text-block">
          <div className="loading">
            <ScaleLoader />
          </div>
        </div>
      )
    } else {
      let { name, description, Paints: paints } = data.attribute

      return (
        <>
          <SEO title={`Attribute: ${name}`} />
          <Layout title={`Attribute: ${name}`}>
            <div className="text-block">
              <h3>Description</h3>
              <p>{description}</p>
              <h3>Paints with this attribute</h3>
              <PaintBlocks paints={paints} />
            </div>
          </Layout>
        </>
      )
    }
  }
}

AttributePage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default AttributePage

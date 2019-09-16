import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../../utils/data-api"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import EditAttributeForm from "../../forms/edit-attribute"

const EditAttributePage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.id) {
    return (
      <>
        <SEO title="Error" />
        <Layout title="Edit Attribute: Error">
          <div className="text-block">
            <h3>An Error Occurred</h3>
            <p>This page was requested without an attribute ID.</p>
          </div>
        </Layout>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/attribute/${values.id}`,
      {
        data: {},
      }
    )

    if (error) {
      return (
        <>
          <SEO title="Error" />
          <Layout title="Edit Attribute: Error">
            <h2>An Error Occurred</h2>
            <div className="text-block">
              <p>An error occurred trying to load data:</p>
              <p>{error.message}</p>
            </div>
          </Layout>
        </>
      )
    } else if (loading) {
      return (
        <>
          <SEO title="Loading..." />
          <Layout title="Edit Attribute: Loading...">
            <div className="text-block">
              <div className="loading">
                <ScaleLoader />
              </div>
            </div>
          </Layout>
        </>
      )
    } else {
      let attribute = data.attribute

      return (
        <>
          <SEO title={`Edit Attribute: ${attribute.name}`} />
          <Layout title={`Edit Attribute: ${attribute.name}`}>
            <div className="text-block">
              <EditAttributeForm {...attribute} />
            </div>
          </Layout>
        </>
      )
    }
  }
}

EditAttributePage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EditAttributePage

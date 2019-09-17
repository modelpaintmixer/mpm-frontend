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
        <SEO title="Create Attribute" />
        <Layout title="Create Attribute">
          <div className="text-block">
            <EditAttributeForm />
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
            <div className="text-block">
              <h3>An Error Occurred</h3>
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
      return (
        <>
          <SEO title="Edit Attribute" />
          <Layout title="Edit Attribute">
            <div className="text-block">
              <EditAttributeForm {...data.attribute} />
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

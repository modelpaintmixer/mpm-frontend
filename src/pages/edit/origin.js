import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../../utils/data-api"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import EditOriginForm from "../../forms/edit-origin"

const EditOriginPage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.id) {
    return (
      <>
        <SEO title="Create Origin" />
        <Layout title="Create Origin">
          <div className="text-block">
            <EditOriginForm />
          </div>
        </Layout>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(`/api/origin/${values.id}`, {
      data: {},
    })

    if (error) {
      return (
        <>
          <SEO title="Error" />
          <Layout title="Edit Origin: Error">
            <div className="text-block">
              <h3>An Error Occurred</h3>
              <p>An error occurred trying to load data: {error.message}</p>
            </div>
          </Layout>
        </>
      )
    } else if (loading) {
      return (
        <>
          <SEO title="Loading..." />
          <Layout title="Edit Origin: Loading...">
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
          <SEO title="Edit Origin" />
          <Layout title="Edit Origin">
            <div className="text-block">
              <EditOriginForm {...data.origin} />
            </div>
          </Layout>
        </>
      )
    }
  }
}

EditOriginPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EditOriginPage

import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../../utils/data-api"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import EditStandardForm from "../../forms/edit-standard"

const EditStandardPage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.id) {
    return (
      <>
        <SEO title="Create Standard" />
        <Layout title="Create Standard">
          <div className="text-block">
            <EditStandardForm />
          </div>
        </Layout>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/standard/${values.id}`,
      {
        data: {},
      }
    )

    if (error) {
      return (
        <>
          <SEO title="Error" />
          <Layout title="Edit Standard: Error">
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
          <Layout title="Edit Standard: Loading...">
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
          <SEO title="Edit Standard" />
          <Layout title="Edit Standard">
            <div className="text-block">
              <EditStandardForm {...data.standard} />
            </div>
          </Layout>
        </>
      )
    }
  }
}

EditStandardPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EditStandardPage

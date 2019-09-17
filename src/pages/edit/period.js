import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../../utils/data-api"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import EditPeriodForm from "../../forms/edit-period"

const EditPeriodPage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.id) {
    return (
      <>
        <SEO title="Create Period" />
        <Layout title="Create Period">
          <div className="text-block">
            <EditPeriodForm />
          </div>
        </Layout>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(`/api/period/${values.id}`, {
      data: {},
    })

    if (error) {
      return (
        <>
          <SEO title="Error" />
          <Layout title="Edit Period: Error">
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
          <Layout title="Edit Period: Loading...">
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
          <SEO title="Edit Period" />
          <Layout title="Edit Period">
            <div className="text-block">
              <EditPeriodForm {...data.period} />
            </div>
          </Layout>
        </>
      )
    }
  }
}

EditPeriodPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EditPeriodPage

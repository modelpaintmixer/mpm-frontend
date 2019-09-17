import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../../utils/data-api"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import EditNewsItemForm from "../../forms/edit-newsitem"

const EditNewsItemPage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.id) {
    return (
      <>
        <SEO title="Create NewsItem" />
        <Layout title="Create NewsItem">
          <div className="text-block">
            <EditNewsItemForm />
          </div>
        </Layout>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/newsitem/${values.id}`,
      {
        data: {},
      }
    )

    if (error) {
      return (
        <>
          <SEO title="Error" />
          <Layout title="Edit NewsItem: Error">
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
          <Layout title="Edit NewsItem: Loading...">
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
          <SEO title="Edit NewsItem" />
          <Layout title="Edit NewsItem">
            <div className="text-block">
              <EditNewsItemForm {...data.newsitem} />
            </div>
          </Layout>
        </>
      )
    }
  }
}

EditNewsItemPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EditNewsItemPage

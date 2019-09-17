import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../../utils/data-api"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import EditSiteCookieForm from "../../forms/edit-sitecookie"

const EditSiteCookiePage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.id) {
    return (
      <>
        <SEO title="Create SiteCookie" />
        <Layout title="Create SiteCookie">
          <div className="text-block">
            <EditSiteCookieForm />
          </div>
        </Layout>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/sitecookie/${values.id}`,
      {
        data: {},
      }
    )

    if (error) {
      return (
        <>
          <SEO title="Error" />
          <Layout title="Edit SiteCookie: Error">
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
          <Layout title="Edit SiteCookie: Loading...">
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
          <SEO title="Edit SiteCookie" />
          <Layout title="Edit SiteCookie">
            <div className="text-block">
              <EditSiteCookieForm {...data.sitecookie} />
            </div>
          </Layout>
        </>
      )
    }
  }
}

EditSiteCookiePage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EditSiteCookiePage

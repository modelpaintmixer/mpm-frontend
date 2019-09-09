import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import useDataApi from "../../utils/data-api"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import EditorWithPreview from "../../components/editor-with-preview"
import { DateFormat } from "../../components/date-format"

const validationSchema = Yup.object().shape({
  headline: Yup.string()
    .max(512)
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>
        Headline must not be empty
      </em>
    ),
  content: Yup.string()
    .max(10000)
    .ensure()
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>Story must not be empty</em>
    ),
})

const EditNewsitemPage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.id) {
    return (
      <>
        <SEO title="Error" />
        <Layout title="Edit Newsitem: Error">
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>This page was requested without an newsitem ID.</p>
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
          <Layout title="Edit Newsitem: Error">
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
          <Layout title="Edit Newsitem: Loading...">
            <div className="text-block">
              <div className="loading">
                <ScaleLoader />
              </div>
            </div>
          </Layout>
        </>
      )
    } else {
      let { headline, content, createdAt, updatedAt } = data.newsitem

      return (
        <>
          <SEO title={`Edit Newsitem: ${headline}`} />
          <Layout title={`Edit Newsitem: ${headline}`}>
            <div className="text-block">
              <Formik
                initialValues={{ headline, content }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  alert(JSON.stringify(values, null, 2))
                  actions.setSubmitting(false)
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div
                      style={{
                        display: "grid",
                        width: "100%",
                        gridTemplateColumns: "1fr 2fr",
                        rowGap: "0.5rem",
                        columnGap: "1rem",
                      }}
                    >
                      <div style={{ textAlign: "right" }}>
                        <label htmlFor="headline" style={{ display: "block" }}>
                          Name:
                        </label>
                        <ErrorMessage name="headline" component="p" />
                      </div>
                      <div>
                        <Field type="text" name="headline" />
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <label htmlFor="content" style={{ display: "block" }}>
                          Content:
                        </label>
                        <ErrorMessage name="content" component="p" />
                      </div>
                      <div>
                        <Field name="content" component={EditorWithPreview} />
                      </div>
                      <div style={{ textAlign: "right" }}>Created:</div>
                      <div>
                        <DateFormat date={createdAt} />
                      </div>
                      <div style={{ textAlign: "right" }}>Updated:</div>
                      <div>
                        <DateFormat date={updatedAt} />
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button name="reset" type="reset">
                        Reset
                      </button>
                      <button
                        name="submit"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Update
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Layout>
        </>
      )
    }
  }
}

EditNewsitemPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EditNewsitemPage

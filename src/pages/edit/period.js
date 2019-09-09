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

const validationSchema = Yup.object().shape({
  name: Yup.string().required(
    <em style={{ fontSize: "75%", color: "red" }}>Name must not be empty</em>
  ),
  abbreviation: Yup.string().required(
    <em style={{ fontSize: "75%", color: "red" }}>
      Abbreviation must not be empty
    </em>
  ),
  fromYear: Yup.number()
    .integer()
    .min(
      0,
      <em style={{ fontSize: "75%", color: "red" }}>
        Year must be greater than 0
      </em>
    )
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>
        From-year must not be empty
      </em>
    ),
  toYear: Yup.number()
    .integer()
    .min(
      0,
      <em style={{ fontSize: "75%", color: "red" }}>
        Year must be greater than 0
      </em>
    )
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>
        To-year must not be empty
      </em>
    ),
  notes: Yup.string()
    .ensure()
    .max(2000),
})

const EditPeriodPage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.id) {
    return (
      <>
        <SEO title="Error" />
        <Layout title="Edit Period: Error">
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>This page was requested without an period ID.</p>
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
      let { name, abbreviation, fromYear, toYear, notes } = data.period

      return (
        <>
          <SEO title={`Edit Period: ${name}`} />
          <Layout title={`Edit Period: ${name}`}>
            <div className="text-block">
              <Formik
                initialValues={{ name, abbreviation, fromYear, toYear, notes }}
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
                        <label htmlFor="name" style={{ display: "block" }}>
                          Name:
                        </label>
                        <ErrorMessage name="name" component="p" />
                      </div>
                      <div>
                        <Field type="text" name="name" />
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <label
                          htmlFor="abbreviation"
                          style={{ display: "block" }}
                        >
                          Abbreviation:
                        </label>
                        <ErrorMessage name="abbreviation" component="p" />
                      </div>
                      <div>
                        <Field type="text" name="abbreviation" />
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <label htmlFor="fromYear" style={{ display: "block" }}>
                          From:
                        </label>
                        <ErrorMessage name="fromYear" component="p" />
                      </div>
                      <div>
                        <Field type="text" name="fromYear" />
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <label htmlFor="toYear" style={{ display: "block" }}>
                          To:
                        </label>
                        <ErrorMessage name="toYear" component="p" />
                      </div>
                      <div>
                        <Field type="text" name="toYear" />
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <label htmlFor="notes" style={{ display: "block" }}>
                          Notes:
                        </label>
                      </div>
                      <div>
                        <Field name="notes" component={EditorWithPreview} />
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

EditPeriodPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EditPeriodPage

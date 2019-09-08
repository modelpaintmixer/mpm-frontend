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
  notes: Yup.string().max(1000),
})

const WrapEditorWithPreview = ({ field, ...props }) => (
  <div>
    <EditorWithPreview {...field} {...props} />
  </div>
)

WrapEditorWithPreview.propTypes = {
  field: PropTypes.object.required,
}

const EditOriginPage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.id) {
    return (
      <>
        <SEO title="Error" />
        <Layout title="Edit Origin: Error">
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>This page was requested without an origin ID.</p>
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
      let { name, abbreviation, notes } = data.origins[0]
      notes = notes || ""

      return (
        <>
          <SEO title={`Edit Origin: ${name}`} />
          <Layout title={`Edit Origin: ${name}`}>
            <div className="text-block">
              <Formik
                initialValues={{ name, abbreviation, notes }}
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
                        <label htmlFor="notes" style={{ display: "block" }}>
                          Notes:
                        </label>
                      </div>
                      <div>
                        <Field name="notes" component={WrapEditorWithPreview} />
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        name="submit"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Update
                      </button>
                      <button name="reset" type="reset">
                        Reset
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

EditOriginPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EditOriginPage

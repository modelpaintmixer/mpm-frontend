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
  description: Yup.string()
    .max(2000)
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>
        Description must not be empty
      </em>
    ),
})

const EditAttributePage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.id) {
    return (
      <>
        <SEO title="Error" />
        <Layout title="Edit Attribute: Error">
          <h2>An Error Occurred</h2>
          <div className="text-block">
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
      let { name, description } = data.attributes[0]

      return (
        <>
          <SEO title={`Edit Attribute: ${name}`} />
          <Layout title={`Edit Attribute: ${name}`}>
            <div className="text-block">
              <Formik
                initialValues={{ name, description }}
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
                          htmlFor="description"
                          style={{ display: "block" }}
                        >
                          Description:
                        </label>
                        <ErrorMessage name="description" component="p" />
                      </div>
                      <div>
                        <Field
                          name="description"
                          component={EditorWithPreview}
                        />
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

EditAttributePage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EditAttributePage
